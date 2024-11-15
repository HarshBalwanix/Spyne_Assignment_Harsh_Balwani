import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCarDetails } from '../services/operations/carOperations';

export const CarDetails = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [carData, setCarData] = useState(null);

  const fetchCarDetail = async () => {
    try {
      const result = await fetchCarDetails(carId);
      setCarData(result);
    } catch (error) {
      console.log("Error in fetching car details:", error);
    }
  };

  useEffect(() => {
    fetchCarDetail();
  }, []);

  if (!carData) {
    return <p className="text-center text-indigo-600 mt-10">Loading car details...</p>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-indigo-50 to-indigo-100">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Back Button */}
        <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="bg-indigo-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-all duration-200"
          >
            ← Back
          </button>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <h1 className="text-3xl font-bold">{carData.title}</h1>
          <p className="text-indigo-200 mt-2">{carData.description}</p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-8">
          {/* Images Section */}
          <div>
            <h2 className="text-xl font-semibold text-indigo-600">Images</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {carData.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${carData.title}-${index}`}
                  className="rounded-lg w-full h-48 object-cover border border-indigo-200 shadow-sm"
                />
              ))}
            </div>
          </div>

          {/* Car Details */}
          <div>
            <h2 className="text-xl font-semibold text-indigo-600">Car Details</h2>
            <div className="mt-4 space-y-2">
              <p>
                <span className="font-medium text-gray-700">Type:</span>{' '}
                <span className="text-indigo-600">{carData.type}</span>
              </p>
              <p>
                <span className="font-medium text-gray-700">Company:</span>{' '}
                <span className="text-indigo-600">{carData.company}</span>
              </p>
              <p>
                <span className="font-medium text-gray-700">Dealer:</span>{' '}
                <span className="text-indigo-600">{carData.dealer}</span>
              </p>
              <p>
                <span className="font-medium text-gray-700">Posted by:</span>{' '}
                <span className="text-indigo-600">
                  {carData.user.firstName} {carData.user.lastName}
                </span>
              </p>
            </div>
          </div>

          {/* Tags Section */}
          {carData.tags && carData.tags.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-indigo-600">Tags</h2>
              <div className="flex flex-wrap gap-2 mt-4">
                {carData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm border border-indigo-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Extra Info Section */}
          <div>
            <h2 className="text-xl font-semibold text-indigo-600">Extra Info</h2>
            <p className="mt-2 text-gray-600 italic">
              This car is recommended as top priority.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
