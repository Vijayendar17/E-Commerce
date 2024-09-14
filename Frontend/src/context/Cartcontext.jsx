import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  useEffect(()=>{
    let exsistingcartstorage = localStorage.getItem("cart")
    if (exsistingcartstorage) {
      setCart(JSON.parse(exsistingcartstorage))
    }
  },[])
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };