import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import "./styles.css";
interface HeaderProps {
  onCartClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  return (
    <header className="header">
      <div className="logo">MiLogo</div>

      <button
        className="icon-button"
        onClick={onCartClick}
        aria-label="Ver carrito"
      >
        <FaShoppingCart size={24} />
      </button>
    </header>
  );
};

export default Header;
