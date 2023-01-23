
export default function Pricing() {
  return (

    <div className="container max-w-3xl mx-auto z-50 pt-12 md:pt-0 md:mt-5">
      <h1 className="font-bold text-3xl text-center text-orange-100 md:text-orange-800 mb-4">Pricing</h1>
      <div className="md:border-orange-500 border-white border-2 p-6 rounded-lg mx-4">
        <h2 className="text-2xl font-medium mb-4  text-orange-100 md:text-orange-800">Deposit Fees</h2>
        <p className="mb-4  text-orange-100 md:text-orange-800">
          We charge a 5% fee for all deposits made to your account.
        </p>
        <h2 className="text-2xl font-medium mb-4  text-orange-100 md:text-orange-800">Withdrawal Fees</h2>
        <p className="mb-4  text-orange-100 md:text-orange-800">
          We charge a 5% fee for all withdrawals made from your account.
        </p>
        <p className="mb-4  text-orange-100 md:text-orange-800">
          There are no other fees or hidden costs. Your funds are safe with us.
        </p>
      </div>
    </div>
  )
}