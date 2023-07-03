import { ReactElement } from "react"
import { NavLink } from "react-router-dom"


interface IProps {
    levels: { icon?: ReactElement, title: string, link: string }[]
}

export default function Index({ levels }: IProps) {
    return (
        <div className="min-w-min min-h-min h-8 w-full sm:flex hidden">
            {levels.map((e, index) => {
                return (
                    <div key={index} className={` z-${50 - index} bg-orange-500 text-white rounded h-8 min-w-min px-7 border-l border-t border-b border-orange-500 relative cursor-default flex justify-center items-center font-medium`}>
                        <div className="bg-orange-500 rounded z-20 absolute -right-[9px] top-[3px] border-gray-400 border-solid border-r-0 border-t-0 border-b-0 w-6 h-6 transform rotate-45"></div>
                        {index !== 0 ? <div className="bg-gray-100 z-10 rounded absolute -left-[10px] top-[1px] border-gray-400 border-solid border-r-0 border-t-0 border-b-0 w-7 h-7 transform rotate-[45deg]"></div> : ''}
                        {e.link ?
                            <NavLink className="hover:text-gray-300 cursor-pointer capitalize" title={e.title} to={e.link}>
                                {e.icon ? e.icon : e.title}
                            </NavLink>
                            : e.title}
                    </div>
                )
            })}
        </div>
    )
}