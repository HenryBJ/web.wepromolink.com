import Dash from "../../components/Dash";

export default function Balance() {
    return (
        <section className="container max-w-5xl px-2 mx-auto pt-3 h-full flex flex-col gap-2 justify-start items-center">
            <div className="flex gap-2 flex-wrap">
                <Dash title="Available" data={2343} transform={(e) => `$${e}`} trend={true} />
                <Dash title="Available" data={2343} transform={(e) => `$${e}`} trend={false} />
                <Dash title="Available" data={2343} transform={(e) => `$${e}`} />
                <Dash title="Available" data={2343} transform={(e) => `$${e}`} />
            </div>
        </section>)
}