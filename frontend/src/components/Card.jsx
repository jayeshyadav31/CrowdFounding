import React from 'react';
import { useNavigate } from 'react-router-dom';

function Card({ campaign }) {
    const navigate = useNavigate();
    const percentageRaised = (campaign?.raised / campaign?.required) * 100;

    return (
        <div
            className="w-[45%] h-auto rounded-lg overflow-hidden shadow-lg mt-3 ml-8 cursor-pointer border-2 border-gray-300 hover:shadow-xl transition-shadow duration-300 flex"
            onClick={() => navigate(`/campaign/${campaign._id}`)}
        >
            <div className="w-1/3 bg-gray-200 overflow-hidden">
                <img
                    src={campaign?.imageUrl}
                    alt={campaign?.title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="w-2/3 p-4 flex flex-col justify-between">
                <div>
                    <h2 className="font-bold text-lg mb-1">{campaign?.title}</h2>
                    <h3 className="text-gray-500 text-sm mb-3">{campaign?.subTitle}</h3>
                    <p className="text-gray-600 text-sm mb-4">{campaign?.description}</p>
                </div>
                <div className="relative h-2 w-full bg-gray-300 rounded-full mb-4">
                    <div
                        className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
                        style={{ width: `${percentageRaised}%` }}
                    />
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-semibold">
                        ₹{campaign?.raised} raised
                    </span>
                    <span className="text-gray-600 font-semibold">
                        ₹{campaign?.required - campaign?.raised} required
                    </span>
                </div>
                <div className="items-end ml-2" >
                    <button className='p-2 text-black justify-center items-center rounded-md hover:text-slate-500'
                    onClick={()=>navigate(`/campaign/${campaign._id}`)}>Donate Now ➔</button>
                </div>
            </div>
        </div>
    );
}

export default Card;
