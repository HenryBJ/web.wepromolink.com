import { useState } from "react";
import { ICampaingCard } from "../../interfaces/ICampaingCard";
import ShareDialog from "../ShareDialog";


export default function CampaignCard(data: ICampaingCard) {

    let [isOpen, setIsOpen] = useState(false);

    const OpenDialog = () => {
        setIsOpen(true);
    }

    return (
        <>
            <div className="max-w-sm w-full lg:max-w-full lg:flex justify-center h-auto lg:max-h-56 shadow-lg">
                {/* <div className="h-48 lg:w-48 flex-none bg-cover lg:bg-cover bg-no-repeat bg-center rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{backgroundImage: `url(${data.imageUrl})`}} title={data.title}>
                </div> */}
                <img className="w-full lg:max-w-sm" alt={data.title} src={data.imageUrl} />
                <div className="lg:flex justify-between w-full border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4">
                    <div className="flex flex-col justify-between leading-normal">
                        <div className="mb-8">
                            <div className="text-sm text-gray-600 flex items-center">
                                {/* <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                                </svg>
                                Members only */}
                                <img className="w-7 h-7 rounded-full mr-2 ring-1 ring-orange-400 object-cover" src={data.autorImageUrl} alt={data.autorName} />
                                <div className="text-sm">
                                    <p className="text-gray-600 leading-none">{data.autorName}</p>
                                </div>
                            </div>
                            <div className="text-gray-900 font-bold text-xl mb-2">{data.title}</div>
                            <p className="text-gray-700 text-base">{data.description}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between lg:flex-col items-center">
                        <p className="text-sm text-gray-400"><span className="text-lg font-bold text-orange-900 lg:block">{`$${data.epm} USD`}</span> /1k clicks</p>
                        <button onClick={OpenDialog} type="button" className="focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 font-medium rounded text-sm px-5 py-2 mb-2">Promote</button>
                        <ShareDialog isOpen={isOpen} setIsOpen={setIsOpen} />
                    </div>
                </div>
            </div>
        </>
    )
}