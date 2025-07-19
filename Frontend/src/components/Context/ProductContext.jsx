import React, { createContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  // Fetch all products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:4000/allproducts');
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch products");
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err.message);
      }
    };
    fetchProducts();
  }, []);

  // Load cart from backend or localStorage on mount
  useEffect(() => {
    const loadCart = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.id) {
        try {
          const res = await fetch(`http://localhost:4000/getcart/${user.id}`);
          const data = await res.json();
          if (res.ok && data?.cart) {
            setCartItems(data.cart);
            setIsCartLoaded(true);
            return;
          }
        } catch (err) {
          console.error("Error fetching cart from backend:", err.message);
        }
      }
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(storedCart);
      setIsCartLoaded(true);
    };

    loadCart();
  }, []);

  // Save cart to backend only after initial cart load
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (isCartLoaded && user && user.id && cartItems.length >= 0) {
      fetch("http://localhost:4000/savecart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, cart: cartItems }),
      }).catch(err => console.error("Error saving cart:", err));
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems, isCartLoaded]);

  // Clear cart automatically if user logs out (token removed)
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      if (!token) setCartItems([]);  // clear cart if no token
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Add to cart
  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id || item.id === product._id);
      if (existing) {
        return prev.map(item =>
          (item.id === product.id || item.id === product._id)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product._id || product.id,
          name: product.name,
          image: product.image,
          category: product.category,
          new_price: product.new_price,
          old_price: product.old_price,
          quantity,
        },
      ];
    });
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Update quantity
  const updateCartQuantity = (id, quantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        cartItems,
        setCartItems,  // added to context
        addToCart,
        removeFromCart,
        updateCartQuantity,
        cartCount,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
