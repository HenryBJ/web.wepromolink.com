import { useEffect, useState } from "react";
import CampaignCard from "../../components/CampaignCard";
import { ICampaignListResponse, ICampaingCard } from "../../interfaces/ICampaingCard";
import { GetCampaigns } from "../../services/CampaignService";

export default function Dashboard() {

  const [campaignsList, setCampaignList] = useState<ICampaignListResponse>({page:0,sponsoredLinks:[], totalPages:0});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    GetCampaigns()
      .then(resp => {setCampaignList(resp.data); console.log(resp.data)})
      .then(() => setLoading(false))
      .catch(err => setError(true))
      .finally(() => setLoading(false));

  }, []);

  return (
    <section className="container max-w-5xl mx-auto pt-3 h-full flex flex-col gap-6 justify-center">
      {
        
        campaignsList.sponsoredLinks.map((c) => (
          <CampaignCard
            key={c.id}
            budget={c.budget}
            title={c.title}
            description={c.description}
            epm={c.epm}
            imageUrl={c.imageUrl} />))
      }
    </section>
  )
}