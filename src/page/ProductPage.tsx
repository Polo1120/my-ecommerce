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
import ProductDetailsAccordion from "../components/ProductDetailsAccordion/ProductDetailsAccordion";
import ProductDescription from "../components/ProductDescription/ProductDescription";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import { useParams } from "react-router-dom";
import TopProgressBar from "../components/Loaders/TopProgressBar";
import Loader from "../components/Loaders/Loader";

const ProductPage = () => {
  const { itemId } = useParams();
  const [productData, setProductData] = useState<Product[]>([]);
  const [showErrors, setShowErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const productList = useMemo(
    () => productData.flatMap((product) => product.items),
    [productData]
  );

  const selectedProduct = useMemo(() => {
    return productData.find((product) =>
      product.items.some((item) => item.itemId === sku?.itemId)
    );
  }, [sku, productData]);

  const price = useMemo(
    () => sku?.sellers?.[0]?.commertialOffer?.Price ?? 0,
    [sku]
  );
  const listPrice = useMemo(
    () => sku?.sellers?.[0]?.commertialOffer?.ListPrice ?? 0,
    [sku]
  );

  const referenceId = sku?.referenceId?.[0]?.Value ?? "";
  const productBrand = selectedProduct?.brand ?? "";
  const productFeatures = selectedProduct?.CARACTERÍSTICAS?.[0] ?? "";
  const productComposition = selectedProduct?.COMPOSICIÓN?.[0] ?? "";
  const description = selectedProduct?.description ?? "";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        window.scrollTo(0, 0);

        const data: Product[] = await getProduct();
        setProductData(data);

        const allItems = data.flatMap((p) => p.items);
        let selectedSku = allItems[0];

        if (itemId) {
          const found = allItems.find((item) => item.itemId === itemId);
          if (found) selectedSku = found;
        }

        setSelectedProductState({
          sku: selectedSku,
          color: "",
          talla: "",
          image: selectedSku.images?.[0]?.imageUrl || "",
          quantity: 1,
        });
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [itemId]);

  useEffect(() => {
    if (sku?.images?.[0]) {
      setSelectedProductState((prev) => ({
        ...prev,
        image: sku.images[0].imageUrl,
      }));
    }
  }, [sku]);

  if (!sku) return <Loader />;

  const cleanSlashes = (path: string): string => {
    return path.replace(/^\/+|\/+$/g, "");
  };

  return (
    <div className="product-page">
      <TopProgressBar isLoading={isLoading} />

      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          {
            label: `${cleanSlashes(selectedProduct?.categories?.[0] || "")}`,
          },
        ]}
      />

      <div className="product-container">
        <ProductGallery
          mainImage={image}
          images={sku.images}
          onSelectImage={(url) =>
            setSelectedProductState((prev) => ({ ...prev, image: url }))
          }
        />

        <div className="product-info">
          <span className="brand">{productBrand}</span>
          <h3 className="name-product">{sku.name}</h3>
          <span className="referenceId">Referencia: {referenceId}</span>

          <div className="content-price-discount">
            <ProductPrice listPrice={listPrice} price={price} />
            <DiscountBadge price={price} listPrice={listPrice} />
          </div>

          <ProductDescription description={description} maxLines={2} />

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
              setSelectedProductState((prev) => ({
                ...prev,
                quantity: value,
              }))
            }
          />

          <AddToCartButton
            sku={sku}
            quantity={quantity}
            selectedColor={color}
            selectedTalla={talla}
            onValidationFail={() => setShowErrors(true)}
          />

          <ProductDetailsAccordion
            sections={[
              {
                title: "Características",
                content: productFeatures,
              },
              {
                title: "Composición",
                content: productComposition,
              },
            ]}
          />
        </div>
      </div>

      <ProductShelf />
    </div>
  );
};

export default ProductPage;
