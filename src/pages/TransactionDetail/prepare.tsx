import { IField, IGenericDetailData } from "../../components/GenericDetail";
import { IMyTransactionDetail } from "../../interfaces/ViewModels";

export const prepareData = (trasaction: IMyTransactionDetail) => (): IGenericDetailData | undefined => {
    if (trasaction) {
        const properties = Object.entries(trasaction);
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

                case 'campaignImageUrl':
                    let f_campaignImageUrl: IField = {
                        isImage: true,
                        title: 'Campaign',
                        value: value,
                        valueType: 'image',
                        isHidden: !value && true,
                        hideTitle: true,
                        order: 1
                    }
                    return f_campaignImageUrl;

                case 'linkImageUrl':
                    let f_linkImageUrl: IField = {
                        isImage: true,
                        title: 'Link URL',
                        value: value,
                        valueType: 'url',
                        isHidden: !value && true,
                        hideTitle: false,
                        order: 2
                    }
                    return f_linkImageUrl;

                case 'title':
                    let f_title: IField = {
                        isImage: false,
                        title: 'Transaction name',
                        value: value,
                        valueType: 'string',
                        isHidden: false,
                        order: 3
                    }
                    return f_title;

                case 'campaignName':
                    let f_campaignName: IField = {
                        isImage: false,
                        title: 'Campaign',
                        value: value,
                        valueType: 'string',
                        isHidden: !value && true,
                        order: 4
                    }
                    return f_campaignName;

                case 'amount':
                    let f_bud: IField = {
                        isImage: false,
                        title: 'Amount',
                        value: value,
                        valueType: 'number',
                        isHidden: false,
                        order: 5,
                        transform: (e: number) => e<0 ? `-$${Math.abs(e)}`:`$${e}`
                    }
                    return f_bud;


                case 'status':
                    let f_status: IField = {
                        isImage: false,
                        title: 'Status',
                        value: value,
                        valueType: 'string',
                        isHidden: !value && true,
                        order: 6
                    }
                    return f_status;

                case 'transactionType':
                    let f_transactionType: IField = {
                        isImage: false,
                        title: 'Type',
                        value: value,
                        valueType: 'string',
                        isHidden: !value && true,
                        order: 7
                    }
                    return f_transactionType;

                case 'createdAt':
                    let f_last: IField = {
                        isImage: false,
                        title: 'Created At',
                        value: value,
                        valueType: 'date',
                        isHidden: !value && true,
                        order: 8
                    }
                    return f_last;

                case 'expiredAt':
                    let f_expiredAt: IField = {
                        isImage: false,
                        title: 'Expired At',
                        value: value,
                        valueType: 'date',
                        isHidden: !value && true,
                        order: 9
                    }
                    return f_expiredAt;

                case 'completedAt':
                    let f_completedAt: IField = {
                        isImage: false,
                        title: 'Completed At',
                        value: value,
                        valueType: 'date',
                        isHidden: !value && true,
                        order: 10
                    }
                    return f_completedAt;


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
            title: trasaction.title
        }
    }

    return;
}