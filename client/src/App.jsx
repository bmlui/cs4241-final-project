import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import { Login } from "./pages/Login";
import { AuthenticatedApp } from "./pages/AuthenticatedApp";
import { useAuth } from "./context/AuthContext";

import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const { user, loading, fetchUser } = useAuth();

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");
    if (token) {
      localStorage.setItem("jwt", token);
      window.history.replaceState({}, document.title, "/"); // Clean the URL
      fetchUser(); // Set user to an empty object or fetch user data
    }
  }, [user]);

  if (loading) {
    return (
      // Render a loading indicator while waiting for authentication process to complete
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <ToastContainer position="top-center" autoClose={2000} closeOnClick />
        <p className="text-xl font-semibold text-gray-800">Loading...</p>
        <div className="bg-purple"></div>
        <div className="bg-purple-light"></div>
        <div className="bg-purple-dark"></div>
        <div className="bg-blue"></div>
        <div className="bg-blue-dark"></div>
        <div className="bg-blue-light"></div>
        <div className="bg-indigo"></div>
        <div className="bg-indigo-light"></div>
        <div className="bg-indigo-dark"></div>
        <div className="bg-pink"></div>
        <div className="bg-pink-light"></div>
        <div className="bg-pink-dark"></div>
        <div className="bg-red"></div>
        <div className="bg-red-light"></div>
        <div className="bg-red-dark"></div>
        <div className="bg-orange-light"></div>
        <div className="bg-orange"></div>
        <div className="bg-orange-dark"></div>
        <div className="bg-yellow"></div>
        <div className="bg-yellow-light"></div>
        <div className="bg-yellow-dark"></div>
        <div className="bg-green"></div>
        <div className="bg-green-light"></div>
        <div className="bg-green-dark"></div>
        <div className="bg-teal"></div>
        <div className="bg-teal-light"></div>
        <div className="bg-teal-dark"></div>
        <div className="bg-cyan"></div>
        <div className="bg-cyan-light"></div>
        <div className="bg-cyan-dark"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <ToastContainer position="top-center" autoClose={2000} closeOnClick />
      {user ? <AuthenticatedApp /> : <Login />}
    </div>
  );
};

export default App;
