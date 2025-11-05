
import { useState } from "react";
import { createStory, uploadFile } from "../api/storyApi";
import { useNavigate } from "react-router-dom";

export default function AddStory() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [slides, setSlides] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);

    try {
      const newUploads = [];

      for (const file of files) {
        const res = await uploadFile(file);
        const type = file.type.startsWith("video") ? "video" : "image";
        newUploads.push({ type, url: res.data.url });
      }

      
      setSlides((prev) => [...prev, ...newUploads]);
    } catch (err) {
      console.error("Uploading failed:", err);
      alert("Upload failed. Check console for details.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category) {
      alert("Please fill in all fields.");
      return;
    }

    if (slides.length === 0) {
      alert("Please upload at least one image or video slide!");
      return;
    }

    try {
      await createStory({ title, category, slides });
      alert("Story created successfully!");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Error in saving story:", err);
      alert("failed to save");
      
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Add New Story</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Story Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded-lg dark:bg-slate-800 dark:text-white"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-3 rounded-lg dark:bg-slate-800 dark:text-white"
          required
        />
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleUpload}
          className="w-full border p-3 rounded-lg cursor-pointer dark:bg-slate-800 dark:text-white"
        />

        {uploading && (
          <p className="text-indigo-600 animate-pulse">Uploading slides...</p>
        )}

        {slides.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mt-4">
            {slides.map((s, i) =>
              s.type === "image" ? (
                <img
                  key={i}
                  src={s.url}
                  alt="slide"
                  className="h-32 w-full object-cover rounded-md shadow"
                />
              ) : (
                <video
                  key={i}
                  src={s.url}
                  className="h-32 w-full object-cover rounded-md shadow"
                  controls
                />
              )
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {uploading ? "Please wait..." : "Save Story"}
        </button>
      </form>
    </div>
  );
}
