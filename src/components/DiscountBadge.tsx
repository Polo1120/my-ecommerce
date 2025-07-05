import React from "react";

interface Props {
  price: number;
  listPrice: number;
}

const DiscountBadge: React.FC<Props> = ({ price, listPrice }) => {
  if (!price || !listPrice || price >= listPrice) return null;

  const discount = Math.round(((listPrice - price) / listPrice) * 100);

  return (
    <div className="discount-badge">
      -{discount}%
    </div>
  );
};

export default DiscountBadge;
