import { Link } from "react-router-dom"

interface IPros {
    title: string,
    url: string,
    bgColor?: string,
    fontColor?: string
}

export const NavButton = (props: IPros) => {
    return (<Link className="min-w-full bg-orange-500 text-white font-sans font-bold text-lg px-4 py-2 mx-4 my-4 rounded-full shadow-xl hover:shadow-none active:bg-white active:text-orange-500 active:ring-2 active:ring-orange-500" to={props.url}>
        <span>
            {props.title}
        </span>

    </Link>)
}