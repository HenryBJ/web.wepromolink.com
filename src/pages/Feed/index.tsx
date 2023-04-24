import { useEffect, useState } from "react";
import CampaignCard from "../../components/CampaignCard";
import Spinner from "../../components/Spinner";
import { ICampaingCard } from "../../interfaces/ViewModels";
import { GetCampaigns } from "../../services/CampaignService";
import ReactAdsense from "@pkasila/react-adsense";
import { DataAdClient, DataAdLayoutKey, DataAdSlot } from "../../constant";

export default function Dashboard() {

  const [page, setPage] = useState(-1);
  const [data, setData] = useState<ICampaingCard[]>([]);
  const [error, setError] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;

    GetCampaigns(page + 1)
      .then(resp => {
        setPage(resp.data.page);
        setData(prev => [...prev, ...(resp.data.sponsoredLinks)]);
      })
      .catch(err => setError(true))
      .finally(() => setIsFetching(false));
  }, [isFetching]);

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
       <ReactAdsense client={DataAdClient} slot={DataAdSlot} style={{width: 960, height: 64}} layoutKey={DataAdLayoutKey} format={'fluid'} />   
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



{/* <ins class="adsbygoogle"
     style="display:block"
     data-ad-format="fluid"
     data-ad-layout-key="-fb+5w+4e-db+86"
     data-ad-client="ca-pub-4464416327386260"
     data-ad-slot="2800001036"></ins> */}