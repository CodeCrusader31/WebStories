


import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStoryById } from "../api/storyApi";

export default function Player() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [index, setIndex] = useState(0);

  // ✅ Fetch story data
  useEffect(() => {
    getStoryById(id)
      .then((res) => setStory(res.data))
      .catch((err) => console.error("Error fetching story:", err));
  }, [id]);

  console.log("Story fetched:", story);



  useEffect(() => {
    if (!story || !story.slides || story.slides.length === 0) return;
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % story.slides.length);
    }, 3000);
    return () => clearTimeout(timer);
  }, [index, story]);

  
  if (!story) return <p className="p-6 text-center text-gray-400">Loading story...</p>;
  if (!story.slides || story.slides.length === 0)
    return <p className="p-6 text-center text-gray-400">No slides available for this story.</p>;

  const current = story.slides[index];

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-black text-white relative overflow-hidden"
      onClick={() =>
        setIndex((i) => (i + 1) % story.slides.length)
      }
    >
      
      {current?.type === "image" ? (
        <img
          src={current.url}
          alt="slide"
          className="max-h-[90vh] w-auto rounded-lg transition-all duration-500"
        />
      ) : (
        <video
          src={current.url}
          autoPlay
          muted
          loop
          className="max-h-[90vh] w-auto rounded-lg"
        />
      )}

     
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-sm sm:text-lg font-semibold bg-black/60 px-4 py-1 rounded-lg">
        {story.title}
      </div>

     
      <div className="absolute bottom-6 flex space-x-2">
        {story.slides.map((_, i) => (
          <div
            key={i}
            className={`h-1 w-10 rounded-full transition-all duration-300 ${
              i === index ? "bg-indigo-500 w-12" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
