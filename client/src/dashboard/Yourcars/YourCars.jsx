import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CarCard from "./CarCard";
import { getUserCarsDetails } from "../../services/operations/carOperations";
import { UserContext } from "../../ContextAPI/UserContext";
import toast from "react-hot-toast";

export const YourCars = () => {
  const navigate = useNavigate();
  const [carData,setCarData] = useState([]);
  const { user } = useContext(UserContext);


  const handleViewDetails = (id) => {
    navigate(`/car-details/${id}`);
  };

  const getCarDetails = async()=>{
    const result = await getUserCarsDetails(user._id);
    if(result){
      setCarData(result);
    }
    else{
      toast.error("error in fetching car data");
    }
}
  useEffect(()=>{
    getCarDetails();
  },[]);

  return (
    <div className="your-cars-container bg-indigo-100 p-5 min-h-screen">
      <h2 className="text-2xl font-bold text-indigo-900 mb-5">Your Cars</h2>
      <div className="flex flex-col gap-5">
        {carData.map((car) => (
          <CarCard
            key={car._id}
            car={car}
            getCarDetails={getCarDetails}
            onViewDetails={() => handleViewDetails(car._id)}
          />
        ))}
      </div>
    </div>
  );
};
