/* This example requires Tailwind CSS v3.0+ */
import { useState } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import Graphic from '../../components/Graphic'
import Logo from '../../components/Logo'
import MenuHamb from '../../components/MenuHamb'
import { MenuOption } from '../../components/MenuOption'
import NavBar from '../../components/NavBar'
import { NavButton } from '../../components/NavButton'
import { AuthProvider, useAuth } from '../../hooks/Auth'
import AuthLayout from '../AuthLayout'


export default function HomeLayout() {
    // const { user } = useAuth();
    // if (user) {
    //     return <Navigate to="/dashboard" />;
    // }

    return (
        <div className='bg-orange-500 md:bg-orange-100'>
            <div className="mx-auto h-screen">
                <div className='hidden md:flex'>
                    <div className='h-screen flex-1 w-full flex flex-col'>
                        <div className='grow'>
                            <AuthProvider>
                                <Outlet />
                            </AuthProvider>

                        </div>
                        <div className='my-2'>
                            <NavBar />
                        </div>
                    </div>
                    <div className=' bg-orange-500 h-screen flex-initial w-3/12 flex justify-center items-center overflow-hidden'>
                        <Logo scale={1.2} />
                    </div>
                </div>
                <div className='grow md:hidden h-[calc(100vh-74px)]'>
                    <AuthProvider>
                        <Outlet />
                    </AuthProvider>
                </div>
            </div>
            {/* <div className='hidden md:block md:absolute top-0 left-1'>
                <Graphic scale={0.5} />
            </div> */}
            <div className='md:hidden  absolute top-3 right-6'>
                <MenuHamb>
                    <MenuOption title='Home' url='/' />
                    <MenuOption title='Terms' url='/terms' />
                    <MenuOption title='FAQ' url='/faq' />
                    <MenuOption title='Pricing' url='/pricing' />
                    <MenuOption title='Contact Us' url='/contact' />
                </MenuHamb>
            </div>
        </div>
    )
}