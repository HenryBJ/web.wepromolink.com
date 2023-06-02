import { useState } from "react";
import { ICampaingCard } from "../../interfaces/ViewModels";
import ShareDialog from "../ShareDialog";
import SubscribeWrapper from "../SubscribeWrapper";
import ImageWithFallback from "../ImageWithFallback";


export default function CampaignCard(data: ICampaingCard) {

    let [isOpen, setIsOpen] = useState(false);

    const OpenDialog = () => {
        setIsOpen(true);
    }

    return (
        <>
            <div className="max-w-sm w-full md:max-w-full md:flex justify-center h-auto md:max-h-56 shadow-lg">
                {/* <img className="w-full md:max-w-sm" alt={data.title} src={data.imageUrl} /> */}
                <ImageWithFallback alt={data.title} src={data.imageUrl} style={"w-full md:max-w-sm"} />
                <div className="md:flex justify-between w-full border-r border-b border-l border-gray-400 md:border-l-0 md:border-t md:border-gray-400 bg-white rounded-b md:rounded-b-none md:rounded-r p-4">
                    <div className="flex flex-col justify-between leading-normal">
                        <div className="mb-8 overflow-hidden">
                            <div className="text-sm text-gray-600 flex items-center p-1">
                                <img className="w-9 h-9 rounded-full mr-2 ring-2 ring-orange-400 object-cover" src={data.autorImageUrl} alt={data.autorName} />
                                <div className="text-sm">
                                    <p className="text-gray-600 leading-none">{data.autorName}</p>
                                </div>
                            </div>
                            <div className="text-gray-900 font-bold text-xl mb-2">{data.title}</div>
                            <p className="text-gray-700 text-base">{data.description}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between md:flex-col items-center">
                        <p className="text-sm text-gray-400"><span className="text-lg font-bold text-orange-900 md:block">{`$${data.epm} USD`}</span> /1k clicks</p>
                        <SubscribeWrapper style="focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 font-medium rounded text-sm px-5 py-2 mb-2 cursor-pointer">
                            <button onClick={OpenDialog} type="button" >Promote</button>
                        </SubscribeWrapper>
                        <ShareDialog isOpen={isOpen} setIsOpen={setIsOpen} campaignId={data.id} epm={data.epm} />
                    </div>
                </div>
            </div>
        </>
    )
}