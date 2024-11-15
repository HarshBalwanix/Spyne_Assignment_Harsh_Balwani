import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { MdNavigateNext } from "react-icons/md"
import ChipInput from "./ChipInput"
import { CarContext } from "../../ContextAPI/CarContext";
import MultiImageUpload from "./MultiImageUpload"
import { editACar, RegisterCar } from "../../services/operations/carOperations"
import { UserContext } from "../../ContextAPI/UserContext"
import { useLocation, useNavigate } from "react-router-dom"

export const AddCar = () => {
  const { car, editCar, setEditCar } = useContext(CarContext);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (location.pathname === "/dashboard/add-car") {
      reset({
        carTitle: "",
        carDescription: "",
        carTags: [],
        carType: "",
        carCompany: "",
        carDealer: "",
        carImages: [],
      });
      setEditCar(false);
    } else if (editCar) {
      setValue("carTitle", car.title);
      setValue("carDescription", car.description);
      setValue("carTags", car.tags);
      setValue("carType", car.type);
      setValue("carCompany", car.company);
      setValue("carDealer", car.dealer);
      setValue("carImages", car.images);
    }
  }, [location.pathname]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      currentValues.carTitle !== car.title ||
      currentValues.carDescription !== car.description ||
      currentValues.carTags.toString() !== car.tags.toString() ||
      currentValues.carType !== car.type ||
      currentValues.carCompany !== car.company ||
      currentValues.carDealer !== car.dealer ||
      currentValues.carImages.toString() !== car.images.toString()
    );
  };

  const onSubmit = async (data) => {

    if (editCar) {
      console.log("printing the data after editing::", data);
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        // console.log(data)
        formData.append("carId", car._id)
        if (currentValues.carTitle !== car.title) {
          formData.append("title", data.carTitle)
        }
        if (currentValues.carDescription !== car.description) {
          formData.append("description", data.carDescription)
        }
        if (currentValues.carTags.toString() !== car.tags.toString()) {
          if (data.carTags && data.carTags.length > 0) {
            data.carTags.forEach((tag, index) => {
              formData.append("tags", tag);
            });
          }
        }
        if (currentValues.carType !== car.type) {
          formData.append("type", data.carType)
        }
        if (currentValues.carCompany !== car.company) {
          formData.append("company", data.carCompany)
        }
        if (currentValues.carDealer !== car.dealer) {
          formData.append("dealer", data.carDealer)
        }
        if (currentValues.carImages.toString() !== car.images.toString()) {
          if (data.carImages && data.carImages.length > 0) {
            data.carImages.forEach((file, index) => {
              formData.append("images", file);
            });
          }
        }

        const result = await editACar(formData);
        if (result) {
          toast.success("car updated successfully");
          navigate("/dashboard/your-cars")
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

    const formData = new FormData()
    formData.append("title", data.carTitle)
    formData.append("description", data.carDescription)
    formData.append("user", user._id);
    if (data.carTags && data.carTags.length > 0) {
      data.carTags.forEach((tag, index) => {
        formData.append("tags", tag);
      });
    }
    formData.append("type", data.carType)
    formData.append("company", data.carCompany)
    formData.append("dealer", data.carDealer)
    if (data.carImages && data.carImages.length > 0) {
      data.carImages.forEach((file, index) => {
        formData.append("images", file);
      });
    }
    setLoading(true);

    const result = await RegisterCar(formData);
    if (result) {
      setLoading(false);
      reset();
      navigate("/dashboard/your-cars");
      return;
    }
    setLoading(false)
  }

  return (
    <>
      <h1 className="text-center text-indigo-800 text-3xl font-extrabold tracking-wide mb-8">
        {editCar ? "Edit your" : "Register a New"} <span className="text-indigo-600 underline decoration-from-font">Car</span>
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 rounded-lg border border-indigo-300 bg-indigo-50 p-6 shadow-lg"
      >
        {/* Car Title */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-indigo-700" htmlFor="carTitle">
            Car Title <sup className="text-red-600">*</sup>
          </label>
          <input
            id="carTitle"
            placeholder="Enter Car Title"
            {...register("carTitle", { required: true })}
            className="form-input rounded-md border border-indigo-400 bg-white px-4 py-2 text-indigo-800 placeholder-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300"
          />
          {errors.carTitle && (
            <span className="text-xs text-red-600">Car title is required</span>
          )}
        </div>

        {/* Car Description */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-indigo-700" htmlFor="carDescription">
            Car Description <sup className="text-red-600">*</sup>
          </label>
          <textarea
            id="carDescription"
            placeholder="Enter Car Description"
            {...register("carDescription", { required: true })}
            className="form-textarea rounded-md border border-indigo-400 bg-white px-4 py-2 text-indigo-800 placeholder-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300 resize-none"
            rows={4}
          />
          {errors.carDescription && (
            <span className="text-xs text-red-600">Car description is required</span>
          )}
        </div>

        {/* Chip Input */}
        <ChipInput
          label="Tags"
          name="carTags"
          placeholder="Enter Tags and press Enter"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        {/* Car Type */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-indigo-700" htmlFor="carType">
            Car Type <sup className="text-red-600">*</sup>
          </label>
          <input
            id="carType"
            placeholder="Enter Car Type"
            {...register("carType", { required: true })}
            className="form-input rounded-md border border-indigo-400 bg-white px-4 py-2 text-indigo-800 placeholder-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300"
          />
          {errors.carType && (
            <span className="text-xs text-red-600">Car type is required</span>
          )}
        </div>

        {/* Car Company */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-indigo-700" htmlFor="carCompany">
            Car Company <sup className="text-red-600">*</sup>
          </label>
          <input
            id="carCompany"
            placeholder="Enter Car Company"
            {...register("carCompany", { required: true })}
            className="form-input rounded-md border border-indigo-400 bg-white px-4 py-2 text-indigo-800 placeholder-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300"
          />
          {errors.carCompany && (
            <span className="text-xs text-red-600">Car company is required</span>
          )}
        </div>

        <MultiImageUpload
          name="carImages"
          label="Car Image"
          register={register}
          setValue={setValue}
          errors={errors}
          editData={editCar ? car?.images : null}
        />

        {/* Car Dealer */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-indigo-700" htmlFor="carDealer">
            Car Dealer <sup className="text-red-600">*</sup>
          </label>
          <input
            id="carDealer"
            placeholder="Enter Car Dealer"
            {...register("carDealer", { required: true })}
            className="form-input rounded-md border border-indigo-400 bg-white px-4 py-2 text-indigo-800 placeholder-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300"
          />
          {errors.carDealer && (
            <span className="text-xs text-red-600">Car dealer is required</span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse gap-4 md:flex-row md:justify-end">
          {editCar && (
            <button
              onClick={() => {
                navigate("/dashboard/your-cars");
              }}
              type="button"
              disabled={loading}
              className="w-full rounded-md bg-gray-200 py-2 px-6 text-center text-indigo-600 transition duration-300 hover:bg-gray-300 md:w-auto"
            >
              Continue Without Saving
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="flex flex-row justify-center items-center w-full rounded-md bg-indigo-600 py-2 px-6 text-center text-white transition duration-300 hover:bg-indigo-700 md:w-auto"
          >
            {editCar ? <span>Save Changes</span> : <span>Add Car</span>} <MdNavigateNext size={23} />
          </button>
        </div>
      </form>
    </>
  );
};
