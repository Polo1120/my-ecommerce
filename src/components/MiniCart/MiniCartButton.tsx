

import React from "react";
import { useMiniCart } from "../../context/MiniCartContext";
import { useCart } from "../../context/CartContext";
import "./styles.css";

const MiniCartButton: React.FC = () => {
  const { openMiniCart } = useMiniCart();
  const { cart } = useCart();
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button className="icon-cart" onClick={openMiniCart} aria-label="Ver carrito">
      <span className="badge">{totalQty}</span>
    </button>
  );
};

export default MiniCartButton;
