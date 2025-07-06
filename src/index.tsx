import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MiniCartProvider } from "./context/MiniCartContext";
import { CartProvider } from "./context/CartContext";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter> 
      <MiniCartProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </MiniCartProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
