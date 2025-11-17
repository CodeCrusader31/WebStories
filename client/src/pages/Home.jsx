import { useEffect, useState } from "react";
import { getStories } from "../api/storyApi";
import { Link } from "react-router-dom";
import useTheme from "../context/useTheme";
import { Play, Clock, ArrowRight, Image } from "lucide-react";

export default function Home() {
  const { theme } = useTheme();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStories().then((res) => {
      setStories(res.data);
      setLoading(false);
    });
  }, []);

  const getThumbnailUrl = (story) => {
    if (story.slides && story.slides.length > 0 && story.slides[0]?.url) {
      return story.slides[0].url;
    }
    return null;
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
          theme === "dark"
            ? "bg-slate-900 text-white"
            : "bg-gray-50 text-slate-900"
        }`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-lg">Loading stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-slate-900 text-white"
          : "bg-gray-50 text-slate-900"
      }`}
    >
      {/* Hero Section */}
      <div
        className={`py-16 px-6 text-center ${
          theme === "dark" ? "bg-slate-800" : "bg-white"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Explore Stories with DegreeFyd
          </h1>
          <p
            className={`text-xl mb-8 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Discover captivating visual stories that transport you to different
            worlds
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/admin/dashboard"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 flex items-center space-x-2"
            >
              <span>Create Story</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>


      <div className="max-w-7xl  mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Stories</h2>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              theme === "dark"
                ? "bg-slate-700 text-gray-300"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {stories.length} stories
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {stories.map((story) => {
            const thumbnailUrl = getThumbnailUrl(story);

            return (
              <Link
                key={story._id}
                to={`/player/${story._id}`}
                className={`group rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                  theme === "dark"
                    ? "bg-slate-800 hover:bg-slate-700"
                    : "bg-white hover:bg-gray-50"
                } hover:scale-105`}
              >
              
                <div className="relative overflow-hidden">
                  {thumbnailUrl ? (
                    <img
                      src={thumbnailUrl}
                      alt={story.title}
                      className="w-full h-100 object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}

               
                  <div
                    className={`w-full h-48 flex items-center justify-center ${
                      thumbnailUrl ? "hidden" : "flex"
                    } ${theme === "dark" ? "bg-slate-700" : "bg-gray-200"}`}
                  >
                    <div className="text-center">
                      <Image
                        size={48}
                        className={`mx-auto mb-2 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                      />
                      <p
                        className={`text-sm ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        No thumbnail
                      </p>
                    </div>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        theme === "dark"
                          ? "bg-slate-900 bg-opacity-80 text-white"
                          : "bg-white bg-opacity-90 text-gray-800"
                      }`}
                    >
                      {story.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                    <div
                      className={`p-2 rounded-full ${
                        theme === "dark"
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-indigo-600"
                      } bg-opacity-90`}
                    >
                      <Play size={16} fill="currentColor" />
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">
                    {story.title}
                  </h3>
                  <div className="flex justify-between items-center text-sm">
                    <span
                      className={`flex items-center space-x-1 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      <Clock size={14} />
                      <span>
                        {story.createdAt
                          ? new Date(story.createdAt).toLocaleDateString()
                          : new Date().toLocaleDateString()}
                      </span>
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        theme === "dark"
                          ? "bg-slate-700 text-gray-300"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {story.slides?.length || 0} slides
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {stories.length === 0 && (
          <div
            className={`text-center py-16 rounded-2xl ${
              theme === "dark" ? "bg-slate-800" : "bg-white"
            }`}
          >
            <div className="max-w-md mx-auto">
              <div
                className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  theme === "dark" ? "bg-slate-700" : "bg-gray-200"
                }`}
              >
                <Play size={32} className="text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No Stories Yet</h3>
              <p
                className={`mb-6 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Be the first to create an amazing story!
              </p>
              <Link
                to="/admin/dashboard"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300"
              >
                <span>Create First Story</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
