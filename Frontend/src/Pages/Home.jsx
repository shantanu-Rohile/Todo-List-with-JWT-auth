import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      {/* Card Container */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-10 text-center w-[90%] sm:w-[400px] border border-purple-700/50 backdrop-blur-md">
        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">
          Todo
        </h1>

        <p className="text-gray-400 mb-8">
          Organize. Focus. Conquer your tasks like a pro.
        </p>

        {/* Buttons */}
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => navigate("/signup")}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-purple-500/40"
          >
            Sign Up
          </button>

          <button
            onClick={() => navigate("/login")}
            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white py-2 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-fuchsia-500/40"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/trial")}
            className="bg-gradient-to-r from-purple-500 to-fuchsia-600 hover:from-fuchsia-600 hover:to-purple-500 text-white py-2 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-purple-400/40"
          >
            Try as Guest
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-6">
          © 2025 Shantanu Rohile. Built with 💜 and React.
        </p>
      </div>
    </div>
  );
}

export default Home;
