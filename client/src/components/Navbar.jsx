

import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Moon, Sun, LogOut } from "lucide-react";
import useTheme from "../context/useTheme";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = localStorage.getItem("adminToken");

  const handleLogout = () => {
  
    localStorage.removeItem("adminToken");
    if (location.pathname.startsWith("/admin")) {
      navigate("/");
    }
    
    
    window.location.reload();
  };

  return (
    <nav
      className={`shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50 ${
        theme === "dark" ? "bg-slate-800 text-white" : "bg-white text-slate-900"
      }`}
    >
      <Link to="/" className="flex items-center">
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          WebStories
        </h1>
      </Link>
      
      <div className="flex items-center space-x-6">
        <Link
          to="/"
          className={`hover:text-indigo-600 transition ${
            theme === "dark" ? "text-gray-300" : "text-slate-900"
          }`}
        >
          Home
        </Link>

        <Link
          to="/admin/dashboard"
          className={`hover:text-indigo-600 transition ${
            theme === "dark" ? "text-gray-300" : "text-slate-900"
          }`}
        >
          Admin
        </Link>

     
        {isAdmin && (
          <button
            onClick={handleLogout}
            className={`flex items-center space-x-2 p-2 rounded-lg transition ${
              theme === "dark" 
                ? "bg-red-600 hover:bg-red-700 text-white" 
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
            title="Logout"
          >
            <LogOut size={16} />
            <span className="text-sm">Logout</span>
          </button>
        )}

       
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-100 hover:scale-110 transition"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
}