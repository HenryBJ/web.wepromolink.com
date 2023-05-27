import { useEffect, useState } from "react";
import CampaignCard from "../../components/CampaignCard";
import Spinner from "../../components/Spinner";
import { ICampaingCard } from "../../interfaces/ViewModels";
import { getCampaigns } from "../../services";

export default function Feed() {

  const limit: number = 15;
  const [data, setData] = useState<ICampaingCard[]>([]);
  const [error, setError] = useState(false);
  const [offsset, setOffset] = useState(0);
  const [timestamp, setTimestamp] = useState(0);
  const [isFetching, setIsFetching] = useState(true);

  const handleData = (incommingData: ICampaingCard[]) => {
    if (incommingData.length === 0) return;
    console.log(incommingData[0])
    try {
      
      const newTimestamp = incommingData
        .sort((a: ICampaingCard, b: ICampaingCard) => b.lastModified - a.lastModified)[0]
        .lastModified;

      setTimestamp(newTimestamp);
      setOffset(prev => prev + incommingData.length);
      setData(prev => [...prev, ...(incommingData)]);

    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    getCampaigns(offsset, limit, timestamp)
      .then(resp => {
        handleData(resp.data);
      })
      .catch(err => setError(true))
      .finally(() => setIsFetching(false));
  }, [isFetching, data.length]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setIsFetching(true);
  };


  return (
    <>
      <section className="container max-w-5xl px-2 mx-auto pt-3 h-full flex flex-col gap-6 justify-start items-center">
        {
          data.map((c) => (
            <CampaignCard
              key={c.id}
              budget={c.budget}
              title={c.title}
              description={c.description}
              epm={c.epm}
              autorImageUrl={c.autorImageUrl}
              autorName={c.autorName}
              lastModified={c.lastModified}
              imageUrl={c.imageUrl} />))
        }
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