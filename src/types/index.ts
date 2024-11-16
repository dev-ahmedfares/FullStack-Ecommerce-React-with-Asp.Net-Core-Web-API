import { isString } from "./guards";

export type TCategory = {
  categoryId: number,
  categoryName: string,
  categoryDescription: string
};
export type TProduct = {
  productId: number;
  productName: string;
  productDescription: string;
  productImages: {productImageId: number, imagePath:string}[];
  price: number;
  stockQuantity: number;
  category:{
    categoryDescription:string;
    categoryName:string;
    categoryId:number
  };
  quantity?: number;
  isLiked?: boolean;
  isAuthenticated?: boolean;
  
  categoryId: number;
  active?:boolean;
  productColors:{colorId:number,colorName:string}[];
  productMaterials:{materialId: number, materialName:string}[];
};

export type OrderItem = {
  img: string;
  price: number;
  productId: number;
  productName: string;
  quantity: number;
};

export type TOrderList = {
  items: OrderItem[] ;
  id: number;
  subtotal: number;
};

export type TLoading = "idle" | "pending" | "succeeded" | "failed";
export { isString };
