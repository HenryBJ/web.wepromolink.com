import { IField, IGenericDetailData } from "../../components/GenericDetail";
import { IMyAffLinkDetail, IMyCampaignDetail } from "../../interfaces/ViewModels";

export const prepareData = (linkdetail: IMyAffLinkDetail) => (): IGenericDetailData | undefined => {
    if (linkdetail) {
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
             

                case 'available':
                    let f_bud: IField = {
                        isImage: false,
                        title: 'Profit',
                        value: value,
                        valueType: 'number',
                        isHidden: false,
                        order: 6,
                        transform:(e:number)=>`$${e}`
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
            title: linkdetail.title
        }
    }

    return;
}