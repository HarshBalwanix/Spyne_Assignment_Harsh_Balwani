import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../ContextAPI/UserContext";
import { login } from "../services/operations/authOperation";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, loginUser } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = () => {
    var regex = /^([a-zA-z0-9\._]+)@([a-zA-z0-9]+)\.([a-z]+)(\.([a-z]+))?$/
    if (regex.test(email)) {
      return true;
    }
    else {
      return false;
    }
  }


  async function submitHandler(e) {
    e.preventDefault();
    if (validateEmail) {
      const result = await login(email,password);
      loginUser(result);
      navigate("/dashboard/my-profile");
      setEmail("");
      setPassword("");
      return;
    }
    else {
      toast.error("Enter a valid Email");
      return;
    }
  }

  if (user) {
    navigate("/dashboard/my-profile");
    return;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-200">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Login to Car Management</h2>
        <p className="text-center text-gray-500 mb-8">Welcome back! Please log in to continue</p>

        <form onSubmit={submitHandler}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Log In
          </button>
        </form>

        {/* Signup Redirect */}
        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline font-medium">
            <button>
              Sign up
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
