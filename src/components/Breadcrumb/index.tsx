'use client'
import Link from "next/link"
import { ReactElement } from "react"
// import { NavLink } from "react-router-dom"


interface IProps {
    levels: { icon?: ReactElement, title: string, link: string }[]
}

export default function Index({ levels }: IProps) {
    return (
        <div className="min-w-min min-h-min h-5 w-full sm:flex hidden">
            {levels.map((e, index) => {
                return (
                    <div key={index} className={` z-${50 - index} bg-gray-300 text-gray-800 rounded h-6 min-w-min px-7 border-l border-t border-b border-gray-100 relative cursor-default flex justify-center items-center font-medium`}>
                        <div className="bg-gray-300 rounded z-20 absolute -right-[6px] top-[2.5px] border-gray-400 border-solid border-r-0 border-t-0 border-b-0 w-[17px] h-[17px] transform rotate-45"></div>
                        {index !== 0 ? <div className="bg-white z-10 rounded absolute -left-[7px] top-[2.5px] border-gray-400 border-solid border-r-0 border-t-0 border-b-0 w-[17px] h-[17px] transform rotate-[45deg]"></div> : ''}
                        {e.link ?
                            <Link className="hover:text-orange-500 cursor-pointer capitalize" title={e.title} href={e.link}>
                                {e.icon ? e.icon : e.title}
                            </Link>
                            : e.title}
                    </div>
                )
            })}
        </div>
    )
}