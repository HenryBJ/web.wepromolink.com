import {ICampaignCard} from "../../interfaces/ViewModels";
import ShareDialog from "../ShareDialog";
import SubscribeWrapper from "../SubscribeWrapper";
import ImageViewer from "../ImageViewer";
import ReportDialog from "../ReportDialog";
import {EllipsisVerticalIcon} from '@heroicons/react/20/solid';
import React, {useEffect, useRef, useState} from "react";

interface IProps {
    data: ICampaignCard
}

export default function CampaignCard({data}: IProps) {

    let [isOpen, setIsOpen] = useState(false);
    let [isReportOpen, setIsReportOpen] = useState(false);
    let [menuOpen, setMenuOpen] = useState(false);
    let menuRef = useRef<HTMLDivElement>(null);

    const OpenDialog = () => {
        setIsOpen(true);
    }

    const OpenReportDialog = (event: React.MouseEvent) => {
        setIsReportOpen(true);
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (
            menuRef.current &&
            event.target instanceof Node &&
            !menuRef.current.contains(event.target) && !isReportOpen
        ) {
            setMenuOpen(false);
        }
    }

    useEffect(() => {

        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [menuOpen, isReportOpen]);


    return (
        <>
            <div
                className="max-w-[360px] w-full justify-start h-auto flex flex-col shadow-lg border-r border-b border-l border-gray-400  bg-white rounded">
                <ImageViewer ImageBundle={data.imageBundle ?? undefined} Scale={4} FixWidth={600}/>

                <div className="flex-grow"></div>
                <div className="text-sm text-gray-600 flex items-center p-2 ">
                    <img className="w-9 h-9 rounded-full mr-2 ring-2 ring-orange-400 object-cover"
                         src={data.autorImageUrl} alt={data.autorName}/>
                    <div className="text-sm">
                        <p className="text-gray-600 leading-none">{data.autorName}</p>
                    </div>
                    <div className="relative inline-block text-left ml-auto">
                        <div>
                            <button type="button" onClick={() => setMenuOpen(!menuOpen)}
                                    className="focus:outline-none text-gray-500 hover:text-gray-900">
                                <EllipsisVerticalIcon className="h-7 w-7" aria-hidden="true"/>
                            </button>
                        </div>
                        {menuOpen && (
                            <div
                                ref={menuRef}
                                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-orange-500 ring-1 ring-black ring-opacity-5 z-50">
                                <div className="py-1" role="menu" aria-orientation="vertical"
                                     aria-labelledby="options-menu">
                                    <div role="menuitem">
                                        <ReportDialog
                                            style="focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 font-medium rounded text-sm px-5 py-2 cursor-pointer"
                                            isOpen={isReportOpen} setIsOpen={setIsReportOpen}
                                            campaignExternalId={data.id}
                                            campaignTitle={data.title}
                                            onClick={OpenReportDialog}
                                        >
                                            Report
                                        </ReportDialog>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* <div className="text-gray-900 font-bold text-xl mb-2 h-14 px-2 bg-red-600">{data.title}</div> */}

                <div className="text-gray-700 text-base overflow-y-auto h-52 px-2 mb-2">
                    <div className="text-gray-900 font-bold text-xl mb-1 ">{data.title}</div>
                    {data.description}
                </div>

                <div className="flex flex-row justify-between items-center px-2">
                    <p className="text-sm text-gray-400"><span
                        className="text-lg font-bold text-orange-900 ">{`$${data.epm} USD`}</span> /1k clicks</p>
                    <button type="button">
                        <SubscribeWrapper onClick={OpenDialog}
                                          style="focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 font-medium rounded text-sm px-5 py-2 mb-2 cursor-pointer">
                            Promote
                        </SubscribeWrapper>
                    </button>
                    <ShareDialog isOpen={isOpen} setIsOpen={setIsOpen} campaignId={data.id} epm={data.epm}/>
                </div>

            </div>
        </>
    )
}