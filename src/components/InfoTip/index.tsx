import { Menu, Transition } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import { IExtraActions } from "../../interfaces/IExtraActions";

interface IProp {
    text: string
}

export default function Index({ text }: IProp) {

    const myRef = useRef<HTMLDivElement | null>(null);
    const [isNearBottom, setIsNearBottom] = useState(false);


    const IsCloseToBottom = () => {
        let bottom = myRef.current && myRef.current.getBoundingClientRect().bottom || 0;
        let height = myRef.current && myRef.current.getBoundingClientRect().height || 0;
        let margin = 30;
        return bottom + height + margin >= window.innerHeight
    }

    return (<div ref={myRef} className="absolute top-1 right-1">

        <Menu>
            {({ open }) =>
            (<>
                <Menu.Button>
                    {() =>
                    (
                        <div className={IsCloseToBottom()?"hidden":"text-gray-400 cursor-pointer hover:text-orange-500"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>
                        </div>
                    )
                    }
                </Menu.Button>
                <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-100 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <Menu.Items className="absolute text-sm top-0 right-0 mt-0 w-72 h-20 px-1 py-1 origin-top-right rounded bg-white shadow-lg ring-1 ring-orange-100  -translate-x-6 -translate-y-6 focus:outline-none text-center text-gray-600 font-semibold overflow-auto z-50">
                        <Menu.Item>
                            {()=>(<div className="w-full relative text-left">{text}</div>)}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </>)}

        </Menu>
    </div>)
}