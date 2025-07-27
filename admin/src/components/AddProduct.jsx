import React, { useState } from "react";
const API_URL = "https://e-commerce-bsss.onrender.com";

function AddProduct() {
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    new_price: "",
    old_price: "",
    mainImage: null,
    thumbnails: [],
  });

  const [previewMain, setPreviewMain] = useState(null);
  const [previewThumbs, setPreviewThumbs] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMainImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData((prev) => ({ ...prev, mainImage: file }));
      setPreviewMain(URL.createObjectURL(file));
    }
  };

  const handleThumbnails = (e) => {
    const files = Array.from(e.target.files).slice(0, 4); // Max 4 thumbnails
    setProductData((prev) => ({ ...prev, thumbnails: files }));
    setPreviewThumbs(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Upload all images: main + thumbnails
      const formData = new FormData();
      formData.append("images", productData.mainImage);
      productData.thumbnails.forEach((file) => formData.append("images", file));

      const uploadRes = await fetch(`${API_URL}/upload-multiple`, {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadData.success) throw new Error("Image upload failed");

      const allUrls = uploadData.images;
      const mainImageUrl = allUrls[0];
      const thumbnailUrls = allUrls.slice(1);

      // 2. Save product details
      const productRes = await fetch(`${API_URL}/addproduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: productData.name,
          category: productData.category,
          new_price: productData.new_price,
          old_price: productData.old_price,
          image: mainImageUrl,
          images: thumbnailUrls,
        }),
      });

      if (productRes.ok) {
        alert("Product uploaded successfully!");
        setProductData({
          name: "",
          category: "",
          new_price: "",
          old_price: "",
          mainImage: null,
          thumbnails: [],
        });
        setPreviewMain(null);
        setPreviewThumbs([]);
      } else {
        alert("Product upload failed.");
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

        {/* Main Image Upload */}
        <div>
          <label className="block mb-2 text-gray-600 font-medium">Main Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleMainImage}
            required
            className="w-full border p-2 rounded bg-white"
          />
          {previewMain && (
            <img src={previewMain} alt="Main Preview" className="w-48 h-48 object-contain mt-2" />
          )}
        </div>

        {/* Thumbnails Upload */}
        <div>
          <label className="block mb-2 text-gray-600 font-medium">
            Thumbnails (up to 4)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleThumbnails}
            className="w-full border p-2 rounded bg-white"
          />
          {previewThumbs.length > 0 && (
            <div className="flex gap-2 mt-2">
              {previewThumbs.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-20 h-20 object-cover rounded"
                />
              ))}
            </div>
          )}
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
