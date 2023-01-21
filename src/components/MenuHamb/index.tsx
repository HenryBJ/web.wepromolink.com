import { Divide as Hamburger } from 'hamburger-react'

export default function MenuHamb() {

    return (
        <div>
            <Hamburger color="white" duration={1.2} onToggle={toggled => {
                if (toggled) {
                    // open a menu
                } else {
                    // close a menu
                }
            }} />
        </div>)
}