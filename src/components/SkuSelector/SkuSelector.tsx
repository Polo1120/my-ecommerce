import React, { useState, useMemo } from "react";
import { ProductItem } from "../../types/Product";
import "./styles.css";

interface Props {
  products: ProductItem[];
  onSelectSku: (sku: ProductItem) => void;
  onSelectColorTalla: (color: string, talla: string) => void;
  showErrors: boolean;
}

const SkuSelector: React.FC<Props> = ({
  products,
  onSelectSku,
  onSelectColorTalla,
  showErrors = false,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedTalla, setSelectedTalla] = useState<string>("");

  const uniqueColors = useMemo(
    () =>
      Array.from(
        new Set(
          products
            .map((item) => item.Color?.[0])
            .filter((color): color is string => Boolean(color))
        )
      ),
    [products]
  );

  const allTallas = useMemo(
    () =>
      Array.from(
        new Set(
          products
            .map((item) => item.Talla?.[0])
            .filter((talla): talla is string => Boolean(talla))
        )
      ),
    [products]
  );

  const tallasFiltradas = useMemo(() => {
    if (!selectedColor) return allTallas;

    return Array.from(
      new Set(
        products
          .filter((item) => item.Color?.[0] === selectedColor)
          .map((item) => item.Talla?.[0])
          .filter((talla): talla is string => Boolean(talla))
      )
    );
  }, [products, selectedColor, allTallas]);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setSelectedTalla("");
    onSelectColorTalla(color, "");

    const sku = products.find((item) => item.Color?.[0] === color);
    if (sku) {
      onSelectSku(sku);
    }
  };

  const handleTallaSelect = (talla: string) => {
    setSelectedTalla(talla);
    onSelectColorTalla(selectedColor, talla);

    const sku = products.find(
      (item) => item.Color?.[0] === selectedColor && item.Talla?.[0] === talla
    );

    if (sku) {
      onSelectSku(sku);
    }
  };

  return (
    <div className="sku-selector">
      <div className="field">
        <label>
          Color:
          {showErrors && !selectedColor && (
            <span className="error-message">Selecciona un color</span>
          )}
        </label>
        <div className="options">
          {uniqueColors.map((color) => (
            <button
              key={color}
              className={`option-button ${
                selectedColor === color ? "selected" : ""
              }`}
              onClick={() => handleColorSelect(color)}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label>
          Talla:
          {showErrors && !selectedTalla && (
            <span className="error-message">Selecciona una talla</span>
          )}
        </label>
        <div className="options">
          {tallasFiltradas.map((talla) => (
            <button
              key={talla}
              className={`option-button ${
                selectedTalla === talla ? "selected" : ""
              }`}
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
