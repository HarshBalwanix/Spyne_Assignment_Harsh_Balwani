import React, { useContext } from "react";
import { deleteCar } from "../../services/operations/carOperations";
import toast from "react-hot-toast";
import { CarContext } from "../../ContextAPI/CarContext";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car, onViewDetails, getCarDetails }) => {
  const { setEditCarByUSer } = useContext(CarContext);
  const navigate = useNavigate();

  async function deleteHandler(carId) {
    try {
      await deleteCar(carId);
      await getCarDetails();
      toast.success("Car deleted successfully");
    } catch (error) {
      console.log("Error while deleting the car", error);
    }
  }

  function editHandler() {
    setEditCarByUSer(car, true);
    navigate("/dashboard/edit-car");
  }

  return (
    <div className="car-card bg-gradient-to-br from-indigo-700 to-indigo-500 text-white rounded-lg shadow-xl p-6 flex flex-col space-y-6">
      {/* Title Section */}
      <div className="flex flex-col space-y-2">
        <h3 className="text-3xl font-extrabold tracking-wide">{car.title}</h3>
        <p className="text-lg text-indigo-200">{car.description}</p>
      </div>

      {/* Images Section */}
      <div className="grid grid-cols-2 gap-4">
        {car.images.slice(0, 2).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${car.title}-${index}`}
            className="rounded-md border-2 border-indigo-400 w-full h-40 object-cover transform hover:scale-105 transition-transform duration-300"
          />
        ))}
      </div>

      {/* Details Section */}
      <div className="text-lg space-y-2">
        <p>
          <span className="font-semibold text-indigo-100">Type:</span>{" "}
          <span className="text-indigo-300">{car.type}</span>
        </p>
        <p>
          <span className="font-semibold text-indigo-100">Company:</span>{" "}
          <span className="text-indigo-300">{car.company}</span>
        </p>
        <p>
          <span className="font-semibold text-indigo-100">Dealer:</span>{" "}
          <span className="text-indigo-300">{car.dealer}</span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-auto">
        <button
          onClick={onViewDetails}
          className="bg-white text-indigo-700 px-5 py-2 rounded-md font-semibold hover:bg-indigo-100 transition-all duration-200 shadow-md"
        >
          View Details
        </button>
        <div className="flex space-x-3">
          <button
            onClick={editHandler}
            className="bg-yellow-500 px-5 py-2 rounded-md font-semibold hover:bg-yellow-600 transition-all duration-200 shadow-md"
          >
            Edit
          </button>
          <button
            onClick={() => deleteHandler(car._id)}
            className="bg-red-500 px-5 py-2 rounded-md font-semibold hover:bg-red-600 transition-all duration-200 shadow-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
