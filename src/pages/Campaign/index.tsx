import SearchBar from "../../components/SearchBar";

export default function Campaign() {
    return (
        <section className="container max-w-5xl mx-auto pt-3 h-full flex flex-col gap-2 justify-start items-center">
            <div className="w-full flex items-center justify-center">
                <SearchBar/>
                <button type="button" className="float-right ml-auto focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 font-medium rounded text-sm px-3 py-2">Create New Campaign</button>
            </div>


            <div className="relative overflow-x-auto rounded shadow-xl w-full">
                <table className="w-full text-sm text-left text-white rounded shadow-xl">
                    <thead className="text-xs text-white uppercase bg-orange-500">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Campaign
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Color
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b text-gray-700 hover:bg-gray-200 cursor-pointer">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4">
                                Sliver
                            </td>
                            <td className="px-6 py-4">
                                Laptop
                            </td>
                            <td className="px-6 py-4">
                                $2999
                            </td>
                        </tr>

                        <tr className="bg-white border-b text-gray-700 hover:bg-gray-200 cursor-pointer">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4">
                                Sliver
                            </td>
                            <td className="px-6 py-4">
                                Laptop
                            </td>
                            <td className="px-6 py-4">
                                $2999
                            </td>
                        </tr>

                        <tr className="bg-white border-b text-gray-700 hover:bg-gray-200 cursor-pointer">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4">
                                Sliver
                            </td>
                            <td className="px-6 py-4">
                                Laptop
                            </td>
                            <td className="px-6 py-4">
                                $2999
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

        </section>
    )
}