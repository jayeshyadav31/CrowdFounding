import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import DonationCard from './DonationCard';

function Payments() {
  const { authUser } = useAuthContext();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDonations = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/donation/byUser');
        const data = await res.json();
        const sortedDonations = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setDonations(data);
      } catch (error) {
        console.log('Error in fetching donations by user:', error);
      } finally {
        setLoading(false);
      }
    };
    getDonations();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-4 ml-2 font-semibold text-gray-700 border-b border-gray-300 pb-2 mb-4">
        <p>Date</p>
        <p>Transaction ID</p>
        <p>Status</p>
        <p>Amount</p>
      </div>
      {donations?.map((donation) => (
        <DonationCard key={donation?._id} donation={donation} />
      ))}
    </div>
  );
}

export default Payments;
