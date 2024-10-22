import {ProductVariant} from "./ProductVariant";

export interface Equipment {
  id: number,
  name: string,
  price: number,
  description: string,
  type: string,
  productVariants: ProductVariant[];
  pictures: string,
  typeForBuy: string
}
