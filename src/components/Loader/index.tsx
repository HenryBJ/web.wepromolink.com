import Spinner, { SpinnerType } from "../Spinner";

export default function Index() {
    return (<div className="fixed top-0 left-0 w-full h-full bg-black/40 z-50 flex justify-center items-center">
        <div className="w-40 rounded h-16 ring-2 shadow-lg ring-white bg-orange-500/90 flex justify-center items-center text-white text-lg"><Spinner type={SpinnerType.Primary} text="Loading..." /></div>
    </div>)
}