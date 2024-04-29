import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "./UserProfile.css"
import React, { useState } from 'react';
import { BlockPicker, ChromePicker, GithubPicker } from 'react-color';
const API_URL = import.meta.env.VITE_API_URL;

export const UserProfile = () => {
  const red = "bg-red-300"
  const [color, setColor] = useState('#ffffff'); // Initial color state
  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };
  const { user } = useAuth();

  function getColorName(colorCode) {
    let colorName;
  
    switch (colorCode) {
      case '#0d6efd':
        colorName = 'bg-blue';
        break;
      case '#6610f2':
        colorName = 'bg-indigo';
        break;
      case '#d63384':
        colorName = 'bg-pink';
        break;
      case '#6f42c1':
        colorName = 'bg-purple';
        break;
      case '#dc3545':
        colorName = 'bg-red';
        break;
      case '#ffc107':
        colorName = 'bg-yellow';
        break;
      case '#198754':
        colorName = 'bg-green';
        break;
      case '#20c997':
        colorName = 'bg-teal';
        break;
      case '#0dcaf0':
        colorName = 'bg-cyan';
        break;
      case '#fd7e14':
        colorName = 'bg-orange';
        break;
    }
  
    return colorName;
  }

  const updateUser = async (e) => {
    // console.log(document.getElementById('color-picker').color)
    console.log(color)
    try {
      // make post request here
      const response =
        await axios.post(`${API_URL}/user/update`,
          {
            displayName: document.getElementById('displayName').value,
            description: document.getElementById('description').value,
            settings: {
              color: getColorName(color)
            }
          },
          {
            withCredentials: true,
          }
        );

    } catch (error) {
      console.error("Error Updating users:" + error)
    }
  }

  return (
    <div className="flex m-7 flex-grow w-1/2">
      <div className="panel w-1/2 profile-header">
        <h1 className="panel-header mb-2">User Profile</h1>
        <img
          className="profile-img w-32 h-32 rounded-full border-4 border-purple-300 mb-4"
          src={`${user?.avatarUrl}`}
          alt="Profile"
        />
        <div className="flex flex-col">
          <h1 className="panel-header mb-2">Username</h1>
          <input id="displayName"
            value={user.displayName}
            onClick={e => { this.className = "p-2 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition duration-200 ease-in-out" }}>
          </input>
          <h1 className="panel-header mb-2">Description</h1>
          <input id='description'
            className="h-32 text-top"
            value={user.description}
            /* Add user description with 250 character limit to user in database */
            maxLength="250"
            onClick={e => { this.className = "h-100 w-1/2 p-2 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition duration-200 ease-in-out" }}>
          </input>
          <div>
        <h1 className="panel-header mb-2">Select a Color</h1>
        <GithubPicker id="color-picker"
        width="140px"
        colors={[
          /*$blue:  */  "#0d6efd",
          /*$indigo:*/  "#6610f2",
          /*$pink:  */  "#d63384",
          /*$purple:*/  "#6f42c1",
          /*$red:   */  "#dc3545",
          /*$orange:*/  "#fd7e14",
          /*$yellow:*/  "#ffc107",
          /*$green: */  "#198754",
          /*$teal:  */  "#20c997",
          /*$cyan:  */  "#0dcaf0",
        ]}
            color={color} onChange={handleColorChange}/>
      </div>
          <button onClick={updateUser} className={"ml-2 text-white py-2 px-4 rounded-lgtransition duration-200 ease-in-out " + user.settings.color + "-500 " + " hover:" + user.settings.color + "-700 "}>Save</button>
        </div>
      </div>
    </div>
  )
};
