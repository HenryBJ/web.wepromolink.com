import { Children, ReactElement, ReactNode, useEffect } from "react";
import InfoTip from "../InfoTip";
import { Control, FieldValues, useForm, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import React from "react";
import WarningTip from "../WarningTip";
import { useNavigate } from "react-router-dom";
import SubscribeWrapper from "../SubscribeWrapper";
import Spinner from "../Spinner";

type FormProps = (props: { register: UseFormRegister<FieldValues>, watch: UseFormWatch<FieldValues>, control: Control<FieldValues, any>, setValue: UseFormSetValue<FieldValues> }) => React.ReactNode;


export interface IFormItems {
    helpTip?: string,
    field?: string,
    children: FormProps | ReactNode
}


interface IProps {
    title?: string,
    buttonTitle?: string,
    schema: any,
    onSubmit: (data: any) => void,
    children: ReactNode,
    back?: boolean,
    initialValue?: any,
    requiredSubscription?: boolean,
    loading?: boolean
}

export function FormItem({ helpTip, children }: IFormItems) {
    return (
        <>
            {helpTip && <InfoTip text={helpTip} />}
            {children}
        </>
    )
}


export default function Index({ loading, children, schema, title, buttonTitle = "Submit", onSubmit, back = true, initialValue, requiredSubscription = true }: IProps) {

    const { register, handleSubmit, formState: { errors }, watch, control, setValue } = useForm({
        resolver: yupResolver(schema)
    });

    const navigation = useNavigate();

    const handleBack = () => {
        navigation(-1);
    }

    const handleError = (error: any) => {
        console.log(errors);
    }

    useEffect(() => {
        if (initialValue) {
            for (const prop in initialValue) {
                if (Object.prototype.hasOwnProperty.call(initialValue, prop)) {
                    const value = initialValue[prop];
                    setValue(prop, value);
                }
            }
        }
    }, [initialValue]);


    return (
        <div className="relative w-full bg-gray-200 flex flex-col rounded shadow-xl">
            {back && <div className="absolute top-1 left-3 text-white cursor-pointer hover:text-gray-300" onClick={handleBack}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>}
            <div className="h-9 w-full rounded-t bg-orange-500 uppercase text-white flex items-center justify-center font-bold  ">
                {title}
            </div>
            <div className="flex flex-col gap-1">
                <form onSubmit={handleSubmit(onSubmit)} onError={handleError}>
                    {React.Children.map(children, (child, index) => {
                        let echild = child as ReactElement;
                        let error = echild.props['field'] && errors[`${echild.props['field']}`]?.message;
                        let helpTip = echild.props['helpTip'];
                        if (typeof echild.props.children === "function") {
                            let fn: FormProps = echild.props.children;
                            return (
                                <div key={index} style={{ zIndex: `${45 - index}` }} className="relative min-h-[60px] bg-white shadow pr-16 px-2 py-2">
                                    {fn({ register: register, watch: watch, control: control, setValue: setValue })}
                                    {helpTip && <InfoTip text={helpTip} />}
                                    {error && <WarningTip text={error} />}
                                </div>);
                        } else {
                            return (
                                <div key={index} style={{ zIndex: `${45 - index}` }} className="relative min-h-[60px] bg-white shadow pr-16 px-2 py-2">
                                    {child}
                                    {error && <WarningTip text={error} />}
                                </div>);
                        }

                    })}
                    <div className="min-h-[60px] bg-white shadow px-2 py-2 flex items-center justify-center">
                        {requiredSubscription ?
                            <SubscribeWrapper style="">
                                <button disabled={loading} type="submit" className="min-w-[200px] focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 font-medium rounded text-sm px-3 py-2">
                                    <div className="flex justify-center">
                                        {loading && <Spinner text="" />}
                                        {buttonTitle}
                                    </div>
                                </button>
                            </SubscribeWrapper>
                            :
                            <button type="submit" className="min-w-[200px] focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 font-medium rounded text-sm px-3 py-2">
                                {buttonTitle}
                            </button>
                        }

                    </div>
                </form>
            </div>
        </div>
    )
}
