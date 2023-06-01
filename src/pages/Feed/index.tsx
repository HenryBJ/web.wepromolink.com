import { useEffect, useRef, useState } from "react";
import CampaignCard from "../../components/CampaignCard";
import Spinner from "../../components/Spinner";
import { ICampaingCard } from "../../interfaces/ViewModels";
import { getCampaigns } from "../../services";
import NoData from "../../components/NoData";

export default function Feed() {

  const limit: number = 15;
  const [data, setData] = useState<ICampaingCard[]>([]);
  const [error, setError] = useState(false);
  const [offsset, setOffset] = useState(0);
  const [timestamp, setTimestamp] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  

  const loadImages = (urls: string[]): Promise<void[]> => {
    const promises: Promise<void>[] = [];
    for (const url of urls) {
      const promise = new Promise<void>((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve();
        image.onerror = () => reject(new Error(`Error loading image: ${url}`));
        image.src = url;
      });
      promises.push(promise);
    }
    return Promise.all(promises);
  }


  const handleData = (incommingData: ICampaingCard[]) => {
    if (incommingData.length === 0) {
      setIsFetching(false);
      return;
    }

    try {

      const newTimestamp = incommingData
        .sort((a: ICampaingCard, b: ICampaingCard) => b.lastModified - a.lastModified)[0]
        .lastModified;

      loadImages(incommingData.map(e => e.imageUrl))
        .then(() => {
          setTimestamp(newTimestamp);
          setOffset(prev => prev + incommingData.length);
          setData(prev => [...prev, ...(incommingData)]);
        })
        .catch(error => console.log(error))
        .finally(() => setIsFetching(false));

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      entries => {
        const target = entries[0];
        if (target.isIntersecting) {
          setIsFetching(true);
        }
      },
      { rootMargin: "0px 0px 1000px 0px" }
    );
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);


  useEffect(() => {
    if (isFetching) return;
    getCampaigns(offsset, limit, timestamp)
      .then(resp => {
        handleData(resp.data);
      })
      .catch(err => setError(true));
      console.log(`'isFetching=' ${isFetching} offsset=${offsset} timestamp=${timestamp}`);
  }, [isFetching, offsset, timestamp]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    observerRef.current?.observe(document.getElementById("loadMoreTrigger")!);
    console.log(`'data=' ${data}`);
  }, [data]);


  return (
    <>
      <section className="container max-w-5xl px-2 mx-auto pt-3 h-full flex flex-col gap-6 justify-start items-center">
        {
          data.length !== 0 ? data.map((c) => (
            <CampaignCard
              key={c.id}
              budget={c.budget}
              title={c.title}
              description={c.description}
              epm={c.epm}
              autorImageUrl={c.autorImageUrl}
              autorName={c.autorName}
              lastModified={c.lastModified}
              imageUrl={c.imageUrl} />)) : <NoData />
        }
        <div id="loadMoreTrigger" style={{ marginTop: "30px" }} />
      </section>
      {
        isFetching &&
        <div className="flex items-center justify-center my-3">
          <Spinner text="Loading more ..." />
        </div>
      }
    </>
  )
}