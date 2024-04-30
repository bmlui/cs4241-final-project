import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { GithubPicker } from "react-color";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

export const Settings = () => {
  const { user } = useAuth();
  const [color, setColor] = useState("#ffffff");

  const colorOptions = {
    "#a855f7": "purple",
    "#93c5fd": "blue",
    "#4338ca": "indigo",
    "#f9a8d4": "pink",
    "#ef4444": "red",
    "#f97316": "orange",
    "#ffc107": "yellow",
    "#a3e635": "green",
    "#14b8a6": "teal",
    "#22d3ee": "cyan",
  };

  const getColorName = (colorCode) => colorOptions[colorCode] || "white";

  const updateUser = async (colorName) => {
    try {
      await axios.post(`${API_URL}/user/update/settings`, {
        colors: {
          mainColor: colorName,
          darkColor: `${colorName}-dark`,
          lightColor: `${colorName}-light`,
        },
      });
      toast.success(`User settings updated successfully.`);
    } catch (error) {
      console.error("Error updating user settings:", error);
    }
  };

  const handleColorChange = async (color) => {
    setColor(color.hex);
    await updateUser(getColorName(color.hex));
  };

  const handleDeleteUser = async () => {
    try {
      // Placeholder for delete user functionality
      toast.error("Delete user functionality is not implemented yet.");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="panel flex-grow m-7 ml-0 bg-white rounded-2xl shadow-lg p-4 overflow-auto">
      <h1 className="panel-header mb-2">Settings</h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Select a Color</h2>
        <GithubPicker
          width="140px"
          colors={Object.keys(colorOptions)}
          color={color}
          onChangeComplete={handleColorChange}
        />
      </div>
      <button onClick={handleDeleteUser} className="btn-primary bg-red">
        Delete User
      </button>
      <p className="text-sm text-gray-500 mt-2">
        Note: Please refresh the page after changing the color to see the
        changes applied.
      </p>
    </div>
  );
};
