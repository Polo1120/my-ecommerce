import React, { useState } from "react";
import "./styles.css";

interface Props {
  description: string;
  maxLines?: number;
}

const ProductDescription: React.FC<Props> = ({
  description,
  maxLines = 3,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <div className="product-description">
      <p className={`description-text ${expanded ? "expanded" : ""}`} style={!expanded ? { WebkitLineClamp: maxLines } : {}}>
        {description}
      </p>
      <button className="toggle-btn" onClick={toggleExpanded}>
        {expanded ? "Mostrar menos" : "Mostrar más"}
      </button>
    </div>
  );
};

export default ProductDescription;
