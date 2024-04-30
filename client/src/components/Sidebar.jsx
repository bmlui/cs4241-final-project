import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

import "./Sidebar.css";
import { useEffect } from "react";

import { useAuth } from "../context/AuthContext";

import {
  ChatBubbleLeftIcon,
  Cog6ToothIcon,
  ArrowLeftStartOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";

const SidebarItem = ({ icon: Icon, label, onClick, selected, user }) => (
  <button
    onClick={onClick}
    className={`sidebar-item ${
      selected
        ? `bg-${user?.colors.darkColor} text-white`
        : "sidebar-item-unselected"
    } flex items-center justify-between`}
  >
    <div className="flex items-center p-8">
      <Icon className="h-10 w-10 ml-2 mr-3" />
      <span
        className={`sidebar-item-label ${
          selected
            ? `sidebar-item-label-selected bg-${user?.colors.darkColor}`
            : "sidebar-item-label-unselected"
        }`}
      >
        {label}
      </span>
    </div>
    <div
      className={`sidebar-item-indicator ${
        selected
          ? "sidebar-item-indicator-selected"
          : "sidebar-item-indicator-unselected"
      }`}
    ></div>
    {/* Indicator */}
  </button>
);

// Logout user
const handleLogout = () => {
  // delete the token from local storage
  localStorage.removeItem("jwt");
  window.location.href = window.location.href;
};

export const Sidebar = ({ currentPage, setPage }) => {
  const { user } = useAuth();

  return (
    <aside className={"sidebar bg-" + `${user?.colors.mainColor}`}>
      <img
        className="profile-img"
        src={`${user?.avatarUrl}`}
        alt="Profile"
        onClick={() => setPage("profile")}
      />
      <div className="sidebar-content">
        {/* Add Contact Page */}
        <SidebarItem
          icon={UserPlusIcon}
          user={user}
          onClick={() => setPage("add-contact")}
          selected={currentPage === "add-contact"}
        />
        {/* Chat Page */}
        <SidebarItem
          icon={ChatBubbleLeftIcon}
          user={user}
          onClick={() => setPage("chat")}
          selected={currentPage === "chat"}
        />
        {/* Settings */}
        <SidebarItem
          icon={Cog6ToothIcon}
          user={user}
          onClick={() => setPage("settings")}
          selected={currentPage === "settings"}
        />
        {/* Spacer */}
        <div className="flex-grow" />
        {/* Logout */}
        <SidebarItem
          user={user}
          icon={ArrowLeftStartOnRectangleIcon}
          onClick={handleLogout}
        />
      </div>
    </aside>
  );
};
