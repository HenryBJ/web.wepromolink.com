import { useEffect, useState } from "react";
import CampaignCard from "../../components/CampaignCard";
import Spinner from "../../components/Spinner";
import { ICampaingCard } from "../../interfaces/ViewModels";
import { getCampaigns } from "../../services";

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

    getCampaigns(page + 1)
      .then(resp => {
        setPage(resp.data.value.page.valueOf());
        setData(prev => [...prev, ...(resp.data.value.sponsoredLinks)]);
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