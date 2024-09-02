'use client'
import { getMyExternalId } from "../../services";
import DashGeneric from "../../components/DashGeneric";
import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";



export default function Dashboard() {

    const dashIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  inline mr-2 my-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
    </svg>;

    const [externalId, SetExternalId] = useState<string>()

    useEffect(()=>{
        getMyExternalId().then(res=>SetExternalId(res.data))
    },[])

    return (
        <section className="container max-w-5xl px-2 mx-auto pt-1 pb-6 h-full flex flex-col gap-2 justify-center items-center">
            <Breadcrumb levels={[{ icon: dashIcon, title: 'Dashboard', link: '/dashboard' }, { title: 'Dashboard', link: '' }]} />
            <div className="flex gap-2 flex-wrap  justify-center items-start">
                {/* <DashPrice title="Available" load={getAvailableBalanceData} helpTip={'This is the amount of money from the user\'s budget that has not yet been assigned to any campaigns. It represents the funds that are still available for the user to allocate to new or existing campaigns.'} /> */}
                {/* <DashPrice title="Profit" load={getProfitBalanceData} helpTip={'This is the amount of money that the user has earned from the clicks received on their shared links. It represents the revenue generated from the user\'s campaigns and is available for withdrawal.'} /> */}
                <DashGeneric collectionName="available" type="Line-Money"  title="Available History" externalId={externalId}/>
                <DashGeneric collectionName="profit" type="Line-Money"  title="Profit History" externalId={externalId}/>
                <DashGeneric collectionName="generalclicklinks" type="Line"  title="Unique clicks on Links" externalId={externalId}/>
                <DashGeneric collectionName="generalclickcampaign" type="Line"  title="Unique clicks on Campaign" externalId={externalId}/>
                <DashGeneric collectionName="generalshare" type="Line"  title="Shared Campaigns" externalId={externalId}/>
            </div>
        </section>)
}