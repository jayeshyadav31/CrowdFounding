import Campaign from '../Models/campaignModel.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import { v2 as cloudinary } from 'cloudinary';

const createCampaign = async (req, res) => {
    const { title, subTitle, description, required, imageUrl, start} = req.body;
    console.log("i am at create campaign");
    
    try {
        let uploadedImageUrl = imageUrl;

        if (imageUrl) {
            const uploadedImage = await uploadToCloudinary(imageUrl);
            uploadedImageUrl = uploadedImage.secure_url;
        }

        const campaign = new Campaign({
            title,
            subTitle,
            description,
            required,
            imageUrl: uploadedImageUrl,
            start,
            isHidden:false,
            isActivated:true,
            raised:0,
            donorsNum:0,
        });

        const savedCampaign = await campaign.save();
        res.status(201).json(savedCampaign);
    } catch (error) {
        console.error('Error creating campaign:', error);
        res.status(400).json({ message: error.message });
    }
};

const updateCampaign = async (req, res) => {
    const { id } = req.params;
    const { title, subTitle, description, required, imageUrl, start } = req.body;

    try {
        const campaign = await Campaign.findById(id);
        if (!campaign) {
            console.log('No such campaign exists!');
            return res.status(404).json({ message: "No such campaign exists!" });
        }

        let uploadedImageUrl = imageUrl;

        if (imageUrl) {
            if (campaign.imageUrl) {
                const publicId = campaign.imageUrl.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            }

            const uploadedImage = await uploadToCloudinary(imageUrl);
            uploadedImageUrl = uploadedImage.secure_url;
        }

        if (title) campaign.title = title;
        if (subTitle) campaign.subTitle = subTitle;
        if (description) campaign.description = description;
        if (required) campaign.required = required;
        if (uploadedImageUrl) campaign.imageUrl = uploadedImageUrl;
        if (start) campaign.start = start;
        const updatedCampaign = await campaign.save();
        res.status(200).json(updatedCampaign);
    } catch (error) {
        console.error('Error updating campaign:', error);
        res.status(400).json({ message: error.message });
    }
};

const getCampaign = async (req, res) => {
    const { id } = req.params;

    try {
        const campaign = await Campaign.findById(id);

        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }

        res.status(200).json(campaign);
    } catch (error) {
        console.error('Error fetching campaign:', error);
        res.status(400).json({ message: error.message });
    }
};


const deleteCampaign = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCampaign = await Campaign.findByIdAndDelete(id);

        if (!deletedCampaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }

        if (deletedCampaign.imageUrl) {
            const publicId = deletedCampaign.imageUrl.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }

        res.status(200).json({ message: 'Campaign deleted successfully' });
    } catch (error) {
        console.error('Error deleting campaign:', error);
        res.status(400).json({ message: error.message });
    }
};

export { createCampaign, updateCampaign, getCampaign, deleteCampaign };
