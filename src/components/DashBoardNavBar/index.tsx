import { useEffect } from "react";
import { useAuth } from "../../hooks/Auth";
import ProfileMenu from "../ProfileMenu";
import TextLogo from "../TextLogo";

export default function DashBoardNavBar(){

    const {user, logout } = useAuth();

    useEffect(()=>{
        console.log(user);
    },[])

    return (
        <nav className="sticky top-0 w-full h-12 border border-b-2 z-50  bg-orange-500">
            <div className="container max-w-5xl mx-auto h-full">
                <div className="flex flex-row py-1 items-center h-full ">
                    <div className="basis-1/3">
                        <TextLogo scale={0.8} fillcolor="white"/>
                    </div>
                    <div className="basis-2/5">
                        Search
                    </div>
                    <div className="basis-1/5">
                        <ProfileMenu email={user.email} name={user.displayName} imageUrl={user.photoURL} logout={()=>console.log("logout")}/>                   
                    </div>
                </div>
            </div>
        </nav>
    )
}