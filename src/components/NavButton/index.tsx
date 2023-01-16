import { Link } from "react-router-dom"

interface IPros {
    title: string,
    url: string,
    bgColor?: string,
    fontColor?: string
}

export const NavButton = (props: IPros) => {

    return (
        <Link to={props.url}>
            <div className="max-w-xs w-40 cursor-pointer inline-block bg-orange-500 text-white font-sans font-bold text-center text-lg px-6 py-1 mx-2 my-1 rounded-full shadow-xl hover:shadow-none active:bg-white active:text-orange-500 active:ring-2 active:ring-orange-500">
                {props.title}
            </div>
        </Link>
    )
}