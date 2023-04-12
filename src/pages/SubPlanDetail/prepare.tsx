import { IField, IGenericDetailData } from "../../components/GenericDetail";
import { INotification, ISubscriptionPlan } from "../../interfaces/ViewModels";

const checkIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
</svg>

export const prepareData = (noti: ISubscriptionPlan) => (): IGenericDetailData | undefined => {
    if (noti) {
        const properties = Object.entries(noti);
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
                        title: 'Subscription Plan Name',
                        value: value,
                        valueType: 'string',
                        isHidden: false,
                        order: 1
                    }
                    return f_title;

                case 'interval':
                    let f_inter: IField = {
                        isImage: false,
                        title: 'Interval',
                        value: value,
                        valueType: 'string',
                        isHidden: false,
                        order: 2,
                    }
                    return f_inter;

                case 'discount':
                    let f_bud: IField = {
                        isImage: false,
                        title: 'Discount',
                        value: value,
                        valueType: 'number',
                        isHidden: false,
                        order: 3,
                        transform: (e) => `${e}%`
                    }
                    return f_bud;


                case 'inUse':
                    let f_inuse: IField = {
                        isImage: false,
                        title: 'In Use',
                        value: value,
                        valueType: 'boolean',
                        isHidden: false,
                        order: 4,
                        transform:(e)=> e?checkIcon:'No'
                    }
                    return f_inuse;

                case 'ads':
                    let f_ads: IField = {
                        isImage: false,
                        title: 'Contains Ads',
                        value: value ,
                        valueType: 'boolean',
                        isHidden: false,
                        order: 5,
                        transform:(e)=> e?checkIcon:'No'
                    }
                    return f_ads;

                case 'depositFee':
                    let f_depositFee: IField = {
                        isImage: false,
                        title: 'Deposit Fee',
                        value: value,
                        valueType: 'number',
                        isHidden: false,
                        order: 6,
                        transform: (e) => `${e}%`
                    }
                    return f_depositFee;

                case 'payoutFee':
                    let f_payoutFee: IField = {
                        isImage: false,
                        title: 'Payout Fee',
                        value: value,
                        valueType: 'number',
                        isHidden: false,
                        order: 7,
                        transform: (e) => `${e}%`
                    }
                    return f_payoutFee;

                case 'payoutMinimun':
                    let f_payoutMinimun: IField = {
                        isImage: false,
                        title: 'Payout Minimun',
                        value: value,
                        valueType: 'number',
                        isHidden: false,
                        order: 8,
                        transform: (e) => `$${e}`
                    }
                    return f_payoutMinimun;

                case 'paymentMethod':
                    let f_paymentMethod: IField = {
                        isImage: false,
                        title: 'Payment Method',
                        value: value,
                        valueType: 'string',
                        isHidden: false,
                        order: 9,
                    }
                    return f_paymentMethod;

                case 'tag':
                    let f_tag: IField = {
                        isImage: false,
                        title: 'Tag',
                        value: value,
                        valueType: 'string',
                        isHidden: false,
                        order: 10,
                    }
                    return f_tag;

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
            title: noti.title
        }
    }

    return;
}