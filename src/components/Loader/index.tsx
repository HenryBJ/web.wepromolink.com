import Spinner, { SpinnerType } from "../Spinner";

interface IProps{
    text?: string
}

export default function Index({text = "Loading..."}:IProps) {
    return (<div className="fixed top-0 left-0 w-full h-full bg-black/40 z-50 flex justify-center items-center">
        <div className="px-10 min-w-min rounded h-16 ring-2 shadow-lg ring-white bg-orange-500/90 flex justify-center items-center text-white text-lg"><Spinner type={SpinnerType.Primary} text={text} /></div>
    </div>)
}