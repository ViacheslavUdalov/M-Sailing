// src/app/models/order.ts
export interface ProductToCreateOrder {
  id: string
  name: string;
  price: number;
  size?: string;
  color?: string;
  pictures: string;
  quantity: number;
}

export interface CreateOrderData {
  id: string
  phoneNumber: string;
  address: Address;
  nameOfGetter: string;
  products: ProductToCreateOrder[];
  totalPrice?: number;
}
interface Address  {
  region: string;
  city: string;
  street: string;
  house: number;
  corpus: string;
}
export interface CartItem {
  product: ProductToCreateOrder;
  quantity: number
}
