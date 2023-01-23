import { useEffect } from "react";
import { useAuth } from "../../hooks/Auth";
import ProfileMenu from "../ProfileMenu";
import TextLogo from "../TextLogo";
import ToolBar from "../ToolBar";

export default function DashBoardNavBar() {

    const { user, logout } = useAuth();

    return (
        <nav className="sticky top-0 w-full h-min border border-b-2 z-50  bg-orange-500">
            <div className="container max-w-5xl mx-auto h-full">
                <div className="flex flex-row py-1 items-center h-full ">
                    <div className="basis-1/5  pl-1">
                        <TextLogo scale={0.8} fillcolor="white" />
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
                <div className="md:hidden">
                    <ToolBar />
                </div>
            </div>
        </nav>
    )
}