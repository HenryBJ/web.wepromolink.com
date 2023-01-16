import { NavButton } from "../NavButton";

export default function NavBar() {
    return (
    <nav className="hidden md:flex flex-wrap gap-y-0 justify-center">
        <NavButton title='Home' url='/' />
        <NavButton title='Terms' url='/terms' />
        <NavButton title='FAQ' url='/faq' />
        <NavButton title='Pricing' url='/pricing' />
        <NavButton title='Contact Us' url='/contact' />
    </nav>
    )
}