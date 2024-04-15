import { useContext, useEffect, useRef, useState } from "react";
import CampaignCard from "../../components/CampaignCard";
import Spinner from "../../components/Spinner";
import { ICampaignCard, IPushNotification } from "../../interfaces/ViewModels";
import { getCampaigns } from "../../services";
import useVisit from "../../hooks/Visit";
import Masonry from "react-masonry-css";
import "./styles.css";
import { NotificationContext } from "../../hooks/NotificationProvider";
import { INotificationContext } from "../../interfaces/Common";
import Reloader from "../../components/Reloader";

export default function Feed() {
  const limit: number = 15;
  const [data, setData] = useState<ICampaignCard[]>([]);
  const [error, setError] = useState(false);
  const [offsset, setOffset] = useState(0);
  const [timestamp, setTimestamp] = useState<Date|undefined>();
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [width, setWidth] = useState<any>(0);
  const myRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const [reload, setReload] = useState(false);

  const { notification, reducePushNotification } =
    useContext<INotificationContext>(NotificationContext);

  useVisit("visit_feed");

  const handleResize = () => {
    myRef.current && setWidth(myRef.current["offsetWidth"]);
  };

  useEffect(() => {
    setReload(notification.campaign > 0);
  }, [notification.campaign]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isFetching && !isEnd) {
        setPage(prev=>prev+1)
      }
    }, { threshold: 0.1 });

    if (endRef.current) {
      observer.observe(endRef.current);
    }

    return () => {
      if (endRef.current) {
        observer.unobserve(endRef.current);
      }
    };
  }, [isFetching, isEnd]);

  const handleCampaigns = () => {
    if (isFetching) return;
    reducePushNotification(({ campaign, ...rest }: IPushNotification) => ({
      campaign: 0,
      ...rest,
    }));
    setIsFetching(true);
    getCampaigns(offsset, limit, timestamp)
      .then((resp) => {
        handleData(resp.data);
      })
      .catch((err) => setError(true));
  };


  const handleData = (incommingData: ICampaignCard[]) => {
    if (incommingData.length === 0) {
      setIsFetching(false);
      setIsEnd(true);
      return;
    }

    try {
      const newLastModified = incommingData.sort((a: ICampaignCard, b: ICampaignCard) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())[0].lastModified;
      setTimestamp(newLastModified);
      setOffset((prev) => prev + incommingData.length);
      setData((prev) => [...prev, ...incommingData]);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !isEnd && handleCampaigns();
  }, [page]);

  const handleBreakPoints = () => {
    
    let MAX_COLUMNS = 5;
    const cardWidth = 415;
    const screenWidth = width;
    const margins = 30;
    if (data.length === 2 ) MAX_COLUMNS = 2; // Bug fixed
    let columns = Math.floor((screenWidth - margins) / cardWidth);
    if (columns <= 0) return 1;
    if (columns >= MAX_COLUMNS) return MAX_COLUMNS;
    return columns;
  };

  return (
    <>
      <section
        ref={myRef}
        className="container max-w-full px-0 sm:px-6 mx-auto pt-3 h-full flex justify-center">
        <Masonry
          breakpointCols={handleBreakPoints()}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {data.map((c) => (
            <CampaignCard key={c.id} data={c} />
          ))}
        </Masonry>

        <Reloader
          callback={() => {
            setIsFetching((_) => false);
            setOffset((_) => 0);
            setPage(0);
            setIsEnd(false);
            setData((_) => []);
            setTimestamp((_) => undefined);
          }}
          isVisible={reload}
        />
      </section>
      {isFetching && (
        <div className="flex items-center justify-center my-3">
          <Spinner
            text={
              data.length === 0 ? "Getting campaigns..." : "Loading more ..."
            }
          />
        </div>
      )}
      <div ref={endRef} className="bg-gray-100 w-full h-5"></div>
    </>
  );
}
