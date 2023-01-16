import { NavButton } from "../NavButton";

export default function NavBar() {
    return (
    <nav>
        <NavButton title='Home' url='/' />
        <NavButton title='Terms' url='/terms' />
        <NavButton title='FAQ' url='/faq' />
        <NavButton title='Pricing' url='/pricing' />
        <NavButton title='Contact Us' url='/contact' />
        <NavButton title='Login' url='/login' />
    </nav>
    )
}