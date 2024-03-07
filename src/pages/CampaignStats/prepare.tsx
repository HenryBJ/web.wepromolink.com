import { IField, IGenericDetailData } from "../../components/GenericDetail";
import { IMyCampaignDetail } from "../../interfaces/ViewModels";

export const prepareData = (campaign: IMyCampaignDetail) => (): IGenericDetailData | undefined => {
    if (campaign) {
        let stats: IField[] = [

            {
                title: "Budget",
                order: 1,
                collectionName:'campaignbudget',
                externalId:campaign.id,
                valueType: 'generic-money',
                isHidden: false,
                value: '',
                isImage: false,
                hideTitle:true
            },
            {
                title: "Clicks",
                order: 2,
                collectionName:'campaignxclick',
                externalId:campaign.id,
                valueType: 'generic-line',
                isHidden: false,
                value: '',
                isImage: false,
                hideTitle:true
            },
            {
                title: "Shares",
                order: 3,
                collectionName:'campaignxshare',
                externalId:campaign.id,
                valueType: 'generic-line',
                isHidden: false,
                value: '',
                isImage: false,
                hideTitle:true
            },
            {
                title: "Clicks by Countries",
                order: 4,
                collectionName:'campaignclickcountry',
                externalId:campaign.id,
                valueType: 'generic-pie',
                isHidden: false,
                value: '',
                isImage: false,
                hideTitle:true
            },

        ];
        const properties = Object.entries(campaign);
        let ifields = properties.map(([key, value]) => {
            switch (key) {
                case 'id':
                    let f_id: IField = {
                        isImage: false,
                        title: 'ID',
                        value: value,
                        valueType: 'string',
                        isHidden: true,
                        order: 0
                    }
                    return f_id;

                case 'imageBundle':
                    let f_url: IField = {
                        isImage: true,
                        title: '',
                        value: value,
                        valueType: 'image',
                        isHidden: false,
                        order: 1
                    }
                    return f_url;

                case 'title':
                    let f_title: IField = {
                        isImage: false,
                        title: 'Campaign name',
                        value: value,
                        valueType: 'string',
                        isHidden: true,
                        order: 2
                    }
                    return f_title;

                default:
                    let other: IField = {
                        isImage: false,
                        title: key,
                        value: 'not supported',
                        valueType: 'string',
                        isHidden: true,
                        order: 1000
                    }
                    return other;
            }
        });
        return {
            fields: [...ifields, ...stats],
            title: campaign.title
        }
    }

    return;
}
