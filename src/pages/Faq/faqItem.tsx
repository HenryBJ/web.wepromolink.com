import React from 'react';

function FAQItem({ question, answer }:any) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="rounded-md p-2">
      <button 
        className="text-left w-full font-medium text-orange-100 md:text-orange-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-medium">{question}</h3>
        <svg className={`${isOpen ? 'rotate-180' : ''} h-4 w-4`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={` rounded-md p-2 ${isOpen ? 'block' : 'hidden'}`}>
        <p className="text-orange-100 md:text-orange-800">{answer}</p>
      </div>
    </div>
  );
}

export default FAQItem;
