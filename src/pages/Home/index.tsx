
export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <button className="bg-violet-800 hover:bg-violet-500 active:bg-violet-900 focus:outline-none focus:ring focus:ring-violet-300">Demo</button>
      <blockquote className="text-2xl font-semibold italic text-center text-slate-900">
        When you look
        <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block">
          <span className="relative text-white">annoyed</span>
        </span>
        all the time, people think that you're busy.
      </blockquote>
    </>

  )
}
