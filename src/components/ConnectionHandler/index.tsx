import React, {useState, useEffect, ReactNode} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlug} from "@fortawesome/free-solid-svg-icons";

interface Props {
    children: ReactNode;
}

export default function Index({children}: Props): React.ReactElement | null {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleConnectionChange = () => {
            setIsOnline(navigator.onLine);
        };

        window.addEventListener('online', handleConnectionChange);
        window.addEventListener('offline', handleConnectionChange);

        return () => {
            window.removeEventListener('online', handleConnectionChange);
            window.removeEventListener('offline', handleConnectionChange);
        };
    }, []);

    if (!isOnline) {
        return (
            <div
                className="relative h-screen md:h-auto container max-w-3xl mx-auto flex gap-8 items-center flex-col justify-center text-orange-500 md:text-orange-500 pt-12 md:pt-0 md:mt-5 px-4 md:px-0">
                <FontAwesomeIcon icon={faPlug} size="3x" className="mb-4"/>
                <div className="text-lg border-2 border-orange-500 p-4 rounded-lg flex flex-col gap-2">
                    <span className="font-bold text-2xl">Connection Lost</span>
                    <div className="flex flex-col gap-1 text-base">
                        <span>It seems you're not connected to the internet. Please check your connection and try again.</span>
                    </div>
                </div>
            </div>
        );
    }

    return children as React.ReactElement | null;
}

