import toast from "react-hot-toast";
const { apiconnector } = require("../apiConnector");
const { car } = require("../api");

export async function RegisterCar(
  formData
) {
  {
    const toastId = toast.loading("loading....");
    try {
      const res = await apiconnector("POST", car.REGISTER_CAR_API, formData);

      console.log("res:::=====>>>>>", res);
      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success("Car added successfully");
      toast.dismiss(toastId);
      return res.data.data;
    } catch (error) {
      console.log("CAR REGISTER API ERROR............", error)
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
  }
}

export async function getUserCarsDetails(
  userId
) {
  {
    const toastId = toast.loading("loading....");
    try {
      const res = await apiconnector("GET", car.GET_USER_CARS_API, null, null, { userId });

      console.log("res:::=====>>>>>", res);
      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.dismiss(toastId);
      return res.data.cars;
    } catch (error) {
      console.log("GET CAR DATA API ERROR............", error)
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
  }
}

export async function editACar(formData) {
  {
    const toastId = toast.loading("loading....");
    try {
      const res = await apiconnector("POST", car.EDIT_CAR_API, formData);

      console.log("res:::=====>>>>>", res);
      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.dismiss(toastId);
      return res.data.data;
    } catch (error) {
      console.log("DELETE CAR API ERROR............", error)
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
  }
}

export async function deleteCar(
  carId
) {
  {
    const toastId = toast.loading("loading....");
    try {
      const res = await apiconnector("DELETE", car.DELETE_CAR_API, null, null, { carId });

      console.log("res:::=====>>>>>", res);
      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.dismiss(toastId);
      return res.data.cars;
    } catch (error) {
      console.log("DELETE CAR API ERROR............", error)
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
  }
}

export async function fetchCarDetails(
  carId
) {
  {
    const toastId = toast.loading("loading....");
    console.log("card id here",carId);
    try {
      const res = await apiconnector("GET", car.FETCH_CAR_DATA, null, null, { carId });

      console.log("res:::=====>>>>>", res);
      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.dismiss(toastId);
      return res.data.car;
    } catch (error) {
      console.log("DELETE CAR API ERROR............", error)
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
  }
}

export async function fetchAllCars(
  carId
) {
  {
    const toastId = toast.loading("loading....");
    console.log("card id here",carId);
    try {
      const res = await apiconnector("GET", car.GET_ALL_CARS_API);

      console.log("res:::=====>>>>>", res);
      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.dismiss(toastId);
      return res.data.cars;
    } catch (error) {
      console.log("DELETE CAR API ERROR............", error)
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
  }
}