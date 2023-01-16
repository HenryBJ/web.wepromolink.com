/* This example requires Tailwind CSS v3.0+ */
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Graphic from '../../components/Graphic'
import Logo from '../../components/Logo'
import NavBar from '../../components/NavBar'
import { NavButton } from '../../components/NavButton'


export default function HomeLayout() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className='bg-orange-500 md:bg-orange-100'>
            <div className="mx-auto h-screen">
                <div className='hidden md:flex'>
                    <div className='h-screen flex-1 w-full flex flex-col'>
                        <div className='grow'>
                            <Outlet />
                        </div>
                        <div className='my-2'>
                            <NavBar />
                        </div>
                    </div>
                    <div className=' bg-orange-500 h-screen flex-initial w-3/12 flex justify-center items-center overflow-hidden'>
                        <Logo scale={1.2} />
                    </div>
                </div>
            </div>
            <div className='hidden md:absolute top-0 left-1'>
                <Graphic scale={0.5} />
            </div>
        </div>
    )
}