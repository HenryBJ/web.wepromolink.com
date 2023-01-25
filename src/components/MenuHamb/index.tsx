import { Menu, Transition } from '@headlessui/react'
import { Divide as Hamburger } from 'hamburger-react'
import React, { ReactElement, ReactFragment, useState } from 'react'
import { MenuOption } from '../MenuOption'

type Props = {
    title: string,
    url: string
}

export default function MenuHamb({ children }: any) {

    const [setOpen] = useState(false)

    return (
        <Menu>
            {({ open, close }) =>
            (<>
                <Menu.Button>
                    <Hamburger toggled={open} color="white" duration={0.5} />
                </Menu.Button>
                <Transition
                    enter="transition duration-500 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-500 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <Menu.Items className="absolute right-0 mt-0 w-80 px-7 py-5 origin-top-right rounded-xl  bg-white shadow-lg ring-1 ring-orange-700 ring-opacity-25  focus:outline-none">
                        {() => children.map((e: ReactElement, i: number) =>
                        (
                            <Menu.Item key={i}>
                                {React.cloneElement(e,{close:close})}
                                {/* {e} */}
                            </Menu.Item>
                        ))}
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


        // <div>
        //     <Hamburger color="white" duration={1.2} onToggle={toggled => {
        //         if (toggled) {
        //             // open a menu
        //         } else {
        //             // close a menu
        //         }
        //     }} />
        // </div>

    )
}