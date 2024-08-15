import Donation from "../Models/donationModel.js";
import Campaign from "../Models/campaignModel.js";

const createDonation = async (req, res) => {
    const { amount, transactionComplete, transactionID, campaignId } = req.body;
    console.log(req.body);
    
    try {
        const userId=req.user._id
        const campaignExists = await Campaign.findById(campaignId);
        if (!campaignExists) {
            return res.status(404).json({ message: 'Campaign not found' });
        }

        const donation = new Donation({
            amount,
            transactionComplete,
            userId,
            transactionID,
            campaignId
        });

        const savedDonation = await donation.save();

        campaignExists.raised += amount;
        campaignExists.donorsNum += 1;
        campaignExists.donors.push({
            transactionID: transactionID,
            userId:userId,
            donationAmount: amount
        });

        await campaignExists.save();

        res.status(201).json(savedDonation);
    } catch (error) {
        console.error('Error creating donation:', error);
        res.status(400).json({ message: error.message });
    }
};

const getDonationDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const donation = await Donation.findById(id).populate('userId').populate('campaignId');

        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        res.status(200).json(donation);
    } catch (error) {
        console.error('Error fetching donation details:', error);
        res.status(400).json({ message: error.message });
    }
};

export { createDonation, getDonationDetails };
