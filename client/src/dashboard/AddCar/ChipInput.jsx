import { useContext, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { CarContext } from "../../ContextAPI/CarContext";

export default function ChipInput({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) {
  const { editCar, car } = useContext(CarContext);

  const [chips, setChips] = useState([]);

  useEffect(() => {
    if (editCar) {
      setChips(car?.tags || []);
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValue(name, chips);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chips]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const chipValue = event.target.value.trim();
      if (chipValue && !chips.includes(chipValue)) {
        setChips((prevChips) => [...prevChips, chipValue]);
        event.target.value = "";
      }
    }
  };

  const handleDeleteChip = (chipIndex) => {
    setChips((prevChips) => prevChips.filter((_, index) => index !== chipIndex));
  };

  return (
    <div className="flex flex-col space-y-3">
      {/* Label */}
      <label className="text-sm font-semibold text-indigo-700" htmlFor={name}>
        {label} <sup className="text-red-500">*</sup>
      </label>

      {/* Chips and Input */}
      <div className="flex w-full flex-wrap gap-y-2 rounded-md border border-indigo-300 bg-indigo-50 p-3 shadow-md focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-300">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full bg-indigo-500 px-3 py-1 text-sm text-white shadow-md"
          >
            {chip}
            <button
              type="button"
              className="ml-2 text-white hover:text-indigo-200 focus:outline-none"
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose className="text-lg" />
            </button>
          </div>
        ))}

        {/* Input Field */}
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="flex-grow rounded-md bg-transparent p-2 text-sm text-indigo-800 placeholder-indigo-400 focus:outline-none"
        />
      </div>

      {/* Error Message */}
      {errors[name] && (
        <span className="text-xs text-red-500">{label} is required</span>
      )}
    </div>
  );
}
