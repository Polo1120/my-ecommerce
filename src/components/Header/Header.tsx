import React from "react";
import "./styles.css";
import MiniCartButton from "../MiniCart/MiniCartButton";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">MiLogo</div>

      <MiniCartButton />
    </header>
  );
};

export default Header;
