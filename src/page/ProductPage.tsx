import React, { useEffect, useState } from "react";
import { getProduct } from "../services/Product";
import { Product, ProductItem } from "../types/Product";
import SkuSelector from "../components/SkuSelector/SkuSelector";
import ProductGallery from "../components/ProductGallery/ProductGallery";
import "./styles.css";
import DiscountBadge from "../components/DiscountBadge";

const ProductPage = () => {
  const [productList, setProductList] = useState<ProductItem[]>([]);
  const [selectedSku, setSelectedSku] = useState<ProductItem | null>(null);
  const [mainImage, setMainImage] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data: Product[] = await getProduct();
        const allItems = data.flatMap((product) => product.items);
        setProductList(allItems);
        if (allItems.length > 0) {
          setSelectedSku(allItems[0]);
          setMainImage(allItems[0].images?.[0]?.imageUrl || "");
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    if (selectedSku?.images?.[0]) {
      setMainImage(selectedSku.images[0].imageUrl);
    }
  }, [selectedSku]);

  if (!selectedSku) return <p>Cargando...</p>;

  const price = selectedSku.sellers?.[0]?.commertialOffer?.Price ?? 0;
  const listPrice = selectedSku.sellers?.[0]?.commertialOffer?.ListPrice ?? 0;
  const brand =
    selectedSku?.sellers?.[0]?.commertialOffer?.ItemMetadataAttachment?.[0]
      ?.BrandName || "";

  const referenceId = selectedSku.referenceId[0].Value;

  console.log(selectedSku.referenceId);

  return (
    <div className="product-page">
      <div className="product-container">
        <ProductGallery
          mainImage={mainImage}
          images={selectedSku.images}
          onSelectImage={(url) => setMainImage(url)}
        />

        <div className="product-info">
          <span className="brand">{brand}</span>
          <h2>{selectedSku.name}</h2>
          <span className="referenceId">Referencia: {referenceId}</span>
          <DiscountBadge price={price} listPrice={listPrice} />
          <p className="price">${price.toLocaleString()}</p>

          <SkuSelector products={productList} onSelectSku={setSelectedSku} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
