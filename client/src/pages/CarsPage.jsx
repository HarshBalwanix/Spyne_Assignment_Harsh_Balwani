import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarCard } from './CarCard';
import { FaArrowLeft } from 'react-icons/fa';
import { UserContext } from '../ContextAPI/UserContext';
import { fetchAllCars } from '../services/operations/carOperations';

export const CarsPage = () => {
  const navigate = useNavigate();
  const [carsData, setCarsData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('title'); // Default search by title
  const [filteredCars, setFilteredCars] = useState(null);

  const fetchCarsData = async () => {
    try {
      const result = await fetchAllCars();
      setCarsData(result);
      setFilteredCars(result); // Initialize filteredCars with all cars
    } catch (error) {
      console.log("Error while calling fetchCarsData -->", error);
    }
  };

  useEffect(() => {
    fetchCarsData();
  }, []);

  const { user } = useContext(UserContext);

  if (!user) {
    navigate('/login');
    return;
  }

  const handleSearch = (query, category) => {
    setSearchQuery(query);

    if (!query) {
      setFilteredCars(carsData); // Reset to all cars if the search query is empty
      return;
    }

    const filtered = carsData.filter((car) => {
      if (category === 'title') return car.title.toLowerCase().includes(query.toLowerCase());
      if (category === 'description') return car.description.toLowerCase().includes(query.toLowerCase());
      if (category === 'tags' && car.tags) {
        return car.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));
      }
      return false;
    });

    setFilteredCars(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100 py-10 px-5">
      {/* Back Button */}
      <button
        onClick={() => navigate(user ? '/dashboard/my-profile' : '/')}
        className="flex items-center text-indigo-600 font-semibold mb-6 hover:text-indigo-800 transition-colors"
      >
        <FaArrowLeft className="mr-2" /> {user ? 'Back to Profile' : 'Back to Home'}
      </button>

      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-indigo-700 mb-8">
        Welcome to Car Management
      </h1>
      <p className="text-center text-lg md:text-xl text-indigo-600 mb-10">
        Discover the latest cars of new technologies.
      </p>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value, searchCategory)}
            placeholder={`Search by ${searchCategory}`}
            className="flex-1 p-3 border border-indigo-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
          />
          <select
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            className="p-3 border border-indigo-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
          >
            <option value="title">Title</option>
            <option value="description">Description</option>
            <option value="tags">Tags</option>
          </select>
        </div>
      </div>

      {/* Car Cards */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {filteredCars && filteredCars.length > 0 ? (
          filteredCars.map((car) => <CarCard key={car._id} car={car} />)
        ) : (
          <p className="text-center text-indigo-600 col-span-full">
            No cars match your search criteria.
          </p>
        )}
      </div>
    </div>
  );
};
