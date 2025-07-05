import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { ProductItem } from "../types/Product";

export interface CartItem {
  sku: ProductItem;
  quantity: number;
  color: string;
  talla: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (sku: ProductItem, color: string, talla: string) => void;
  removeFromCart: (itemToRemove: CartItem) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (e) {
        console.error("Error parsing cart from localStorage", e);
        localStorage.removeItem("cart");
      }
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, initialized]);

  const addToCart = (sku: ProductItem, color: string, talla: string) => {
    setCart((prev) => {
      const exists = prev.find(
        (item) =>
          item.sku.itemId === sku.itemId &&
          item.color === color &&
          item.talla === talla
      );

      if (exists) {
        return prev.map((item) =>
          item.sku.itemId === sku.itemId &&
          item.color === color &&
          item.talla === talla
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { sku, quantity: 1, color, talla }];
    });
  };

  const removeFromCart = (itemToRemove: CartItem) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.sku.itemId === itemToRemove.sku.itemId &&
            item.color === itemToRemove.color &&
            item.talla === itemToRemove.talla
          )
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
