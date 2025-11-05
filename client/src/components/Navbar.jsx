import React from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import useTheme from "../context/useTheme";
export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
  className={`shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50 ${
    theme === "dark"
      ? "bg-slate-800 text-white"
      : "bg-white text-slate-900"
  }`}
>
      <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">WebStories</h1>
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
        <button
          onClick={() => {
            console.log("toggleTheme clicked. current:", theme);
            toggleTheme();
          }}
          className="p-2 rounded-full bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-100 hover:scale-110 transition"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
}
