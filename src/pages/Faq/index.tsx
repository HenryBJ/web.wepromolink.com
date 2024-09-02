'use client'

import { useEffect, useRef } from "react";
import FAQItem from "./faqItem";
import { Faqs } from "./faqs";

export default function Faq() {
  const myRef = useRef(null);


  useEffect(() => {
    if (myRef.current) {
        const table: any = myRef.current;
        const delta = table.offsetTop + 60;
        table.style.maxHeight = `calc(100vh - ${delta}px)`;
    }
}, []);


  return (
    <div className="container max-w-3xl mx-auto z-50 pt-12 md:pt-0 md:mt-5">
      <h1  className="font-bold text-2xl text-center text-orange-100 md:text-orange-800">FAQ</h1>
      <div ref={myRef} className="rounded-md p-0 overflow-y-auto">
        {Faqs.items.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  )
}
