import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import { useAmountContext } from '../context/AmountContext';

const stripePromise = loadStripe(import.meta.env.VITE_TEST_KEY);

const PaymentPage = () => {
  const {id}=useParams()
  const {amount}=useAmountContext() 
  const [isProceeding, setIsProceeding] = useState(false);
  const [error, setError] = useState(null);
  const [dates, setDates] = useState({
    start: new Date(),
    end: new Date(),
  });
  console.log('amount',amount);
  
  const [campaign,setCampaign]=useState()
  useEffect(() => {
    const getCampaignDetails = async () => {
        try {
            const res = await fetch(`/api/campaign/get/${id}`);
            const data = await res.json();
            setCampaign(data);
        } catch (error) {
            console.log('error in fetching campaign details');
        }
    };
    getCampaignDetails();
}, [id]);
  const proceed = async (e) => {
    e.preventDefault();
    try {
      setIsProceeding(true);
      setError(null);

      const res1 = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title:  campaign?.title,
          amount: amount,
          Id: id,
          dates: dates,
        }),
      });

      const session = await res1.json();

      if (!session.sessionId) {
        throw new Error("Failed to create session");
      }

      const stripe = await stripePromise;

      const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });

      if (result.error) {
        console.error(result.error);
        setError("An error occurred during redirection.");
      }
    } catch (error) {
      console.error("Error during reservation:", error);
      setError("An unexpected error occurred.");
    } finally {
      setIsProceeding(false);
    }
  };

  return (
    <div className="font-bold ml-[400px] justify-center w-[400px] mb-24">
      <div className="font-bold justify-normal">
        <div className="mt-2 flex justify-between">
          <h2>Campaign Name:</h2>
          <h2>{campaign?.title}</h2>
        </div>
      </div>
      <div className="h-1 bg-slate-500"></div>
      <div className="mt-2 flex justify-between">
        <h2>amount:</h2>
        <h2>{amount}</h2>
      </div>
      <div className="mt-1 items-end">
        <button
          className="ml-[320px] p-2 justify-end bg-red-500 h-10 rounded-lg"
          onClick={proceed}
          disabled={isProceeding}
        >
          {isProceeding ? "Processing..." : "Proceed"}
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default PaymentPage;