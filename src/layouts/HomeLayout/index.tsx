/* This example requires Tailwind CSS v3.0+ */
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { NavButton } from '../../components/NavButton'


export default function HomeLayout() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className='bg-orange-100'>
            <div className="mx-auto h-screen">
                <div className='flex'>
                    <div className='h-screen flex-1 w-full'>
                        <Outlet />
                    </div>
                    <div className=' bg-orange-500 h-screen flex-initial w-1/3'>Right</div>
                </div>
            </div>
        </div>
    )
}