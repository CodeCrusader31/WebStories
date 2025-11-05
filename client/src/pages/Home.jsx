

import { useEffect, useState } from "react";
import { getStories } from "../api/storyApi";
import { Link } from "react-router-dom";
import useTheme from "../context/useTheme";

export default function Home() {
  const { theme } = useTheme();
  const [stories, setStories] = useState([]);

  useEffect(() => {
    getStories().then((res) => setStories(res.data));
  }, []);

  return (
    <div
      className={`p-6 transition-colors duration-300 ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
    >
      <h2
        className={`text-3xl font-semibold flex justify-center mb-6 transition-colors duration-300 ${
          theme === "dark" ? "text-white" : "text-black"
        }  `}
      >
        Explore Stories with Us
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
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
    </div>
  );
}
