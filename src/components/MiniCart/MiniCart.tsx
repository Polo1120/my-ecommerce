import React, { useRef, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useMiniCart } from "../../context/MiniCartContext";
import "./styles.css";

const MiniCart: React.FC = () => {
  const { cart, removeFromCart } = useCart();
  const { isOpen, closeMiniCart } = useMiniCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = React.useCallback(
    (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        closeMiniCart();
      }
    },
    [closeMiniCart, drawerRef]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  const subtotal = cart.reduce(
    (sum, item) =>
      sum +
      (item.sku.sellers?.[0]?.commertialOffer?.ListPrice || 0) * item.quantity,
    0
  );

  const total = cart.reduce(
    (sum, item) =>
      sum +
      (item.sku.sellers?.[0]?.commertialOffer?.Price || 0) * item.quantity,
    0
  );

  const handleGoToCart = () => {
    closeMiniCart();
  };

  return (
    <>
      {isOpen && <div className="minicart-overlay" />}
      <div
        className={`minicart-drawer ${isOpen ? "open" : ""}`}
        ref={drawerRef}
      >
        <div className="minicart-header">
          <h3>Mi carrito</h3>
          <button onClick={closeMiniCart}>✕</button>
        </div>

        <div className="minicart-body">
          {cart.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item.sku.itemId + item.color + item.talla}>
                  <img
                    src={item.sku.images?.[0]?.imageUrl}
                    alt={item.sku.name}
                  />
                  <div>
                    <p className="name">{item.sku.name}</p>
                    <p className="details">
                      Color: {item.color} | Talla: {item.talla}
                    </p>
                    <span>Cantidad: {item.quantity}</span>
                    <p className="price">
                      $
                      {item.sku.sellers?.[0]?.commertialOffer?.Price.toLocaleString()}
                    </p>
                    <button onClick={() => removeFromCart(item)}>
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="minicart-footer">
            <div className="totals">
              <p>
                <span>Subtotal:</span>
                <span>${subtotal.toLocaleString()}</span>
              </p>
              <p>
                <span>Total:</span>
                <span className="total">${total.toLocaleString()}</span>
              </p>
            </div>
            <button className="go-to-cart" onClick={handleGoToCart}>
              Ir al carrito
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MiniCart;
