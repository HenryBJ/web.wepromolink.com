import { ChangeEvent, FormEvent, useEffect, useState } from "react";


interface IProps {
    placeholder?: string,
    onChange: (key:string)=>void,
    interval?: number
}

let typingTimer: any;

export default function Index({ placeholder, onChange, interval = 2000 }: IProps) {

    const [searchTerm, setSearchTerm] = useState("");

    const handleClear = (e:any)=> {
        clearTimeout(typingTimer);
        setSearchTerm("");
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.target && setSearchTerm(e.target.value);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    }

    useEffect(()=>{
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => onChange(searchTerm), interval);
    },[searchTerm])
    
    return (
        <div className="w-full">
            <form onSubmit={handleSubmit}>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <svg
                            className="h-6 w-6 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </span>
                    <input
                        type="text"
                        className="w-full pl-10 pr-3 py-1 rounded bg-gray-200 border border-gray-400 focus:outline-none focus:bg-white"
                        placeholder={placeholder || 'Search...'}
                        value={searchTerm}
                        onChange={handleOnChange}
                    />
                    <span className={searchTerm? "absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-orange-500":"hidden"} onClick={handleClear}>
                        <svg
                            className="h-3 w-3 "
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 10 10"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M1 1l8 8M9 1L1 9"
                            />
                        </svg>
                    </span>
                </div>

            </form>
        </div>
    );
}