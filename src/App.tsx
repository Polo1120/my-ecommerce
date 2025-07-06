import ProductPage from "./page/ProductPage";
import Header from "./components/Header/Header";
import MiniCart from "./components/MiniCart/MiniCart";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/producto/:itemId" element={<ProductPage />} />
      </Routes>
      <MiniCart />
    </>
  );
}

export default App;
