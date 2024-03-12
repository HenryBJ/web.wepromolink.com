import { Menu, Transition } from "@headlessui/react"
import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom";
import NotiWrapper from "../NotiWrapper";
import { useAuth } from "../../hooks/Auth";
import { getExternalId, getLevel } from "../../services";
import GenericDialog from "../GenericDialog";

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

    const GoBilling = (fn: () => void) => {
        navigate("/billing");
        fn();
    }

    const GoUpgrade = (fn: () => void) => {
        navigate("/pricing");
        fn();
    }

    const GoProfile = (fn: () => void) => {
        getExtUserId.then(data => {
            navigate(`/profile/${data.data}`);
            fn();
        }).catch(err => console.log(err));

    }

    return (
        <Menu>
            {({ open }) =>
            (<>
                <Menu.Button>
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
                    enter="transition duration-500 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-500 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <Menu.Items className="absolute top-8 right-0 mt-0 w-44 px-3 py-3 origin-top-right rounded bg-white shadow-lg ring-1 ring-orange-700 ring-opacity-25  focus:outline-none text-center text-orange-600 font-semibold ">
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
                                <button className="hover:bg-orange-500 w-full rounded hover:text-white text-start px-1" onClick={() => GoBilling(close)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline mr-2 my-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                    </svg>

                                    <span>Billing</span>
                                </button>
                            )}
                        </Menu.Item>
                        {!verified &&<Menu.Item>
                            {({ active, close }) => (
                                <button className="hover:bg-orange-500 w-full rounded hover:text-white text-start px-1" onClick={() => GoUpgrade(close)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline mr-2 my-2">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                                    </svg>
                                    <span>Upgrade</span>
                                </button>
                            )}
                        </Menu.Item>}
                        <Menu.Item>
                            {({ active }) => (
                                <button className="hover:bg-orange-500 w-full rounded hover:text-white text-start px-1" onClick={props.logout}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline mr-2 my-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                    </svg>
                                    <span>Log out</span>
                                </button>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </>)}
        </Menu>
    )
}