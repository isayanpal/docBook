import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true
    dispatch(registerUser({ username, password, role }))
      .unwrap()
      .then(() => {
        navigate("/login");
        toast.success("Registered successfully");
      })
      .catch((error) => {
        console.error("Registration failed", error);
        toast.error("Sign up failed");
      })
      .finally(() => {
        setIsLoading(false); // Reset loading state
      });
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "#080e01" }}
    >
      <div className="w-full max-w-md p-8 space-y-8 bg-[#1a1f12] rounded-lg shadow-md">
        <h2
          className="text-2xl font-bold text-center"
          style={{ color: "#f1fddb" }}
        >
          Register
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#bef96f] focus:border-[#bef96f] focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#bef96f] focus:border-[#bef96f] focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="pt-4">
              <label
                htmlFor="role"
                className="block text-sm font-medium"
                style={{ color: "#f1fddb" }}
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#bef96f] focus:border-[#bef96f] sm:text-sm"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading} // Disable button when loading
              className={`group relative flex w-full justify-center py-2 px-4 border border-transparent text-sm font-semibold rounded-md text-[#080e01] ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#bef96f] hover:bg-[#9ee054]"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#bef96f]`}
            >
              {isLoading ? "Registering..." : "Register"}{" "}
              {/* Show loading text */}
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm" style={{ color: "#f1fddb" }}>
            Already a user?{" "}
            <Link
              to="/login"
              className="font-medium text-[#bef96f] hover:text-[#9ee054]"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
