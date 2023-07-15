import React, {ReactNode, useEffect, useRef, useState} from 'react';
import GenericDialog from "../GenericDialog";
import Spinner, {SpinnerType} from "../Spinner";
import {User} from "firebase/auth";
import {abuseReportCampaigns} from "../../services";
import {gTag} from "../../firebase";
import {IAbuseReportCampaign} from "../../interfaces/ViewModels";
import {toast} from "react-toastify";
import {ExclamationTriangleIcon} from '@heroicons/react/20/solid';

interface IReportDialogInput {
    children: ReactNode;
    style: string;
    onClick?: (event: React.MouseEvent) => void
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    campaignExternalId: string;
    campaignTitle: string;
}

export default function ReportDialog({
                                         children,
                                         style,
                                         onClick,
                                         isOpen,
                                         setIsOpen,
                                         campaignExternalId,
                                         campaignTitle,
                                     }: IReportDialogInput) {

    const [reason, setReason] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleResponse = () => {
        setIsSubmitting(false);
        setIsOpen(false);
    }

    useEffect(() => {
        if (isOpen) {
            setReason('');
        }
    }, [isOpen]);


    const submitReport = () => {
        const user: User | null = JSON.parse(localStorage.getItem("user_wepromolink")!);
        if (reason !== "" && user) {
            setIsSubmitting(true);
            const data: IAbuseReportCampaign = {
                userId: user.uid,
                campaignExternalId: campaignExternalId,
                reason: reason
            };
            abuseReportCampaigns(data)
                .then(res => {
                    handleResponse();
                    gTag('abuse_report_campaign', {campaignId: campaignExternalId, userId: user.uid, reason: reason});
                    toast.success('Report submitted successfully!');
                })
                .catch((e) => {
                    handleResponse();
                    toast.error('Error submitting report. Please try again.');
                })
        }
    };

    const actions =
        isSubmitting ?
            [
                {
                    caption: <Spinner type={SpinnerType.Primary} text="Submitting..."/>,
                    fn: () => {
                    },
                }
            ] :
            [
                {
                    caption: "Submit",
                    fn: submitReport
                }
            ];

    const handleClick = (event: React.MouseEvent) => {

        if (onClick) {
            onClick(event);
        }
    };

    return (
        <div className={`relative flex flex-col ${style}`} onClick={handleClick}>
            {children}
            <GenericDialog
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                icon={<ExclamationTriangleIcon className="h-7 w-7" aria-hidden="true"/>}
                title="Report Campaign for Abuse"
                description={`Are you reporting the ${campaignTitle} campaign for a possible breach of our policy? Please pick a reason from the dropdown:`}
                actions={actions}
            >
                <div className="relative w-full rounded-md shadow-sm mt-2 mb-2">
                    <select
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="cursor-pointer block w-full rounded-md border-gray-300 px-2 text-sm h-8 text-black sm:max-w-full"
                    >
                        <option value="">--Please choose an option--</option>
                        <option value="adult_content">Adult Content</option>
                        <option value="hate_speech">Hate Speech</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </GenericDialog>
        </div>
    );
}






