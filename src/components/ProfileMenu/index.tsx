import { Menu, Transition } from "@headlessui/react"
import { useEffect } from "react"

interface IUserInfo {
    name: string,
    email: string,
    imageUrl?: string,
    logout(): void
}

export default function ProfileMenu(props: IUserInfo) {

useEffect(()=>{
    console.log(props.imageUrl);
},[]);

    return (
        <Menu>
            {({ open }) =>
            (<>
                <Menu.Button>
                    {() => {
                        if (props.imageUrl) {
                            return (
                                <img className="w-9 h-9 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" alt="profile image" src={props.imageUrl}/>
                            )
                        }
                        else {
                            return (
                                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                </div>
                            )
                        }
                    }}
                </Menu.Button>
                <Transition
                    enter="transition duration-500 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-500 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <Menu.Items className="absolute right-0 mt-0 w-80 px-5 py-5 origin-top-right rounded-xl  bg-white shadow-lg ring-1 ring-orange-700 ring-opacity-25  focus:outline-none">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    className={`${active && 'bg-blue-500'}`}
                                    href="/account-settings"
                                >
                                    Account settings
                                </a>
                            )}
                        </Menu.Item>
                        {/* <Menu.Item>
                            {({ active }) => (
                                <a
                                    className={`${active && 'bg-blue-500'}`}
                                    href="/account-settings"
                                >
                                    Account settings
                                </a>
                            )}
                        </Menu.Item> */}
                    </Menu.Items>
                </Transition>
            </>)}

        </Menu>
    )
}