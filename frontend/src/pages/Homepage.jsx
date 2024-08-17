import React, { useState, useEffect, useRef } from 'react';
import Card from '../components/Card';

function Homepage() {
  const [campaigns, setCampaigns] = useState([]);
  const sectionRef=useRef(null)
  useEffect(() => {
    const getCampaigns = async () => {
      try {
        const res = await fetch('/api/campaign/getAll');
        const data = await res.json();
        setCampaigns(data);
        console.log(data);
      } catch (error) {
        console.log('error while fetching all campaigns', error.message);
      }
    };
    getCampaigns();
  }, []);
  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div>
      <div
        className="bg-cover bg-center h-[500px] m-5 flex items-center justify-center rounded-sm"
        style={{ backgroundImage: "url('https://res.cloudinary.com/dyylkrsak/image/upload/v1723717820/cover-Crowdfunding_k85ael.png')" }}
      >
        <button className="bg-gray-800 rounded-lg mt-[420px] text-white font-bold py-2 px-4 font-serif w-[200px]" onClick={scrollToSection} >Donate</button>
      </div>
      <div>
        <h1 className='font-serif font-bold ml-6' ref={sectionRef}>OnGoing Campaigns</h1>
        <div className="flex flex-wrap justify-between mr-6 mb-12">
          {campaigns?.map((campaign) => (
            <Card key={campaign._id} campaign={campaign} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
