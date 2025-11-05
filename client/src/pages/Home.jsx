

import { useEffect, useState } from "react";
import { getStories } from "../api/storyApi";
import { Link } from "react-router-dom";
import useTheme from "../context/useTheme"; 

export default function Home() {
  const { theme } = useTheme(); 
  const [stories, setStories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 3;

  useEffect(() => {
    getStories().then((res) => setStories(res.data));
  }, []);

  const totalPages = Math.ceil(stories.length / storiesPerPage);
  const startIndex = (currentPage - 1) * storiesPerPage;
  const currentStories = stories.slice(startIndex, startIndex + storiesPerPage);

  return (
    <div
      className={`p-6 transition-colors duration-300 ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
    >
      <h2
        className={`text-3xl font-semibold mb-6 transition-colors duration-300 ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        Explore Stories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentStories.map((story) => (
          <Link
            key={story._id}
            to={`/player/${story._id}`}
            className={`rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 p-4 ${
              theme === "dark"
                ? "bg-slate-800 text-white"
                : "bg-white text-black"
            }`}
          >
            <img
              src={story.slides[0]?.url}
              alt={story.title}
              className="w-full h-48 object-cover rounded-lg"
            />

            <h3 className="text-xl font-bold mt-3">{story.title}</h3>

            <p className="opacity-80">{story.category}</p>
          </Link>
        ))}
      </div>

      
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg disabled:opacity-50 transition ${
            theme === "dark" ? "bg-slate-700 text-white" : "bg-gray-200 text-black"
          }`}
        >
          Previous
        </button>

        <span className="text-lg">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg disabled:opacity-50 transition ${
            theme === "dark" ? "bg-slate-700 text-white" : "bg-gray-200 text-black"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
