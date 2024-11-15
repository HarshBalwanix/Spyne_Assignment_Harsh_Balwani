import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../ContextAPI/UserContext';
import { FaArrowRight } from "react-icons/fa6";

export const DashboardNavbar = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-indigo-900 shadow-lg text-[#F1F2FF] border-b border-[#4c6899] ">
      <div className="text-3xl font-semibold tracking-wide">
        Welcome, <span className="text-indigo-200 font-bold">{user?.firstName}{" "}{user?.lastName}</span>{" "}!
      </div>
      <div className="flex items-center space-x-6">
        <button
          onClick={() => navigate('/cars')}
          className="flex justify-center items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out shadow-md hover:shadow-lg"
        >
          Cars <FaArrowRight />
        </button>
      </div>
    </div>
  );
};
