import { IField, IGenericDetailData } from "../../components/GenericDetail";
import {ILinkDetail} from "../../interfaces/ViewModels";

export const prepareData = (linkdetail: ILinkDetail) => (): IGenericDetailData | undefined => {
    if (linkdetail) {
        let stats: IField[] = [
             // {
            //     title: "Clicks",
            //     order: 1,
            //     collectionName:"",
            //     externalId:"",
            //     valueType: 'dash',
            //     isHidden: false,
            //     value: '',
            //     isImage: false,
            //     hideTitle:true
            // },

        ];
        const properties = Object.entries(linkdetail);
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

                case 'profit':
                    let f_todayClicks: IField = {
                        isImage: false,
                        title: 'Profit',
                        value: value,
                        valueType: 'dash',
                        isHidden: false,
                        hideTitle: true,
                        order: 4,
                        transform: (e: number) => `$${e}`
                    }
                    return f_todayClicks;

                case 'lastWeekClicks':
                    let f_lastWeekClicks: IField = {
                        isImage: false,
                        title: 'Last Week Clicks',
                        value: value,
                        valueType: 'dash',
                        isHidden: false,
                        hideTitle: true,
                        order: 4,
                        transform: (e: number) => `${e} clicks`
                    }
                    return f_lastWeekClicks;

                case 'historicalClicks':
                    let f_historicalClicks: IField = {
                        isImage: false,
                        title: 'Clicks',
                        value: value,
                        valueType: 'line',
                        isHidden: false,
                        hideTitle: true,
                        order: 5
                    }
                    return f_historicalClicks;

                case 'clickByCountries':
                    let f_clickByCountries: IField = {
                        isImage: false,
                        title: 'Clicks By Countries',
                        value: value,
                        valueType: 'pie',
                        isHidden: false,
                        hideTitle: true,
                        order: 6
                    }
                    return f_clickByCountries;

                case 'earnToday':
                    let f_earnToday: IField = {
                        isImage: false,
                        title: 'Earn Today',
                        value: value,
                        valueType: 'dash',
                        isHidden: false,
                        hideTitle: true,
                        order: 7,
                        transform: (e: number) => `$${e}`
                    }
                    return f_earnToday;

                case 'earnLastWeek':
                    let f_earnLastWeek: IField = {
                        isImage: false,
                        title: 'Earn Last Week',
                        value: value,
                        valueType: 'dash',
                        isHidden: false,
                        hideTitle: true,
                        order: 8,
                        transform: (e: number) => `$${e}`
                    }
                    return f_earnLastWeek;

                case 'historicalEarn':
                    let f_historicalEarn: IField = {
                        isImage: false,
                        title: 'Earn',
                        value: value,
                        valueType: 'line',
                        isHidden: false,
                        hideTitle: true,
                        order: 9
                    }
                    return f_historicalEarn;

                case 'earnByCountries':
                    let f_earnByCountries: IField = {
                        isImage: false,
                        title: 'Earn By Countries',
                        value: value,
                        valueType: 'pie',
                        isHidden: false,
                        hideTitle: true,
                        order: 10
                    }
                    return f_earnByCountries;

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
            title: linkdetail.title
        }
    }

    return;
}