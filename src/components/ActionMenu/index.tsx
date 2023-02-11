import { Menu, Transition } from "@headlessui/react";
import { IExtraActions } from "../../interfaces/IExtraActions";

interface IProp {
    actions: IExtraActions[],
    item: any
}

export default function Index({ item, actions }: IProp) {
    return (<>
        <Menu>
            {({ open }) =>
            (<>
                <Menu.Button>
                    {() =>
                    (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="hover:text-orange-500 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </svg>
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
                    <Menu.Items className="absolute top-0 right-0 mt-0 w-44 px-1 py-1 origin-top-right rounded bg-white shadow-lg ring-1 ring-orange-100  focus:outline-none text-center text-gray-600 font-semibold overflow-auto">
                        {actions.map(m => (
                            <Menu.Item>
                                {({ active }) => (
                                    <button className="w-full rounded hover:bg-gray-200 flex gap-4 items-center" onClick={() => m.action(item)}>
                                        {m.icon}
                                        <span className="basis-3/4 text-left">{m.title}</span>
                                    </button>
                                )}
                            </Menu.Item>
                        ))}
                    </Menu.Items>
                </Transition>
            </>)}

        </Menu>
    </>)
}