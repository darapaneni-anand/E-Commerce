import React, { useState } from "react";

function AddProduct() {
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    new_price: "",
    old_price: "",
    image: null,
  });

  const [previewURL, setPreviewURL] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData((prev) => ({ ...prev, image: file }));
      setPreviewURL(URL.createObjectURL(file));
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("image", productData.image);

  try {
    // 1. Upload image first
    const uploadRes = await fetch("http://localhost:4000/upload", {
      method: "POST",
      body: formData,
    });

    const uploadData = await uploadRes.json();
    if (!uploadData.success) throw new Error("Image upload failed");

    const imageUrl = uploadData.image_url;

    // 2. Then send product data
    const productRes = await fetch("http://localhost:4000/addproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: productData.name,
        category: productData.category,
        new_price: productData.new_price,
        old_price: productData.old_price,
        image: imageUrl, // pass the uploaded image URL
      }),
    });

    if (productRes.ok) {
      alert("Product uploaded successfully!");
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
        {/* Product Name */}
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={productData.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        {/* Category Dropdown */}
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

        {/* Old Price */}
        <input
          type="number"
          name="old_price"
          placeholder="Old Price"
          value={productData.old_price}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        {/* New Price */}
        <input
          type="number"
          name="new_price"
          placeholder="New Price"
          value={productData.new_price}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        {/* Image Upload */}
        <div>
          <label className="block mb-2 text-gray-600 font-medium">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            required
            className="w-full border p-2 rounded bg-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-rose-100 file:text-rose-700 hover:file:bg-rose-200"
          />
        </div>

        {/* Image Preview */}
        {previewURL && (
          <div className="mt-4">
            <p className="text-gray-600 mb-2">Image Preview:</p>
            <img
              src={previewURL}
              alt="Preview"
              className="w-48 h-48 object-contain border rounded shadow"
            />
          </div>
        )}

        {/* Submit Button */}
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
