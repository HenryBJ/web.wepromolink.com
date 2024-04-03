/* This example requires Tailwind CSS v3.0+ */
import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import Graphic from '../../components/Graphic'
import Logo from '../../components/Logo'
import MenuHamb from '../../components/MenuHamb'
import { MenuOption } from '../../components/MenuOption'
import NavBar from '../../components/NavBar'
import { NavButton } from '../../components/NavButton'
import { AuthProvider, useAuth } from '../../hooks/Auth'
import AuthLayout from '../AuthLayout'
import SocialNetworks from '../../components/SocialNetworks'
import { ToastContainer } from 'react-toastify'


export default function HomeLayout() {

    const myRef = useRef(null);
    const [width, setWidth] = useState<any>(0);
    const [logoScale, setLogoScale] = useState<any>(1.2);

    const handleResize = () => {
        myRef.current && setWidth(myRef.current['offsetWidth']);
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    useEffect(() => handleLogo(), [width]);

    const handleLogo = () => {
        if (width < 1200 && logoScale !== 1) setLogoScale(0.8);
        if (width > 1200 && logoScale !== 1.2) setLogoScale(1.2);
    }



    return (
        <div ref={myRef} className='bg-orange-500 md:bg-orange-100'>
            <div className="mx-auto h-screen">
                <div className='hidden md:flex'>
                    <div className='h-screen flex-1 w-full flex flex-col bg-center bg-cover bg-hero'>
                        <div className='grow'>
                            <AuthProvider>
                                <ToastContainer position="bottom-right" />
                                <Outlet />
                            </AuthProvider>
                        </div>
                        <div className='my-2'>
                            <NavBar />
                        </div>
                    </div>
                    <div className=' bg-orange-500 relative h-screen flex-initial w-3/12 flex flex-col justify-center items-center overflow-hidden'>
                        <Logo scale={logoScale} />
                        {/* <span>{width}</span> */}
                        <span className='text-white sm:text-sm md:text-base text-center'>B-Tech Innovation Studios LLC</span>
                        <div className='absolute bottom-3 flex items-center justify-center w-full'>
                            <SocialNetworks />
                        </div>
                        <span className='absolute bottom-0 text-xs text-white/50 w-full text-right mr-1'>v1.0.134</span>
                    </div>
                </div>
                <div className='grow md:hidden h-[calc(100vh-74px)]'>
                    <AuthProvider>
                        <ToastContainer position="bottom-right" />
                        <Outlet />
                    </AuthProvider>
                </div>
            </div>
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