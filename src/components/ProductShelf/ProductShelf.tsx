import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getProduct } from "../../services/Product";
import { Product, ProductItem } from "../../types/Product";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import ProductPrice from "../ProductPrice/ProductPrice";
import AddToCartButtonShelf from "./AddToCartButtonShelf";

const ProductShelf: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const navigate = useNavigate();

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

  const handleProductClick = (itemId: string) => {
    navigate(`/producto/${itemId}`);
  };

  return (
    <div className="product-shelf">
      <h3>Productos relacionados</h3>
      <Slider {...sliderSettings}>
        {products.map((product) => (
          <div
            key={product.itemId}
            className="product-card"
            onClick={() => handleProductClick(product.itemId)}
            style={{ cursor: "pointer" }}
          >
            <div className="content-img-shelf">
              <img src={product.images?.[0]?.imageUrl} alt={product.name} />
            </div>

            <h4>{product.name}</h4>
            <ProductPrice
              listPrice={product.sellers?.[0]?.commertialOffer?.ListPrice}
              price={product.sellers?.[0]?.commertialOffer?.Price}
            />
            <AddToCartButtonShelf sku={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductShelf;
