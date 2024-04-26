import { useAuth } from "../context/AuthContext";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const UserProfile = () => {

  const { user } = useAuth();

  const updateUser = async (e) => {
    try{
      // make post request here
      const response = 
      await axios.post(`${API_URL}/user/update`,
        {
          displayName: document.getElementById('displayName').value, 
          description: document.getElementById('description').value
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
            onClick={e => {this.className="p-2 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition duration-200 ease-in-out"}}>
            </input>
            <h1 className="panel-header mb-2">Description</h1>
            <input id='description'
            className="h-32 text-top"
            value={user.description}
            /* Add user description with 250 character limit to user in database */
            maxLength="250"
            onClick={e => {this.className="h-100 w-1/2 p-2 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition duration-200 ease-in-out"}}>
            </input>
            <button onClick={updateUser} className="ml-2 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200 ease-in-out">Save</button>
          </div>
      </div>
    </div>
  )
};
