import { IField, IGenericDetailData } from "../../components/GenericDetail";
import { IMyCampaignDetail, IMyCampaignStats } from "../../interfaces/ViewModels";

export const prepareData = (campaign: IMyCampaignStats) => (): IGenericDetailData | undefined => {
    if (campaign) {
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

                case 'imageUrl':
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
                        isHidden: false,
                        order: 2
                    }
                    return f_title;



                case 'todayClicks':
                    let f_todayClicks: IField = {
                        isImage: false,
                        title: 'Today Click',
                        value: value,
                        valueType: 'dash',
                        isHidden: false,
                        order: 3,
                        hideTitle:true,
                        transform: (e: number) => `${e} clicks`
                    }
                    return f_todayClicks;

                case 'lastWeekClicks':
                    let f_lastWeekClicks: IField = {
                        isImage: false,
                        title: 'Last Week Clicks',
                        value: value,
                        valueType: 'dash',
                        isHidden: false,
                        order: 4,
                        hideTitle:true,
                        transform: (e: number) => `${e} clicks`
                    }
                    return f_lastWeekClicks;

                case 'sharedTodayOnCampaings':
                    let f_sharedTodayOnCampaings: IField = {
                        isImage: false,
                        title: 'Shared Today',
                        value: value,
                        valueType: 'dash',
                        isHidden: false,
                        order: 5,
                        hideTitle:true,
                        transform: (e: number) => `${e} shared`
                    }
                    return f_sharedTodayOnCampaings;

                case 'sharedLastWeekOnCampaings':
                    let f_sharedLastWeekOnCampaings: IField = {
                        isImage: false,
                        title: 'Shared Last Week',
                        value: value,
                        valueType: 'dash',
                        isHidden: false,
                        order: 6,
                        hideTitle:true,
                        transform: (e: number) => `${e} shared`
                    }
                    return f_sharedLastWeekOnCampaings;

                case 'historicalClicks':
                    let f_historicalClicks: IField = {
                        isImage: false,
                        title: 'Clicks',
                        value: value,
                        valueType: 'line',
                        isHidden: false,
                        order: 7,
                        hideTitle:true
                    }
                    return f_historicalClicks;

                case 'clickByCountries':
                    let f_clickByCountries: IField = {
                        isImage: false,
                        title: 'Clicks by Countries',
                        value: value,
                        valueType: 'pie',
                        isHidden: false,
                        order: 8,
                        hideTitle:true
                    }
                    return f_clickByCountries;

                case 'historicalShared':
                    let f_historicalShared: IField = {
                        isImage: false,
                        title: 'Shared',
                        value: value,
                        valueType: 'line',
                        isHidden: false,
                        order: 9,
                        hideTitle:true
                    }
                    return f_historicalShared;

                case 'sharedByUsers':
                    let f_sharedByUsers: IField = {
                        isImage: false,
                        title: 'Shared by Users',
                        value: value,
                        valueType: 'bar',
                        isHidden: false,
                        order: 10,
                        hideTitle:true
                    }
                    return f_sharedByUsers;

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
            fields: ifields,
            title: campaign.title
        }
    }

    return;
}
