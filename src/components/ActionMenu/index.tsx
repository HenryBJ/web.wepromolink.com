import { Menu, Transition } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import { IExtraActions } from "../../interfaces/IExtraActions";
import { useNavigate } from "react-router-dom";
import GenericDialog from "../GenericDialog";
import { toast } from "react-toastify";

interface IProp {
    actions?: IExtraActions[] | undefined,
    item: any,
    reload?: () => void,
    onTap?: (value: Number) => void,
    setLoading?: (value: React.SetStateAction<boolean>) => void,
    relocationY?: string // Relocation in Y if close to bottom
}

export default function Index({ item, actions, reload, setLoading, onTap, relocationY="transform -translate-y-28" }: IProp) {

    const myRef = useRef<HTMLDivElement | null>(null);
    const [isNearBottom, setIsNearBottom] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [confirmationText, setConfirmationText] = useState("");
    const [indexSelected, setIndexSelected] = useState<number>(0);
    const [extraActionSelected, setExtraActionSelected] = useState<IExtraActions | null>(null);
    const navigate = useNavigate();

    const IsCloseToBottom = () => {
        let bottom = myRef.current && myRef.current.getBoundingClientRect().bottom || 0;
        let height = myRef.current && myRef.current.getBoundingClientRect().height || 0;
        let margin = 100;
        return bottom + height + margin >= window.innerHeight
    }

    return (<div ref={myRef}>

        <Menu>
            {({ open }) =>
            (<>
                <Menu.Button>
                    {() =>
                    (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="hover:text-orange-500 w-6 h-6 text-black/40">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>
                    )
                    }
                </Menu.Button>
                <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100 relative z-50"
                    leave="transition duration-100 ease-out"
                    leaveFrom="transform scale-100 opacity-100 relative z-50"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <Menu.Items className={
                        IsCloseToBottom()
                            ? `absolute top-0 right-0 mt-0 w-44 px-1 py-1 origin-top-right rounded bg-white ${relocationY} shadow-lg ring-1 ring-orange-100  focus:outline-none text-center text-gray-600 font-semibold overflow-auto z-50`
                            : "absolute top-0 right-0 mt-0 w-44 px-1 py-1 origin-top-right rounded bg-white shadow-lg ring-1 ring-orange-100  focus:outline-none text-center text-gray-600 font-semibold overflow-auto z-50"}>
                        {actions && actions.map((m, index) => (
                            <Menu.Item>
                                {({ active }) => (
                                    <button key={index} className="w-full rounded hover:bg-gray-200 flex gap-4 items-center" onClick={
                                        () => {
                                            if (m.requiredConfirmation) {
                                                setConfirmationText(m.confirmationText ?? "Sure?");
                                                setIndexSelected(index);
                                                setExtraActionSelected(m);
                                                setIsOpen(true);
                                            } else {
                                                m.action(item, navigate, reload, setLoading); onTap && onTap(index);
                                            }
                                        }}>
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

        <GenericDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={'Confirmation required'}
            description={confirmationText}
            actions={[{
                caption: 'Ok', fn: () => {
                    if (extraActionSelected) {
                        extraActionSelected.action(item, navigate, reload, setLoading);
                        onTap && onTap(indexSelected);
                        setIsOpen(false);
                    }
                }
            }]} />

    </div>)
}