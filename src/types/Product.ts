export interface ProductItem {
  id: string;
  name: string;
  price: number;
  itemId: string;
  images: {
    imageId: string;
    imageLabel: string;
    imageTag: string;
    imageUrl: string;
    imageText: string;
    imageLastModified: string;
  }[];
  Color?: string[];
  Talla?: string[];
  sellers: {
    sellerId: string;
    sellerName: string;
    addToCartLink: string;
    sellerDefault: boolean;
    commertialOffer: {
      Price: number;
      ListPrice: number;
      PriceWithoutDiscount: number;
      FullSellingPrice: number;
      IsAvailable: boolean;
      AvailableQuantity: number;
      GetInfoErrorMessage?: string;
      ItemMetadataAttachment: [
        {
          BrandName: string;
        }
      ];
    };
  }[];
  referenceId: [
    {
      Key: string;
      Value: string;
    }
  ];
}

export interface Product {
  id: string;
  items: ProductItem[];
  brand: string;
  CARACTERÍSTICAS: string[]
  COMPOSICIÓN: string[]
  categories: string[]
  description:string

  
}
