import { IAbuseReportCampaign, ICampaignCard } from "../../interfaces/ViewModels";
import ShareDialog from "../ShareDialog";
import SubscribeWrapper from "../SubscribeWrapper";
import ImageViewer from "../ImageViewer";
import { useState } from "react";
import ActionMenu from "../ActionMenu";
import { abuseReportCampaigns } from "../../services";
import { gTag } from "../../firebase";
import { toast } from "react-toastify";
import { timeSince } from "../../common";
import ExpandableText from "../ExpandableText";

interface IProps {
    data: ICampaignCard
}

const flagIcon = (<svg className="basis-1/4 w-4 h-4 inline mr-1 my-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
</svg>)


export default function CampaignCard({ data }: IProps) {

    let [isOpen, setIsOpen] = useState(false);

    const OpenDialog = () => {
        setIsOpen(true);
    }

    const handleReportAbuse = () => {
        const report: IAbuseReportCampaign = {
            campaignExternalId: data.id,
            reason: "Generic abuse report"
        };
        toast.info("Submitting report abuse...")
        abuseReportCampaigns(report)
            .then(res => {
                gTag('abuse_report_campaign', { campaignId: report.campaignExternalId, reason: report.reason });
                toast.success('Report submitted successfully!');
            })
            .catch((e) => {
                toast.error('Error submitting report. Please try again.');
            })
    }

    return (
        <>
            <div className="w-96 justify-start h-auto flex flex-col shadow-lg  border-gray-400  bg-white rounded-3xl p-1">
                <div className="text-sm text-gray-600 flex items-center p-2 w-full ">
                    <img className="w-9 h-9 rounded-full mr-2  object-cover"
                        src={data.autorImageUrl} alt={data.autorName} />
                    <div className="text-sm">
                        <p className="text-gray-700 leading-none">{data.autorName}</p>
                        <p className="text-gray-400 ">{timeSince(data.lastModified)}</p>
                    </div>
                    <div className="flex-grow flex justify-end">
                        <ActionMenu key={data.id} item={data} relocationY="transform -translate-y-16" actions={[{
                            title: "Report abuse",
                            icon: flagIcon,
                            action: () => handleReportAbuse()
                        }]} />
                    </div>
                </div>

                <ImageViewer ImageBundle={data.imageBundle ?? undefined} Scale={4} FixWidth={1200} />


                {/* <div className="text-gray-700 text-base overflow-y-auto h-52 px-2 mb-2">
                    <div className="text-gray-900 font-bold text-xl mb-1 ">{data.title}</div>
                    {data.description}
                </div> */}
                <div className="text-gray-800 font-semibold  mt-1 px-2 ">{data.title}</div>
                <div className="text-gray-600 mb-1 px-2 text-sm leading-tight">
                    <ExpandableText key={`des-${data.id}`} text={data.description} />
                </div>

                <div className="flex flex-row justify-between items-center px-2 cursor-default">
                    <p className="text-sm text-gray-400"><span
                        className="text-lg font-bold text-orange-600 ">{`$${data.epm}`}</span> /1k clicks</p>
                    <button type="button">
                        <SubscribeWrapper onClick={OpenDialog}
                            style="focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-1 mb-2 cursor-pointer">
                            Promote
                        </SubscribeWrapper>
                    </button>
                    <ShareDialog isOpen={isOpen} setIsOpen={setIsOpen} campaignId={data.id} epm={data.epm} />
                </div>
            </div>
        </>
    )
}