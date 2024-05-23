import { Menu, Transition } from "@headlessui/react"
import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom";
import NotiWrapper from "../NotiWrapper";
import { useAuth } from "../../hooks/Auth";
import { getExternalId, getLevel } from "../../services";
import { Link } from "react-router-dom";

interface IUserInfo {
    name: string,
    email: string,
    imageUrl?: string,
    logout(): void
}




export default function ProfileMenu(props: IUserInfo) {
    const [verified, setVerified] = useState(false)
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(()=>{
        getLevel().then(res=>setVerified(res.data > 1))
    },[])

    const getExtUserId = useMemo(() => {
        return getExternalId(user.uid)
    }, [user.uid]);


    const GoSettings = () => {
        navigate("/settings");
    }

    const GoNotifications = (fn: () => void) => {
        navigate("/notifications");
        fn();
    }

    const GoDashboard = (fn: () => void) => {
        navigate("/dashboard");
        fn();
    }

    const GoFeed = (fn: () => void) => {
        navigate("/feed");
        fn();
    }

    const GoCampaigns = (fn: () => void) => {
        navigate("/campaigns");
        fn();
    }

    const GoLinks = (fn: () => void) => {
        navigate("/links");
        fn();
    }

    const GoBalance = (fn: () => void) => {
        navigate("/balance");
        fn();
    }

    const GoBilling = (fn: () => void) => {
        navigate("/billing");
        fn();
    }


    const GoProfile = (fn: () => void) => {
        getExtUserId.then(data => {
            navigate(`/profile/${data.data}`);
            fn();
        }).catch(err => console.log(err));

    }

    return (
        <>
        <div title="Profit" className="cursor-default text-gray-800"><Link to={'/balance'}>$0.00</Link></div>
        <Menu>
            {({ open, close }) =>
            (<>
                <Menu.Button className="focus:outline-none"
                onMouseEnter={({ target }:any) => open ? "" : target.click?.()}
                // onMouseLeave={({ target }:any) => open ? target.click?.() : ""}
                >
                    {() => {
                        if (props.imageUrl) {
                            return (
                                <NotiWrapper notiIndex="notification">
                                    <img className="ml-4 w-7 max-w-[40px] max-h-[40px] h-7  rounded-full ring-1 ring-white" alt="profile image" src={props.imageUrl} />
                                </NotiWrapper>
                            )
                        }
                        else {
                            return (
                                <NotiWrapper notiIndex="notification">
                                    <div className="ml-4 relative w-7 h-7 max-w-[40px] max-h-[40px] overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                        <svg className="absolute w-7 h-7 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                    </div>
                                </NotiWrapper>
                            )
                        }
                    }}
                </Menu.Button>
                <Transition className="relative z-50"
                    enter="transition duration-50 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-50 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <Menu.Items
                    onMouseLeave={({ target }:any) => close()} 
                    className="absolute top-8 right-0 mt-0 w-44 px-3 py-3 origin-top-right rounded bg-white shadow-lg ring-1 ring-gray-400 ring-opacity-25  focus:outline-none text-center text-gray-600 font-semibold ">
                        <Menu.Item>
                            {({ active, close }) => (
                                <NotiWrapper notiIndex="notification">
                                    <button className="hover:bg-orange-500 w-full rounded hover:text-white text-start px-1" onClick={() => GoNotifications(close)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  inline mr-2 my-2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                        </svg>
                                        <span>Notifications</span>
                                    </button>
                                </NotiWrapper>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active, close }) => (
                                <>
                                <hr/>
                                <button className="hover:bg-orange-500 w-full rounded hover:text-white text-start px-1" onClick={() => GoDashboard(close)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  inline mr-2 my-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
                                    </svg>
                                    <span>Dashboard</span>
                                </button>
                                </>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active, close }) => (
                                <NotiWrapper notiIndex="campaign">
                                <button className="hover:bg-orange-500 w-full rounded hover:text-white text-start px-1" onClick={() => GoFeed(close)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  inline mr-2 my-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                    </svg>
                                    <span>Promote</span>
                                </button>
                                </NotiWrapper>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active, close }) => (
                                <button className="hover:bg-orange-500 w-full rounded hover:text-white text-start px-1" onClick={() => GoCampaigns(close)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  inline mr-2 my-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
                                    </svg>
                                    <span>Campaigns</span>
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active, close }) => (
                                <button className="hover:bg-orange-500 w-full rounded hover:text-white text-start px-1" onClick={() => GoLinks(close)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  inline mr-2 my-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                    </svg>
                                    <span>Links</span>
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active, close }) => (
                                <>
                                <hr/>
                                <button className="hover:bg-orange-500 w-full rounded hover:text-white text-start px-1" onClick={() => GoBalance(close)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  inline mr-2 my-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                                    </svg>
                                    <span>Balance</span>
                                </button>
                                </>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active, close }) => (
                                <button className="hover:bg-orange-500 w-full rounded hover:text-white text-start px-1" onClick={() => GoBilling(close)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline mr-2 my-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                    </svg>
                                    <span>Billing</span>
                                </button>
                            )}
                        </Menu.Item>
                        {/* {!verified &&<Menu.Item>
                            {({ active, close }) => (
                                <button className="hover:bg-orange-500 w-full rounded hover:text-white text-start px-1" onClick={() => GoUpgrade(close)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline mr-2 my-2">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                                    </svg>
                                    <span>Upgrade</span>
                                </button>
                            )}
                        </Menu.Item>} */}
                        <Menu.Item>
                            {({ active }) => (
                                <>
                                <hr/>
                                <button className="hover:bg-orange-500 w-full rounded hover:text-white text-start px-1" onClick={props.logout}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline mr-2 my-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                    </svg>
                                    <span>Log out</span>
                                </button>
                                </>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </>)}
        </Menu>
        </>
    )
}