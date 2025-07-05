import React from "react";
import { ProductItem } from "../../types/Product";
import { useCart } from "../../context/CartContext";
import { useMiniCart } from "../../context/MiniCartContext";
import "./styles.css";

interface Props {
  sku: ProductItem;
  quantity: number;
  selectedColor?: string;
  selectedTalla?: string;
  onValidationFail: () => void;
}

const AddToCartButton: React.FC<Props> = ({
  sku,
  quantity,
  selectedColor,
  selectedTalla,
  onValidationFail,
}) => {
  const { addToCart } = useCart();
  const { openMiniCart } = useMiniCart();

  const handleClick = () => {
    if (!selectedColor || !selectedTalla) {
      onValidationFail();
      return;
    }

    openMiniCart();
    addToCart(sku, quantity, selectedColor, selectedTalla);
  };

  return (
    <button className="add-to-cart" onClick={handleClick}>
      Agregar al carrito
    </button>
  );
};

export default AddToCartButton;
