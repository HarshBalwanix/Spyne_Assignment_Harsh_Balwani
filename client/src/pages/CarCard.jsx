import React, { useContext, useEffect, useState } from 'react';
import { FaLongArrowAltRight, FaHeart } from "react-icons/fa";
import { UserContext } from '../ContextAPI/UserContext';
import { useNavigate } from 'react-router-dom';

export const CarCard = ({ car }) => {

    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img
                src={car?.images[0]}
                alt={car.title}
                className=" h-48 object-cover"
            />

            <div className="p-5">
                <h2 className="text-xl font-semibold text-indigo-800 mb-3">
                    {car.title}
                </h2>
                <p className="text-gray-600 mb-5">{car.description}</p>
                {/* Tags Section */}
                {car.tags && car.tags.length > 0 && (
                    <div>
                        <div className="flex items-center justify-center flex-wrap gap-2 mt-2 mb-3">
                            {car.tags.map((tag, index) => (
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
                <div className="flex items-center mb-4">
                    <button className="text-indigo-500 ml-5 font-medium hover:text-indigo-700 transition-colors"
                        onClick={() => {
                            navigate(`/car-details/${car._id}`)
                        }}
                    >
                        Car Details <FaLongArrowAltRight className='inline ml-2' />
                    </button>
                </div>
            </div>
        </div>
    );
}
