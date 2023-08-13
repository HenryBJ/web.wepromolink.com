import { Link } from "react-router-dom"
import { createRipples } from 'react-ripples'

interface IPros {
    title: string,
    url: string,
    bgColor?: string,
    fontColor?: string
}

export const NavButton = (props: IPros) => {

    const MyRipples = createRipples({
        color: 'rgba(0, 0, 0, .3)',
        during: 600,
        className:'rounded-full mx-2 my-1'
    })

    return (
        <MyRipples>
            <Link to={props.url}>
                <div className="hover:bg-orange-700 max-w-xs w-40 cursor-pointer inline-block bg-orange-500 text-white font-sans font-bold text-center text-lg px-6 py-1 rounded-full shadow-xl hover:shadow-none ">
                    {props.title}
                </div>
            </Link>
        </MyRipples>
    )
}