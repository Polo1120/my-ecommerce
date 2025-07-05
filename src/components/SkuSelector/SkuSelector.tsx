import React, { useState, useEffect } from "react";
import { ProductItem } from "../../types/Product";
import "./styles.css";

interface Props {
  products: ProductItem[];
  onSelectSku: (sku: ProductItem) => void;
}

const SkuSelector: React.FC<Props> = ({ products, onSelectSku }) => {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedTalla, setSelectedTalla] = useState<string>("");

  const uniqueColors: string[] = Array.from(
    new Set(products.map((item) => item.Color?.[0]).filter((color): color is string => Boolean(color)))
  );

  const allTallas = Array.from(
    new Set(products.map((item) => item.Talla?.[0]).filter((talla): talla is string => Boolean(talla)))
  );

  const tallasFiltradas = selectedColor
    ? Array.from(
        new Set(
          products
            .filter((item) => item.Color?.[0] === selectedColor)
            .map((item) => item.Talla?.[0])
            .filter((talla): talla is string => Boolean(talla))
        )
      )
    : allTallas;

  
  useEffect(() => {
    if (selectedColor && selectedTalla) {
      const sku = products.find(
        (item) =>
          item.Color?.[0] === selectedColor &&
          item.Talla?.[0] === selectedTalla
      );
      if (sku) {
        onSelectSku(sku);
      }
    }
  }, [selectedColor, selectedTalla, onSelectSku, products]);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setSelectedTalla(""); 
  };

  const handleTallaSelect = (talla: string) => {
    setSelectedTalla(talla);
    if (!selectedColor) {
      const sku = products.find((item) => item.Talla?.[0] === talla);
      if (sku) {
        onSelectSku(sku);
        setSelectedColor(sku.Color?.[0] ?? "");
      }
    }
  };

  return (
    <div className="sku-selector">
      <div className="field">
        <label>Color:</label>
        <div className="options">
          {uniqueColors.map((color) => (
            <button
              key={color}
              className={`option-button ${selectedColor === color ? "selected" : ""}`}
              onClick={() => handleColorSelect(color)}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label>Talla:</label>
        <div className="options">
          {tallasFiltradas.map((talla) => (
            <button
              key={talla}
              className={`option-button ${selectedTalla === talla ? "selected" : ""}`}
              onClick={() => handleTallaSelect(talla)}
            >
              {talla}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkuSelector;
