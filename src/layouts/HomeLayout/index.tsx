/* This example requires Tailwind CSS v3.0+ */
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'


export default function HomeLayout() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/terms">Terms</Link>
                <Link to="/faq">FAQ</Link>
                <Link to="/pricing">Pricing</Link>
                <Link to="/contact">Contact Us</Link>
                <Link to="/login">Login</Link>
            </nav>
            <Outlet />
        </div>
    )
}