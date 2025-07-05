import React, { useState } from "react";
import MiniCart from "./MiniCart";
import { useCart } from "../../context/CartContext";
import "./styles.css";


const MiniCartToggle: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <button className="minicart-icon" onClick={() => setOpen(!open)}>
        🛒
        {totalItems > 0 && <span className="counter">{totalItems}</span>}
      </button>

      {open && (
        <div className="minicart-modal">
          <div className="backdrop" onClick={() => setOpen(false)} />
          <MiniCart />
        </div>
      )}
    </>
  );
};

export default MiniCartToggle;
