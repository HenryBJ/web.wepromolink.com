import { Link } from "react-router-dom"

interface IPros {
    title: string,
    url: string,
    bgColor?: string,
    fontColor?: string,
    close?: (event: any) => void;
}

export const MenuOption = (props: IPros) => {
    return (
        <Link to={props.url} onClick={props.close} style={{ cursor: 'default' }} >
            <div className="hover:bg-orange-700 max-w-xs w-full inline-block bg-orange-500 text-white font-sans font-bold text-center text-lg py-1 my-1 rounded-full shadow-xl hover:shadow-none md:active:bg-white md:active:text-orange-500 md:active:ring-2 md:active:ring-orange-500">
                {props.title}
            </div>
        </Link>
    )
}

