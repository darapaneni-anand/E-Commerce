import React, { createContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔁 Fetch all products
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

  // 🔁 Fetch cart from DB after login
  useEffect(() => {
    const fetchUserCart = async () => {
      if (!user?.id || products.length === 0) return;

      try {
        const res = await fetch(`http://localhost:4000/get-cart/${user.id}`);
        const result = await res.json();
        if (result.success) {
          const restoredCart = result.cartData.map(item => {
            const product = products.find(p => p.id === item.productId);
            return product ? { ...product, quantity: item.quantity } : null;
          }).filter(Boolean);
          setCartItems(restoredCart);
        }
      } catch (err) {
        console.error("Failed to fetch user cart:", err.message);
      }
    };

    fetchUserCart();
  }, [products, user?.id]);

  // 📤 Sync cart to DB on change (only if user is logged in)
  useEffect(() => {
    const syncCartToBackend = async () => {
      if (!user?.id) return;
      try {
        await fetch("http://localhost:4000/update-cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            cartData: cartItems.map(item => ({
              productId: item.id,
              quantity: item.quantity
            }))
          })
        });
      } catch (err) {
        console.error("Failed to sync cart to DB:", err.message);
      }
    };

    syncCartToBackend();
  }, [cartItems, user?.id]);

  const addToCart = (product, quantity = 1) => {
  setCartItems((prev) => {
    const existing = prev.find((item) => item.id === product.id);
    if (existing) {
      return prev.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      return [...prev, { ...product, quantity }];
    }
  });

  // Backend sync
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.id) {
    fetch("http://localhost:4000/add-to-cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        productId: product.id, // ✅ only send id
        quantity
      })
    }).catch(err => console.error("Cart sync failed:", err));
  }
};


  // ❌ Remove item
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // 🔁 Update quantity
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
