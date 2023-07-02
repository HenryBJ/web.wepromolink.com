import { useState } from "react";
import { ICampaignCard } from "../../interfaces/ViewModels";
import ShareDialog from "../ShareDialog";
import SubscribeWrapper from "../SubscribeWrapper";
import ImageViewer from "../ImageViewer";

interface IProps {
    data: ICampaignCard
}

export default function CampaignCard({ data }: IProps) {

    let [isOpen, setIsOpen] = useState(false);

    const OpenDialog = () => {
        setIsOpen(true);
    }

    return (
        <>
            <div className="max-w-[360px] w-full justify-start h-auto flex flex-col shadow-lg border-r border-b border-l border-gray-400  bg-white rounded">
                <ImageViewer ImageBundle={data.imageBundle ?? undefined} Scale={4} FixWidth={600} />

                <div className="flex-grow"></div>
                <div className="text-sm text-gray-600 flex items-center p-2 ">
                    <img className="w-9 h-9 rounded-full mr-2 ring-2 ring-orange-400 object-cover" src={data.autorImageUrl} alt={data.autorName} />
                    <div className="text-sm">
                        <p className="text-gray-600 leading-none">{data.autorName}</p>
                    </div>
                </div>

                {/* <div className="text-gray-900 font-bold text-xl mb-2 h-14 px-2 bg-red-600">{data.title}</div> */}

                <div className="text-gray-700 text-base overflow-y-auto h-52 px-2 mb-2">
                    <div className="text-gray-900 font-bold text-xl mb-1 ">{data.title}</div>
                    {data.description}
                </div>

                <div className="flex flex-row justify-between items-center px-2">
                    <p className="text-sm text-gray-400"><span className="text-lg font-bold text-orange-900 ">{`$${data.epm} USD`}</span> /1k clicks</p>
                    <button type="button">
                        <SubscribeWrapper onClick={OpenDialog} style="focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 font-medium rounded text-sm px-5 py-2 mb-2 cursor-pointer">
                            Promote
                        </SubscribeWrapper>
                    </button>
                    <ShareDialog isOpen={isOpen} setIsOpen={setIsOpen} campaignId={data.id} epm={data.epm} />
                </div>

            </div>
        </>
    )
}