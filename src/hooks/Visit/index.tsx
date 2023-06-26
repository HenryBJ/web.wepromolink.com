import { useEffect } from "react";
import { gTag } from "../../firebase";
import { User } from "firebase/auth";


export default function useVisit(event: string) {
    useEffect(() => {
        const user: User | null = JSON.parse(localStorage.getItem("user_wepromolink")!);
        gTag(event, { userName: user ?? 'anonymous' });
    }, []);
}