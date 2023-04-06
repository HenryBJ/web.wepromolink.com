import { IField, IGenericDetailData } from "../../components/GenericDetail";
import { IMyCampaignDetail } from "../../interfaces/ViewModels";

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
                    }
                    return f_id;

                case 'title':
                    let f_title: IField = {
                        isImage: false,
                        title: 'Title',
                        value: value,
                        valueType: 'string',
                        isHidden: true,
                    }
                    return f_title;

                case 'imageUrl':
                    let f_url: IField = {
                        isImage: true,
                        title: 'Image',
                        value: value,
                        valueType: 'image',
                        isHidden: false,
                    }
                    return f_url;

                case 'description':
                    let f_des: IField = {
                        isImage: false,
                        title: 'Description',
                        value: value,
                        valueType: 'string',
                        isHidden: false,
                    }
                    return f_des;



                case 'status':
                    let f_status: IField = {
                        isImage: false,
                        title: 'Status',
                        value: value ? "Active" : "Deactivated",
                        valueType: 'boolean',
                        isHidden: false,
                    }
                    return f_status;

                case 'budget':
                    let f_bud: IField = {
                        isImage: false,
                        title: 'Budget',
                        value: value,
                        valueType: 'number',
                        isHidden: false,
                    }
                    return f_bud;

                case 'epm':
                    let f_epm: IField = {
                        isImage: false,
                        title: 'Earn per thousand',
                        value: value,
                        valueType: 'number',
                        isHidden: false,
                    }
                    return f_epm;

                case 'lastClick':
                    let f_last: IField = {
                        isImage: false,
                        title: 'Last Click',
                        value: value,
                        valueType: 'date',
                        isHidden: false,
                    }
                    return f_last;

                case 'lastShared':
                    let f_shared: IField = {
                        isImage: false,
                        title: 'Last Shared',
                        value: value,
                        valueType: 'date',
                        isHidden: false,
                    }
                    return f_shared;

                default:
                    let other: IField = {
                        isImage: false,
                        title: key,
                        value: 'not supported',
                        valueType: 'string',
                        isHidden: true,
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