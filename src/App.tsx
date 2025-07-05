import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./App.css";
import ProductPage from "./page/ProductPage";
import Header from "./components/Header/Header";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <>
      <Header />
      <CartProvider>
        <ProductPage />
      </CartProvider>
    </>
  );
}

export default App;
