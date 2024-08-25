import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import usePreviewImg from '../hooks/usePreviewImg';

function UpdateCampaignPage() {
  const { id } = useParams(); // Get campaign ID from URL parameters
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    subTitle: '',
    description: '',
    required: '',
    start: '',
  });
  const { imgUrl, handleImageChange } = usePreviewImg();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(`/api/campaign/get/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch campaign details');
        }
        const data = await response.json();
        setFormData({
          title: data.title,
          subTitle: data.subTitle,
          description: data.description,
          required: data.required,
          start: data.start,
        });
      } catch (error) {
        console.error('Error fetching campaign:', error);
      }
    };

    fetchCampaign();
  }, [id]);

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
    e.preventDefault();
    if (!formData.title || !formData.subTitle || !formData.required) {
      toast.error('Please fill in all the fields and upload an image');
      return;
    }
    try {
      const response = await fetch(`/api/campaign/update/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData?.title,
          subTitle: formData?.subTitle,
          description: formData?.description,
          required: formData?.required,
          start: formData?.start,
          imageUrl: imgUrl || formData.imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update campaign');
      }

      const result = await response.json();
      toast.success('Campaign updated successfully');
      console.log('Campaign updated successfully:', result);
      navigate(`/campaign/${id}`);
    } catch (error) {
      console.error('Error updating campaign:', error);
      toast.error('Error updating campaign');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Campaign</h2>
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
              Update Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateCampaignPage;
