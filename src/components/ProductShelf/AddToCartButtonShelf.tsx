// src/components/AddToCartButton/AddToCartButton.tsx

import React from "react";
import { ProductItem } from "../../types/Product";
import { useCart } from "../../context/CartContext";
import { useMiniCart } from "../../context/MiniCartContext";
import "./styles.css";

interface Props {
  sku: ProductItem;
}

const AddToCartButtonShelf: React.FC<Props> = ({ sku }) => {
  const { addToCart } = useCart();
  const { openMiniCart } = useMiniCart();

  const handleClick = () => {
    const color = sku.Color?.[0] ?? "N/A";
    const talla = sku.Talla?.[0] ?? "N/A";
    const quantity = 1;
    addToCart(sku, quantity, color, talla);
    openMiniCart();
  };

  return (
    <div className="content-add-to-cart-shelf">
      <button onClick={handleClick} className="add-to-cart-shelf">
        Agregar al carrito
      </button>
    </div>
  );
};

export default AddToCartButtonShelf;
