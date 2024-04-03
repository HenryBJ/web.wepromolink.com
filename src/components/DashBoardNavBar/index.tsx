import { useEffect } from "react";
import { useAuth } from "../../hooks/Auth";
import ProfileMenu from "../ProfileMenu";
import TextLogo from "../TextLogo";
import ToolBar from "../ToolBar";
import { NavLink } from "react-router-dom";

export default function DashBoardNavBar() {

    const { user, logout } = useAuth();

    if (!user) return null;

    return (
        <nav className="sticky top-0 w-full h-min border border-b-2 z-50  bg-orange-500" style={{ zIndex: 100 }}>
            <div className="container w-full px-5 mx-auto h-full">
                <div className="flex flex-row py-1 items-center h-full ">
                    <div className="basis-1/5  pl-1">
                        <a href="https://wepromolink.com">
                            <TextLogo scale={0.8} fillcolor="white" />
                        </a>
                    </div>
                    <div className="basis-4/5 h-full flex flex-row justify-end pr-2 items-center">
                        <div className="hidden md:block">
                            <ToolBar />
                        </div>
                        <ProfileMenu email={user.email} name={user.displayName} imageUrl={user.photoURL} logout={logout} />
                    </div>
                </div>
            </div>
            <div className="bg-orange-500-500 w-full flex items-center justify-center">
                <div className="md:hidden my-1">
                    <ToolBar />
                </div>
            </div>
        </nav>
    )
}