import {IField, IGenericDetailData} from "../../components/GenericDetail";
import {IMyCampaignDetail} from "../../interfaces/ViewModels";

const splitNumberValue = (value: number): string => {
    const [intPart, decPart] = value.toString().split('.');
    if (decPart) {
        return `$${intPart}.<span class="text-gray-500 text-sm">${decPart}</span>`;
    }
    return intPart;
};


export const prepareData = (campaign: IMyCampaignDetail) => (): IGenericDetailData | undefined => {
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

                case 'description':
                    let f_des: IField = {
                        isImage: false,
                        title: 'Description',
                        value: value,
                        valueType: 'string',
                        isHidden: false,
                        order: 2,
                        fnwidth: (e) => {
                            if (e < 742) return 200
                            if (e < 910) return 400                            
                            return 568
                        }

                    }
                    return f_des;

                case 'title':
                    let f_title: IField = {
                        isImage: false,
                        title: 'Campaign name',
                        value: value,
                        valueType: 'string',
                        isHidden: false,
                        order: 3
                    }
                    return f_title;


                case 'url':
                    let f_url2: IField = {
                        isImage: false,
                        title: 'URL',
                        value: value,
                        valueType: 'url',
                        isHidden: false,
                        order: 4
                    }
                    return f_url2;

                case 'status':
                    let f_status: IField = {
                        isImage: false,
                        title: 'Status',
                        value: value ? "Active" : "Deactivated",
                        valueType: 'boolean',
                        isHidden: false,
                        order: 5
                    }
                    return f_status;

                case 'budget':
                    let formattedBudget = splitNumberValue(value as number);
                    let f_bud: IField = {
                        isImage: false,
                        title: 'Budget',
                        value: formattedBudget,
                        valueType: 'html',
                        isHidden: false,
                        order: 6
                    }
                    return f_bud;


                case 'epm':
                    let f_epm: IField = {
                        isImage: false,
                        title: 'Earn per thousand',
                        value: value,
                        valueType: 'number',
                        isHidden: false,
                        order: 7
                    }
                    return f_epm;

                case 'lastClick':
                    let f_last: IField = {
                        isImage: false,
                        title: 'Last Click',
                        value: value,
                        valueType: 'date',
                        isHidden: false,
                        order: 8
                    }
                    return f_last;

                case 'lastShared':
                    let f_shared: IField = {
                        isImage: false,
                        title: 'Last Shared',
                        value: value,
                        valueType: 'date',
                        isHidden: false,
                        order: 9
                    }
                    return f_shared;

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