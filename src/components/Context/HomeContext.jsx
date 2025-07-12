// src/context/ProductContext.js

import React, { createContext } from "react";
import all_product from "../../assets/all_product";

const ProductContext = createContext();

const ProductProvider = (props) => {
  const products ={all_product};

  return (
    <ProductContext.Provider value={products}>
      {props.children}
    </ProductContext.Provider>
  );
};


export default ProductProvider;
