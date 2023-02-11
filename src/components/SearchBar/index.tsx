import { useState } from "react";

export default function Index() {

    const [searchTerm, setSearchTerm] = useState("");
    const handleChange = (event: any) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="w-2/3">
            <form>
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
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={handleChange}
                    />
                </div>

            </form>
        </div>
    );
}