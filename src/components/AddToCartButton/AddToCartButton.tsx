import React from "react";
import { ProductItem } from "../../types/Product";
import { useCart } from "../../context/CartContext";
import "./styles.css";

interface Props {
  sku: ProductItem;
}

const AddToCartButton: React.FC<Props> = ({ sku }) => {
  const { addToCart } = useCart();

  const color = sku.Color?.[0] ?? "N/A";
  const talla = sku.Talla?.[0] ?? "N/A";

  return (
    <button className="add-to-cart" onClick={() => addToCart(sku, color, talla)}>
      Agregar al carrito
    </button>
  );
};


export default AddToCartButton;
