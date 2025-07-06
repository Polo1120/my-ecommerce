import { useEffect, useMemo, useState } from "react";
import { getProduct } from "../services/Product";
import { Product, ProductItem } from "../types/Product";
import SkuSelector from "../components/SkuSelector/SkuSelector";
import ProductGallery from "../components/ProductGallery/ProductGallery";
import DiscountBadge from "../components/DiscountBadge";
import AddToCartButton from "../components/AddToCartButton/AddToCartButton";
import QuantitySelector from "../components/QuantitySelector/QuantitySelector";
import ProductShelf from "../components/ProductShelf/ProductShelf";
import ProductPrice from "../components/ProductPrice/ProductPrice";
import "./styles.css";

const ProductPage = () => {
  const [productList, setProductList] = useState<ProductItem[]>([]);
  const [showErrors, setShowErrors] = useState(false);

  const [selectedProductState, setSelectedProductState] = useState<{
    sku: ProductItem | null;
    color: string;
    talla: string;
    image: string;
    quantity: number;
  }>({
    sku: null,
    color: "",
    talla: "",
    image: "",
    quantity: 1,
  });

  const { sku, color, talla, quantity, image } = selectedProductState;

  const price = useMemo(
    () => sku?.sellers?.[0]?.commertialOffer?.Price ?? 0,
    [sku]
  );
  const listPrice = useMemo(
    () => sku?.sellers?.[0]?.commertialOffer?.ListPrice ?? 0,
    [sku]
  );
  const brand = useMemo(
    () =>
      sku?.sellers?.[0]?.commertialOffer?.ItemMetadataAttachment?.[0]
        ?.BrandName ?? "",
    [sku]
  );
  const referenceId = sku?.referenceId?.[0]?.Value ?? "";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data: Product[] = await getProduct();
        const allItems = data.flatMap((product) => product.items);
        setProductList(allItems);
        if (allItems.length > 0) {
          setSelectedProductState({
            sku: allItems[0],
            color: "",
            talla: "",
            image: allItems[0].images?.[0]?.imageUrl || "",
            quantity: 1,
          });
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    if (sku?.images?.[0]) {
      setSelectedProductState((prev) => ({
        ...prev,
        image: sku.images[0].imageUrl,
      }));
    }
  }, [sku]);

  if (!sku) return <p>Cargando...</p>;

  return (
    <div className="product-page">
      <div className="product-container">
        <ProductGallery
          mainImage={image}
          images={sku.images}
          onSelectImage={(url) =>
            setSelectedProductState((prev) => ({ ...prev, image: url }))
          }
        />

        <div className="product-info">
          <span className="brand">{brand}</span>
          <h3 className="name-product">{sku.name}</h3>
          <span className="referenceId">Referencia: {referenceId}</span>
          <div className="content-price-discount">
            <ProductPrice listPrice={listPrice} price={price} />
            <DiscountBadge price={price} listPrice={listPrice} />
          </div>
          <SkuSelector
            products={productList}
            onSelectSku={(sku) =>
              setSelectedProductState((prev) => ({
                ...prev,
                sku,
                image: sku.images?.[0]?.imageUrl || "",
              }))
            }
            onSelectColorTalla={(color, talla) =>
              setSelectedProductState((prev) => ({ ...prev, color, talla }))
            }
            showErrors={showErrors}
          />

          <QuantitySelector
            quantity={quantity}
            onChange={(value) =>
              setSelectedProductState((prev) => ({ ...prev, quantity: value }))
            }
          />

          <AddToCartButton
            sku={sku}
            quantity={quantity}
            selectedColor={color}
            selectedTalla={talla}
            onValidationFail={() => setShowErrors(true)}
          />
        </div>
      </div>

      <ProductShelf />
    </div>
  );
};

export default ProductPage;
