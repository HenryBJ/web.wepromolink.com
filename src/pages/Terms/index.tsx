import TermsAndConditions from "./terms";

export default function Terms() {
  return (
    <div className="container max-w-3xl mx-auto z-50 pt-12 md:pt-0 md:mt-5">
      <h1 className="font-bold text-2xl text-center">Terms & Conditions</h1>
      <div className="p-6 overflow-y-scroll h-[calc(100vh-120px)]">
        {TermsAndConditions().termsAndConditions.map((term, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-lg font-medium">{term.topic}</h2>
            <p className="text-sm">{term.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}