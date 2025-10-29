import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, formData);
      localStorage.setItem('token', response.data.token);
      if (response.status === 200) {
        alert("Login Successful!");
        navigate("/todos"); // Redirect after login
      }
    } catch (error) {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white overflow-hidden">
      {/* Animated Glow Background */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-[400px] h-[400px] bg-purple-700/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Card */}
      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-10 text-center w-[90%] sm:w-[400px] border border-purple-700/50 backdrop-blur-md">
        <h1 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          {/* Username */}
          <div className="text-left">
            <label className="block text-sm text-gray-400 mb-1">Username</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 border border-purple-700/50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-200 placeholder-gray-500"
              placeholder="Enter your username"
            />
          </div>

          {/* Password */}
          <div className="text-left">
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 border border-purple-700/50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-gray-200 placeholder-gray-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-fuchsia-600 hover:to-purple-600 text-white py-2 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-purple-400/40"
          >
            Login
          </button>
        </form>

        {/* Footer Links */}
        <p className="text-gray-400 text-sm mt-6">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-purple-400 hover:text-fuchsia-400 underline transition"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
