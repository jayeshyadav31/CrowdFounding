import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import usePreviewImg from '../hooks/usePreviewImg';

function CreateCampaign() {
  const [formData, setFormData] = useState({
    title: '',
    subTitle: '',
    description: '',
    required: '',
    start: '',
  });
  const {imgUrl,handleImageChange}=usePreviewImg()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const ImageChange = (e) => {
    handleImageChange(e)
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("at handle submit");
    
    if (!formData.title || !formData.subTitle || !formData.required) {
      toast.error('Please fill in all the fields and upload an image');
      return;
    }
    try {
      const response = await fetch('/api/campaign/create', {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            title:formData?.title,
            subTitle:formData?.subTitle,
            description:formData?.description,
            required:formData?.required,
            start:formData.start,
            imageUrl:imgUrl
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create campaign');
      }

      const result = await response.json();
      toast.success('Campaign created successfully');
      console.log('Campaign created successfully:', result);
      setFormData({
        title: '',
        subTitle: '',
        description: '',
        required: '',
        start: '',
        imageUrl: null,
      });
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast.error('Error creating campaign');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Create a New Campaign</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border border-gray-500 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="subTitle">Subtitle:</label>
            <input
              type="text"
              id="subTitle"
              name="subTitle"
              value={formData.subTitle}
              onChange={handleChange}
              className="border border-gray-500 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-500 rounded-md p-2 w-full h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="required">Amount Required:</label>
            <input
              type="number"
              id="required"
              name="required"
              value={formData.required}
              onChange={handleChange}
              className="border border-gray-500 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="start">Start Date:</label>
            <input
              type="date"
              id="start"
              name="start"
              value={formData.start}
              onChange={handleChange}
              className="border border-gray-500 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="imageUrl">Campaign Image:</label>
            <input
              type="file"
              id="imageUrl"
              name="imageUrl"
              onChange={ImageChange}
              className="border border-gray-500 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Create Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCampaign;
