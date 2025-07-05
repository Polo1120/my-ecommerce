import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getProduct } from "../../services/Product";
import { Product, ProductItem } from "../../types/Product";
import { useCart } from "../../context/CartContext";
import { useMiniCart } from "../../context/MiniCartContext";
import "./styles.css";
import ProductPrice from "../ProductPrice/ProductPrice";

const ProductShelf: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const { addToCart } = useCart();
  const { openMiniCart } = useMiniCart();

  useEffect(() => {
    const fetch = async () => {
      try {
        const data: Product[] = await getProduct();
        const allItems = data.flatMap((p) => p.items);
        setProducts(allItems);
      } catch (e) {
        console.error("Error loading products", e);
      }
    };
    fetch();
  }, []);

  const handleAddToCart = (sku: ProductItem) => {
    const color = sku.Color?.[0] ?? "N/A";
    const talla = sku.Talla?.[0] ?? "N/A";
    const quantity = 1;
    addToCart(sku, quantity, color, talla);
    openMiniCart();
  };

  const sliderSettings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="product-shelf">
      <h3>Productos relacionados</h3>
      <Slider {...sliderSettings}>
        {products.map((product) => (
          <div key={product.itemId} className="product-card">
            <img src={product.images?.[0]?.imageUrl} alt={product.name} />
            <h4>{product.name}</h4>
            <ProductPrice
              listPrice={product.sellers?.[0]?.commertialOffer?.ListPrice}
              price={product.sellers?.[0]?.commertialOffer?.Price}
            />
            <button onClick={() => handleAddToCart(product)}>
              Agregar al carrito
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductShelf;
