import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useAmountContext } from '../context/AmountContext';

const CampaignDetailPage = () => {
    const { id } = useParams();
    const [campaign, setCampaign] = useState();
    const [amt,setAmt]=useState()
    const {setAmount}=useAmountContext()
    const navigate=useNavigate()
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

    const percentageRaised = (campaign?.raised / campaign?.required) * 100;
    const maxDonationAmount = campaign ? (campaign.required - campaign.raised) : 0;
    const handleProceed=()=>{
        if(amt>maxDonationAmount){
            toast.error(`You can pay maximum ${maxDonationAmount}`)
            return 
        }
        setAmount(amt);
        navigate(`/campaign/payment/${id}`)
    }
    return (
        <div className="container mx-auto p-6 max-w-7xl mb-10">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 flex justify-center md:justify-start">
                    <img
                        src={campaign?.imageUrl}
                        alt="Campaign"
                        className="w-[500px] h-[300px] rounded-lg border-4 border-cyan-300 shadow-lg"
                    />
                </div>

                <div className="md:w-1/2 mt-6 md:mt-0 md:pl-8 flex flex-col justify-center">
                    <h1 className="text-3xl font-bold leading-tight">
                        {campaign?.title}
                    </h1>
                    <p className="text-gray-500 mt-2">
                        {campaign?.subTitle}
                    </p>

                    <div className="flex justify-between items-center mt-4">
                        <div>
                            <p className="text-gray-700">Raised:</p>
                            <p className="text-xl font-bold">₹{campaign?.raised}</p>
                        </div>
                        <div>
                            <p className="text-gray-700">Goal:</p>
                            <p className="text-xl font-bold">₹{campaign?.required}</p>
                        </div>
                    </div>

                    <div className="w-full bg-gray-300 rounded-full h-2 mt-4">
                        <div className="bg-cyan-500 h-2 rounded-full" style={{ width: `${percentageRaised}%` }}></div>
                    </div>

                    <div className="flex items-center mt-6 space-x-4">
                        <input
                            type="number"
                            placeholder="Enter Amount"
                            max={maxDonationAmount} 
                            onChange={(e)=>{setAmt(e.target.value)}}
                            className="flex-grow p-2 border border-gray-400 w-16 rounded-lg outline-none"
                        />
                        <button className="bg-cyan-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-cyan-600 transition"
                        onClick={handleProceed}>
                            Proceed Now ➔
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-8 md:mt-12">
                <p className="text-gray-700 leading-relaxed">
                    {campaign?.description}
                </p>
            </div>
        </div>
    );
};

export default CampaignDetailPage;
