// src/app/models/order.ts
import {ProductVariant} from "./ProductVariant";

// export interface ProductToCreateOrder {
//   name: string;
//   price: number;
//   size?: string;
//   pictures: string;
//   quantity: number;
//   type: string;
// }
export interface ProductToCreateOrder {
  productId: number
  name: string;
  price: number;
  size?: string;
  pictures: string;
  quantity: number;
  type: string;
}


export interface CreateOrderData {
  id: number
  phoneNumber: string;
  address: Address;
  nameOfGetter: string;
  productToCreateOrder: ProductToCreateOrder[];
  totalPrice?: number;
}
interface Address  {
  region: string;
  city: string;
  street: string;
  house: string;
  corpus: string;
}
export interface CartItem {
  product: ProductToCreateOrder;
  quantity: number
}
