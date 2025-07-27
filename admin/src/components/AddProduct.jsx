import React, { useState } from "react";
const API_URL = "https://e-commerce-bsss.onrender.com";

function AddProduct() {
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    new_price: "",
    old_price: "",
  });

  const [mainImage, setMainImage] = useState(null);
  const [thumbnailImages, setThumbnailImages] = useState([]);
  const [previewMain, setPreviewMain] = useState(null);
  const [previewThumbs, setPreviewThumbs] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMainImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
      setPreviewMain(URL.createObjectURL(file));
    }
  };

  const handleThumbnails = (e) => {
    const files = Array.from(e.target.files).slice(0, 4); // max 4
    setThumbnailImages(files);
    setPreviewThumbs(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mainImage) {
      alert("Please select a main image.");
      return;
    }

    try {
      // 1. Upload images
      const formData = new FormData();
      formData.append("images", mainImage); // main image first
      thumbnailImages.forEach((file) => formData.append("images", file));

      const uploadRes = await fetch(`${API_URL}/upload-multiple`, {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadData.success) throw new Error("Image upload failed");

      const [uploadedMain, ...uploadedThumbs] = uploadData.images;

      // 2. Save product details
      const productRes = await fetch(`${API_URL}/addproduct`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...productData,
          image: uploadedMain,
          images: uploadedThumbs,
        }),
      });

      if (productRes.ok) {
        alert("Product added successfully!");
        // Reset form
        setProductData({ name: "", category: "", new_price: "", old_price: "" });
        setMainImage(null);
        setThumbnailImages([]);
        setPreviewMain(null);
        setPreviewThumbs([]);
      } else {
        alert("Failed to save product.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed. Check console for details.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={productData.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <select
          name="category"
          value={productData.category}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded bg-white"
        >
          <option value="">Select Category</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kid">Kid</option>
        </select>

        <input
          type="number"
          name="old_price"
          placeholder="Old Price"
          value={productData.old_price}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="new_price"
          placeholder="New Price"
          value={productData.new_price}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        {/* Main Image */}
        <div>
          <label className="block mb-2 text-gray-600 font-medium">
            Main Image
          </label>
          <input type="file" accept="image/*" onChange={handleMainImage} required />
          {previewMain && (
            <img
              src={previewMain}
              alt="Main Preview"
              className="mt-3 w-32 h-32 object-cover rounded-lg border"
            />
          )}
        </div>

        {/* Thumbnails */}
        <div>
          <label className="block mb-2 text-gray-600 font-medium">
            Thumbnail Images (up to 4)
          </label>
          <input type="file" accept="image/*" multiple onChange={handleThumbnails} />
          <div className="flex gap-3 mt-3 flex-wrap">
            {previewThumbs.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Thumbnail ${idx + 1}`}
                className="w-24 h-24 object-cover rounded-lg border"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-6 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
