import FAQItem from "./faqItem";
import { Faqs } from "./faqs";

export default function Faq() {
  return (
    <div className="container max-w-3xl mx-auto z-50 pt-12 md:pt-0 md:mt-5">
      <h1 className="font-bold text-2xl text-center text-orange-100 md:text-orange-800">FAQ</h1>
      <div className="rounded-md p-4">
        {Faqs.items.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  )
}
