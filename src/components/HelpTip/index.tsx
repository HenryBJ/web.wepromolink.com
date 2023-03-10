import { Menu, Transition } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import { IExtraActions } from "../../interfaces/IExtraActions";
import GenericDialog from "../GenericDialog";

interface IProp {
    text: string,
    title: string,
}

export default function Index({ title, text }: IProp) {

    let [isOpen, setIsOpen] = useState(false);

    const OpenDialog = () => {
        setIsOpen(true);
    }

    const myRef = useRef<HTMLDivElement | null>(null);

    const IsCloseToBottom = () => {
        let bottom = myRef.current && myRef.current.getBoundingClientRect().bottom || 0;
        let height = myRef.current && myRef.current.getBoundingClientRect().height || 0;
        let margin = 30;
        return bottom + height + margin >= window.innerHeight
    }

    return (
        <div onClick={()=>setIsOpen(true)} className={IsCloseToBottom() ? "hidden" : "text-white cursor-pointer hover:text-gray-200 absolute top-0 right-0 m-1"}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <GenericDialog isOpen={isOpen} setIsOpen={setIsOpen} title={title} description={text} />
        </div>)
}