import React, { useState } from "react";
const API_URL = "https://e-commerce-bsss.onrender.com";


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
      const uploadRes = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadData.success) throw new Error("Image upload failed");

      const imageUrl = uploadData.image_url.replace("http://localhost:4000/", ""); // store relative path

      // 2. Then send product data
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
          image: imageUrl, // only the path
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
      {/* ... your form stays unchanged ... */}
    </div>
  );
}

export default AddProduct;
