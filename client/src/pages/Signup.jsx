import React, { useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../ContextAPI/UserContext";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Signup } from "../services/operations/authOperation";

function SignUp() {

  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [address, setAddress] = useState("");
  const { user } = useContext(UserContext);

  const validateEmail = () => {
    var regex = /^([a-zA-Z0-9._]+)@([a-zA-Z0-9]+)\.([a-z]+)(\.([a-z]+))?$/;
    return regex.test(email);
  };

  async function submitHandler(e) {
    e.preventDefault();
    if (validateEmail()) {
      try {
        await Signup( firstName, lastName, email, password,address );
        setFirstName("");
        setLastName("");
        setAddress("");
        setEmail("");
        setPassword("");
        navigate("/login");
      } catch (error) {
        console.log("error while calling signUp in the login page::", error);
      }
    } else {
      toast.error("Enter a valid Email");
      return;
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/dashboard/my-profile");
      return;
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-200">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 mt-7 mb-7">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Welcome to Car Management!</h2>
        <p className="text-center text-gray-500 mb-8">Create an account to start your journey</p>

        <form onSubmit={submitHandler}>
          {/* First Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>
          </div>

          {/* Address */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="address">
              Address
            </label>
            <textarea
              id="address"
              rows="3"
              value={address}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your address"
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Already have an account? */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
