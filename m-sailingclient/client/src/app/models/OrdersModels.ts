// src/app/models/order.ts
import {ProductVariant} from "./ProductVariant";

export interface ProductToCreateOrder {
  name: string;
  price: number;
  size?: string;
  pictures: string;
  quantity: number;
}
export interface ProductToCreateOrderWithId {
  id: number
  name: string;
  price: number;
  size?: string;
  pictures: string;
  quantity: number;
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
  product: ProductToCreateOrderWithId;
  quantity: number
}
