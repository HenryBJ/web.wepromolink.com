import { useContext, useEffect, useRef, useState } from "react";
import CampaignCard from "../../components/CampaignCard";
import Spinner from "../../components/Spinner";
import { ICampaignCard, IPushNotification } from "../../interfaces/ViewModels";
import { getCampaigns } from "../../services";
import useVisit from "../../hooks/Visit";
import Masonry from "react-masonry-css";
import "./styles.css"
import { NotificationContext } from "../../hooks/NotificationProvider";
import { INotificationContext } from "../../interfaces/Common";
import Reloader from "../../components/Reloader";

export default function Feed() {

  const limit: number = 15;
  const [data, setData] = useState<ICampaignCard[]>([]);
  const [error, setError] = useState(false);
  const [offsset, setOffset] = useState(0);
  const [timestamp, setTimestamp] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [width, setWidth] = useState<any>(0);
  const myRef = useRef(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [reload, setReload] = useState(false);

  const {
    notification,
    reducePushNotification
  } = useContext<INotificationContext>(NotificationContext);

  useVisit('visit_feed');

  const handleResize = () => {
    myRef.current && setWidth(myRef.current['offsetWidth']);
  };

  useEffect(() => {
    setReload(notification.campaign > 0)
  }, [notification.campaign])

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleData = (incommingData: ICampaignCard[]) => {
    if (incommingData.length === 0) {
      setIsFetching(false);
      return;
    }

    try {
      const newTimestamp = incommingData
        .sort((a: ICampaignCard, b: ICampaignCard) => b.unixTime - a.unixTime)[0]
        .unixTime;
      setTimestamp(newTimestamp);
      setOffset(prev => prev + incommingData.length);
      setData(prev => [...prev, ...(incommingData)]);
      setIsFetching(false);

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
    handleCampaigns();
  }, [isFetching, offsset, timestamp]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    observerRef.current?.observe(document.getElementById("loadMoreTrigger")!);
  }, [data]);

  const handleCampaigns = () => {
    if (isFetching) return;
    reducePushNotification(({ campaign, ...rest }: IPushNotification) => ({ campaign: 0, ...rest }));
    getCampaigns(offsset, limit, timestamp)
      .then(resp => {
        handleData(resp.data);
      })
      .catch(err => setError(true));
  }

  const handleBreakPoints = () => {
    const MAX_COLUMNS  = 5;
    const cardWidth = 415;
    const screenWidth = width;
    const margins = 30;
    let columns = Math.floor((screenWidth-margins)/cardWidth);
    if(columns <= 0) return 1;
    if(columns >= MAX_COLUMNS) return MAX_COLUMNS
    return columns;
  }


  return (
    <>
      <section ref={myRef} className="container max-w-full px-0 sm:px-6 mx-auto pt-3 h-full flex justify-center ">
        <Masonry
          breakpointCols={handleBreakPoints()}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
          {data.map((c) => (<CampaignCard key={c.id} data={c} />))}
        </Masonry>

        <div id="loadMoreTrigger" style={{ marginTop: "30px" }} />
        <Reloader callback={() => {
          setIsFetching(_=>false);
          setOffset(_=>0);
          setData(_=>[]);
          setTimestamp(_=>0);
        }} isVisible={reload} />
      </section>
      {
        isFetching &&
        <div className="flex items-center justify-center my-3">
          <Spinner text={data.length === 0 ? "Getting campaigns..." : "Loading more ..."} />
        </div>
      }
    </>
  )
}