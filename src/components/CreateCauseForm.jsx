import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCause } from "../redux/causes/causesSlice";

const CreateCauseForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.causes);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !goal || !image) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("goal", goal);
    formData.append("image", image);

    try {
      await dispatch(createCause(formData)).unwrap();

      alert("Cause created successfully!");

      // Reset form
      setTitle("");
      setDescription("");
      setGoal("");
      setImage(null);
      setPreviewUrl(null);
    } catch (err) {
      alert(err || "Error creating cause");
    }
  };

  return (
    <div className="w-full custom-tap:px-12 px-1 custom-tap:py-[65px] py-4 font-vietnam bg-gray/100">
      <h2 className="text-2xl text-red-wine font-bold mb-6 pb-4 border-b-4 border-black">
        Create New Cause
      </h2>

      <form onSubmit={handleSubmit} className="space-y-2">
        {/* Title */}
        <div>
          <label className="block text-black font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray/600 rounded-lg focus:outline-none focus:border-red-wine"
            placeholder="Enter cause title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-black font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray/600 rounded-lg focus:outline-none focus:border-red-wine min-h-[120px]"
            placeholder="Write about your cause..."
            required
          />
        </div>

        {/* Goal */}
        <div>
          <label className="block text-black font-semibold">
            Goal Amount ($)
          </label>
          <input
            type="number"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full p-3 border border-gray/600 rounded-lg focus:outline-none focus:border-red-wine"
            placeholder="Enter fundraising goal"
            required
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-black font-semibold">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setImage(file);
              setPreviewUrl(file ? URL.createObjectURL(file) : null);
            }}
            className="w-full p-2 border border-gray/600 rounded-lg"
            required
          />

          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="mt-2 rounded-lg shadow-md max-w-xs"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-red-wine text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-red-wine transition duration-200 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Cause"}
        </button>

        {error && (
          <p className="text-red-600 font-medium mt-2 text-sm">{error}</p>
        )}
      </form>
    </div>
  );
};

export default CreateCauseForm;
