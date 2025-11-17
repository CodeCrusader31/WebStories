import { useEffect, useState } from "react";
import { getStories, deleteStory } from "../api/storyApi";
import { Link } from "react-router-dom";
import useTheme from "../context/useTheme"; 

export default function AdminDashboard() {
  const { theme } = useTheme(); 
  const [stories, setStories] = useState([]);

  const loadStories = () => getStories().then((res) => setStories(res.data));

  useEffect(() => {
    loadStories();
  }, []);

  const handleDelete = async (id) => {
    await deleteStory(id);
    loadStories();
  };

  return (
    <div
      className={`p-6 transition-colors duration-300 ${
        theme === "dark" ? "text-white bg-slate-900" : "text-black bg-white"
      }`}
    >
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>

        <Link
          to="/admin/add"
          className={`px-4 py-2 rounded-lg transition ${
            theme === "dark"
              ? "bg-indigo-600 text-white hover:bg-indigo-400"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          + Add Story
        </Link>
      </div>

      <table
        className={`w-full border-collapse rounded-xl shadow-md transition-colors duration-300 ${
          theme === "dark" ? "bg-slate-800" : "bg-white"
        }`}
      >
        <thead className={`${theme === "dark" ? "bg-slate-700" : "bg-indigo-100"}`}>
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {stories.map((s) => (
            <tr
              key={s._id}
              className={`border-b transition-colors duration-300 ${
                theme === "dark" ? "border-slate-700" : "border-gray-200"
              }`}
            >
              <td className="p-3">{s.title}</td>
              <td className="p-3">{s.category}</td>
              <td className="p-3">{new Date(s.createdAt).toLocaleDateString()}</td>

              <td className="p-3 space-x-3">
                <button
                  onClick={() => handleDelete(s._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>

                <Link
                  to={`/admin/add?id=${s._id}`}
                  className={`hover:underline ${
                    theme === "dark" ? "text-indigo-300" : "text-indigo-600"
                  }`}
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
