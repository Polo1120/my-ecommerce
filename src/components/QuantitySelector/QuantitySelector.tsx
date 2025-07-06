import React from "react";
import "./styles.css";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onChange,
  min = 1,
  max,
}) => {
  const handleChange = (value: number) => {
    if (value >= min && (max === undefined || value <= max)) {
      onChange(value);
    }
  };

  return (
    <div className="quantity-selector">
      <button
        onClick={() => handleChange(quantity - 1)}
        disabled={quantity <= min}
      >
        -
      </button>
      <input
        type="number"
        value={quantity}
        onChange={(e) => handleChange(Number(e.target.value))}
        min={min}
        max={max}
      />
      <button
        onClick={() => handleChange(quantity + 1)}
        disabled={max !== undefined && quantity >= max}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
