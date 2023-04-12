import { IField, IGenericDetailData } from "../../components/GenericDetail";
import { IMyCampaignDetail, IMyTransactionDetail } from "../../interfaces/ViewModels";

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

                case 'title':
                    let f_title: IField = {
                        isImage: false,
                        title: 'Transaction name',
                        value: value,
                        valueType: 'string',
                        isHidden: false,
                        order: 1
                    }
                    return f_title;

                case 'amount':
                    let f_bud: IField = {
                        isImage: false,
                        title: 'Amount',
                        value: value,
                        valueType: 'number',
                        isHidden: false,
                        order: 2,
                        transform: (e: number) => `$${e}`
                    }
                    return f_bud;


                case 'status':
                    let f_status: IField = {
                        isImage: false,
                        title: 'Status',
                        value: value,
                        valueType: 'string',
                        isHidden: false,
                        order: 3
                    }
                    return f_status;


                case 'created':
                    let f_last: IField = {
                        isImage: false,
                        title: 'Created',
                        value: value,
                        valueType: 'date',
                        isHidden: false,
                        order: 4
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
            title: trasaction.title
        }
    }

    return;
}