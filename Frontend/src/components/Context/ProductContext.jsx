import React, { createContext, useState, useEffect } from 'react';

const ProductContext = createContext();

// Use environment variable for backend URL
const API_URL = import.meta.env.VITE_API_URL || "https://e-commerce-bsss.onrender.com";


export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  // Fetch all products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/allproducts`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch products");
        const normalized = data.map(p => ({ ...p, id: p._id || p.id }));
        setProducts(normalized);
      } catch (err) {
        console.error("Error fetching products:", err.message);
      }
    };
    fetchProducts();
  }, []);

  // Load cart
  useEffect(() => {
    const loadCart = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.id) {
        try {
          const res = await fetch(`${API_URL}/getcart/${user.id}`);
          const data = await res.json();
          if (res.ok && data?.cart) {
            setCartItems(data.cart);
            setIsCartLoaded(true);
            return;
          }
        } catch (err) {
          console.error("Error fetching cart:", err.message);
        }
      }
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(storedCart);
      setIsCartLoaded(true);
    };
    loadCart();
  }, []);

  // Save cart to backend
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (isCartLoaded && user?.id) {
      fetch(`${API_URL}/savecart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, cart: cartItems }),
      }).catch(err => console.error("Error saving cart:", err));
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems, isCartLoaded]);

  // Clear cart when user logs out
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      if (!token) setCartItems([]);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Add to cart with size
  const addToCart = (product, quantity = 1, size = "M") => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          image: product.image,
          category: product.category,
          new_price: product.new_price,
          old_price: product.old_price,
          quantity,
          size,
        },
      ];
    });
  };

  const removeFromCart = (id, size) =>
    setCartItems(prev =>
      prev.filter(item => !(item.id === id && item.size === size))
    );

  const updateCartQuantity = (id, size, quantity) =>
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.size === size
          ? { ...item, quantity }
          : item
      )
    );

  const updateCartSize = (id, oldSize, newSize) =>
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.size === oldSize
          ? { ...item, size: newSize }
          : item
      )
    );

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        updateCartSize,
        cartCount,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
