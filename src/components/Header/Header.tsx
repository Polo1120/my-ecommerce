import React from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useMiniCart } from "../../context/MiniCartContext";
import { useCart } from "../../context/CartContext";

const Header: React.FC = () => {
  const { openMiniCart } = useMiniCart();
  const { cart } = useCart();
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <header className="header">
      <div className="logo">MiLogo</div>

      <button
        className="icon-cart"
        onClick={openMiniCart}
        aria-label="Ver carrito"
      >
        <FontAwesomeIcon icon={faCartPlus} size={"xl"} />
        <span className="badge">{totalQty}</span>
      </button>
    </header>
  );
};

export default Header;
