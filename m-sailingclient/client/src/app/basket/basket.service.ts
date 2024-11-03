import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {CartItem, ProductToCreateOrder } from '../models/OrdersModels';
import {ProductVariant} from "../models/ProductVariant";
import {ShopService} from "../shop/shop.service";

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.cartItems);
constructor(private shopService: ShopService) {
  this.loadCartFromLocalStorage();
}
  private saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
  private loadCartFromLocalStorage() {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
      this.cartItemsSubject.next(this.cartItems);
    }
  }
  increaseQuantity(productId: number, size?: string) {
    const index = this.cartItems.findIndex(item => item.product.productId === productId && item.product.size == size);
    if (index !== -1) {
      this.cartItems[index].quantity += 1;
      this.cartItemsSubject.next(this.cartItems);
      console.log(this.cartItems);
      this.saveCartToLocalStorage();
    }
  }
  getPriceInLocalCurrency(priceInEuro: number) {
    return this.shopService.convertToLocalCurrency(priceInEuro);
  }
updatePrice() {
  this.cartItems.map((item) => {
    item.product.price = this.getPriceInLocalCurrency(item.product.price)
  })
}
  decreaseQuantity(productId: number, size?: string) {
    const index = this.cartItems.findIndex(item => item.product.productId === productId && item.product.size == size);
    if (index !== -1 && this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity -= 1;
      this.cartItemsSubject.next(this.cartItems);
      console.log(this.cartItems)
      this.saveCartToLocalStorage();
    } else if (index !== -1 && this.cartItems[index].quantity === 1) {
      this.removeFromCart(productId, size);
    }
  }
  getFullPrice(cartItems: CartItem[]) {
  return cartItems.reduce((acc, curr) => {
     return acc += curr.product.price * curr.quantity;
    }, 0)
  }
  getCartItems() {
    return this.cartItemsSubject.asObservable();
  }
isProductInCart(id : number, variant?: ProductVariant) {
return   this.cartItems.some(c => c.product.productId === id && c.product.size == variant?.size);
}
getQuantityOfProduct(id : number, size?: string) {
  let products = this.cartItems.find(c => c.product.productId == id && c.product.size == size);
 if (products) {
   console.log(products.quantity)
   return products.quantity
 }
 return 0;
}
getProductFromBasket(id: number, size?: string) {
  return  this.cartItems.find(c => c.product.productId == id && c.product.size == size);
}
  addToCart(product: ProductToCreateOrder, quantity: number = 1) {
    const index = this.cartItems.findIndex(item => item.product.productId === product.productId && item.product.size === product.size);
    if (index !== -1) {
      this.cartItems[index].quantity += quantity;
    } else {
      product.price = this.getPriceInLocalCurrency(product.price)
      console.log(product.price)
      this.cartItems.push({ product, quantity });
    }
    console.log("In Service")
    console.log(this.cartItems)
    this.cartItemsSubject.next(this.cartItems);
    this.saveCartToLocalStorage();
  }

  removeFromCart(productId: number, variant?: string) {
    this.cartItems = this.cartItems.filter(item => item.product.size != variant || item.product.productId !== productId);
    this.cartItemsSubject.next(this.cartItems);
    console.log(this.cartItems)
    this.saveCartToLocalStorage();
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
    this.saveCartToLocalStorage();
  }
}
