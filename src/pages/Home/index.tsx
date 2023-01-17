import { signInWithGoogle } from "../../firebase"

export default function Home() {

 const Click = () =>{
  signInWithGoogle()
  .then(result=>{
    console.log(result);
    alert(result.user.email)
  })
  .catch(error=>{
    console.log(error);
  })
 }

  return (
    <>
      <div className=" h-full flex justify-center items-center" >
        <button onClick={Click} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          login
        </button>
      </div>
    </>

  )
}
