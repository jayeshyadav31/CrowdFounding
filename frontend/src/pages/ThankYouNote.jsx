import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';

const ThankYouNote = ({ donorName, amount, campaignName }) => {
  const noteRef = useRef();

  const handleDownloadPDF = () => {
    const element = noteRef.current;
    const opt = {
      margin: 1,
      filename: `${donorName}_ThankYouNote.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().from(element).set(opt).save();
  };

  return (
    <>
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto" ref={noteRef}>
      <h2 className="text-2xl font-semibold text-center mb-4">Thank You!</h2>
      <p className="text-lg text-gray-700 text-center">
        Dear <span className="font-bold">{donorName}</span>,
      </p>
      <p className="text-lg text-gray-700 text-center mt-2">
        We sincerely appreciate your generous donation of 
        <span className="font-bold"> ${amount}</span> to the 
        <span className="font-bold"> {campaignName}</span> campaign.
      </p>
      <p className="text-lg text-gray-700 text-center mt-4">
        Your support is helping us make a real difference. Thank you for being part of this journey!
      </p>
    </div>
    <div className="text-center mt-6">
        <button 
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          onClick={handleDownloadPDF}
        >
          Download PDF
        </button>
      </div>
    </>
  );
};

export default ThankYouNote;
