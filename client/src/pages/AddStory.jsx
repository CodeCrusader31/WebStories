import { useState, useEffect } from "react";
import { createStory, uploadFile, getStoryById, updateStory } from "../api/storyApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import useTheme from "../context/useTheme"; 

export default function AddStory() {
  const { theme } = useTheme();  
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const editingId = params.get("id");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [slides, setSlides] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (editingId) {
      getStoryById(editingId).then((res) => {
        setTitle(res.data.title);
        setCategory(res.data.category);
        setSlides(res.data.slides || []);
      });
    }
  }, [editingId]);

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

    if (!title || !category) return alert("Please fill in all fields.");
    if (slides.length === 0) return alert("Upload at least one slide!");

    try {
      if (editingId) {
        await updateStory(editingId, { title, category, slides });
        alert("✅ Story updated successfully!");
      } else {
        await createStory({ title, category, slides });
        alert("✅ Story created successfully!");
      }

      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Error saving story:", err);
      alert("Failed to save story.");
    }
  };

  return (
    <div
      className={`p-6 max-w-xl mx-auto transition-colors duration-300 ${
        theme === "dark" ? "text-white bg-slate-900" : "text-black bg-white"
      }`}
    >
      <h2 className="text-2xl font-semibold mb-6">
        {editingId ? "✏️ Edit Story" : "➕ Add New Story"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Story Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full border p-3 rounded-lg transition-colors duration-300 ${
            theme === "dark" ? "bg-slate-800 text-white border-slate-600" : "bg-white text-black"
          }`}
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`w-full border p-3 rounded-lg transition-colors duration-300 ${
            theme === "dark" ? "bg-slate-800 text-white border-slate-600" : "bg-white text-black"
          }`}
          required
        />

        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleUpload}
          className={`w-full border p-3 rounded-lg cursor-pointer transition-colors duration-300 ${
            theme === "dark" ? "bg-slate-800 text-white border-slate-600" : "bg-white text-black"
          }`}
        />

        {uploading && <p className="text-indigo-600 animate-pulse">Uploading slides...</p>}

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
                <video key={i} src={s.url} className="h-32 w-full object-cover rounded-md shadow" controls />
              )
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={uploading}
          className={`w-full py-3 rounded-lg transition ${
            theme === "dark"
              ? "bg-indigo-600 text-white hover:bg-indigo-500"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          } disabled:opacity-50`}
        >
          {editingId ? "Update Story" : "Save Story"}
        </button>
      </form>
    </div>
  );
}
