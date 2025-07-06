import React, { useRef, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useMiniCart } from "../../context/MiniCartContext";
import "./styles.css";
import ProductPrice from "../ProductPrice/ProductPrice";

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

  const totalDiscount = subtotal - total;

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
          <button className="close-minicart" onClick={closeMiniCart}></button>
        </div>

        <div className="minicart-body">
          {cart.length === 0 ? (
            <div className="minicart-empty">
              <h4>Tu carrito está vacío</h4>
              <p>
                Tu carrito se encuentra vacío, sigue navegando para ver
                productos que te puedan interesar.
              </p>
            </div>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item.sku.itemId + item.color + item.talla}>
                  <div className="content-img">
                    <img
                      src={item.sku.images?.[0]?.imageUrl}
                      alt={item.sku.name}
                    />
                  </div>

                  <div className="info-product">
                    <p className="name-product">{item.sku.name}</p>
                    <span className="details">
                      {" "}
                      <label>Color: </label>
                      {item.color}
                    </span>
                    <span className="details">
                      {" "}
                      <label>Talla: </label>
                      {item.talla}
                    </span>

                    <span className="quantity">
                      <label>Cantidad: </label> {item.quantity}
                    </span>
                    <ProductPrice
                      listPrice={
                        item.sku.sellers?.[0]?.commertialOffer?.ListPrice
                      }
                      price={item.sku.sellers?.[0]?.commertialOffer?.Price}
                    />
                  </div>
                  <button
                    className="delete-product"
                    onClick={() => removeFromCart(item)}
                  ></button>
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
              {totalDiscount > 0 && (
                <p className="discount-total">
                  <span>Ahorras:</span>
                  <span className="discount-amount">
                    -${totalDiscount.toLocaleString()}
                  </span>
                </p>
              )}
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
