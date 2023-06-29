import { IField, IGenericDetailData } from "../../components/GenericDetail";
import { IMyCampaignDetail } from "../../interfaces/ViewModels";
import { getClicksLastWeekOnCampaign, getClicksTodayOnCampaign, getHistoryClicksByCountriesOnCampaign, getHistoryClicksOnCampaign, getHistorySharedByUsersOnCampaign, getHistorySharedOnCampaign, getSharedLastWeekOnCampaign, getSharedTodayOnCampaignModel } from "../../services";

export const prepareData = (campaign: IMyCampaignDetail) => (): IGenericDetailData | undefined => {
    if (campaign) {
        let stats: IField[] = [
            {
                title: "Clicks Last Week",
                load: () => getClicksLastWeekOnCampaign(campaign.id),
                order: 7,
                valueType: 'dash',
                isHidden: false,
                value: '',
                isImage: false,
                hideTitle:true
            },
            {
                title: "Clicks Today",
                load: () => getClicksTodayOnCampaign(campaign.id),
                order: 4,
                valueType: 'dash',
                isHidden: false,
                value: '',
                isImage: false,
                hideTitle:true
            },
            {
                title: "Shared Last Week",
                load: () => getSharedLastWeekOnCampaign(campaign.id),
                order: 5,
                valueType: 'dash',
                isHidden: false,
                value: '',
                isImage: false,
                hideTitle:true
            },
            {
                title: "Shared Today",
                load: () => getSharedTodayOnCampaignModel(campaign.id),
                order: 6,
                valueType: 'dash',
                isHidden: false,
                value: '',
                isImage: false,
                hideTitle:true
            },
            {
                title: "Clicks",
                load: () => getHistoryClicksOnCampaign(campaign.id),
                order: 3,
                valueType: 'line',
                isHidden: false,
                value: '',
                isImage: false,
                hideTitle:true
            },
            {
                title: "Shared",
                load: () => getHistorySharedOnCampaign(campaign.id),
                order: 8,
                valueType: 'line',
                isHidden: false,
                value: '',
                isImage: false,
                hideTitle:true
            },
            {
                title: "Clicks By Countries",
                load: () => getHistoryClicksByCountriesOnCampaign(campaign.id),
                order: 9,
                valueType: 'pie',
                isHidden: false,
                value: '',
                isImage: false,
                hideTitle:true
            },

            {
                title: "Shared By Users",
                load: () => getHistorySharedByUsersOnCampaign(campaign.id),
                order: 10,
                valueType: 'bar',
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
