import { splitNumberValue } from "../../common";
import { IField, IGenericDetailData } from "../../components/GenericDetail";
import {ILinkDetail} from "../../interfaces/ViewModels";

export const prepareData = (linkdetail: ILinkDetail) => (): IGenericDetailData | undefined => {
    if (linkdetail) {
        let stats: IField[] = [
            {
                title: "Profit History",
                order: 1,
                collectionName:'linkprofit',
                externalId:linkdetail.id,
                valueType: 'generic-money',
                isHidden: false,
                value: '',
                isImage: false,
                hideTitle:true
            },
            {
                title: "Clicks",
                order: 2,
                collectionName:'linkxclick',
                externalId:linkdetail.id,
                valueType: 'generic-line',
                isHidden: false,
                value: '',
                isImage: false,
                hideTitle:true
            },
            {
                title: "Clicks by Countries",
                order: 3,
                collectionName:'linkclickcountry',
                externalId:linkdetail.id,
                valueType: 'generic-pie',
                isHidden: false,
                value: '',
                isImage: false,
                hideTitle:true
            },

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

                case 'url':
                        return {
                            isImage: false,
                            title: 'Url',
                            value: value,
                            valueType: 'url',
                            isHidden: true,
                            order: 1
                        } as IField
                    
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

                case 'imageData':
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
                    return {
                        isImage: false,
                        title: 'Profit',
                        value: value,
                        valueType: 'dash-money',
                        transform:e=>`${e}`,
                        isHidden: false,
                        hideTitle: true,
                        order: 1,
                    } as IField
                
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