import React from "react";
import { useCart } from "../../context/CartContext";
import "./styles.css";

const MiniCart: React.FC = () => {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) =>
      sum + (item.sku.sellers?.[0]?.commertialOffer?.Price || 0) * item.quantity,
    0
  );

  return (
    <div className="minicart">
      <h3>Mi carrito</h3>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.sku.itemId + item.color + item.talla} className="minicart-item">
              <img src={item.sku.images?.[0]?.imageUrl} alt={item.sku.name} />
              <div>
                <p className="name">{item.sku.name}</p>
                <p className="details">Color: {item.color} | Talla: {item.talla}</p>
                <p className="price">
                  ${item.sku.sellers?.[0]?.commertialOffer?.Price.toLocaleString()} x {item.quantity}
                </p>
                <button className="remove-button" onClick={() => removeFromCart(item)}>
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="total">Total: ${total.toLocaleString()}</div>
    </div>
  );
};

export default MiniCart;
