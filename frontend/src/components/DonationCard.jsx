import React from 'react';
import { useNavigate } from 'react-router-dom';

function DonationCard({ donation }) {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col sm:flex-row items-center cursor-pointer border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 bg-white"
      onClick={() => navigate(`/paymentDetails/${donation?.payment_id}`)}
    >
      <div className="flex-1 sm:text-left text-center mb-2 sm:mb-0">
        <p className="text-gray-500">{donation?.createdAt.substring(0, 10)}</p>
      </div>

      <div className="flex-1 sm:text-left text-center mb-2 sm:mb-0">
        <p className="text-gray-800 font-medium truncate">{donation?.transactionID.substring(0, 20)}</p>
      </div>

      <div className="flex-1 sm:text-left text-center mb-2 sm:mb-0">
        <p
          className={`text-sm font-bold ${
            donation?.transactionComplete === true? 'text-green-600' : 'text-red-600'
          }`}
        >
          {donation?.transactionComplete === true ? 'Completed' : 'Failed'}
        </p>
      </div>

      <div className="flex-1 sm:text-left text-center">
        <p className="text-lg font-semibold text-gray-800">₹{donation?.amount}</p>
      </div>
    </div>
  );
}

export default DonationCard;
