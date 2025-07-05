import React from "react";
import "./styles.css";

interface Props {
  price: number;
  listPrice: number;
}

const ProductPrice: React.FC<Props> = ({ price, listPrice }) => {
  const isDiscounted = listPrice !== price;

  return (
    <p className="price">
      {isDiscounted && (
        <>
          <span className="old-price">${listPrice.toLocaleString()}</span>{" "}
          -{" "}
        </>
      )}
      <span>${price.toLocaleString()}</span>
    </p>
  );
};

export default ProductPrice;
