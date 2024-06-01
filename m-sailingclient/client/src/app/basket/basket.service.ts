import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {CartItem, ProductToCreateOrder, ProductToCreateOrderWithId } from '../models/OrdersModels';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.cartItems);
constructor() {
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
  increaseQuantity(productId: number) {
    const index = this.cartItems.findIndex(item => item.product.id === productId);
    if (index !== -1) {
      this.cartItems[index].quantity += 1;
      this.cartItemsSubject.next(this.cartItems);
      this.saveCartToLocalStorage();
    }
  }

  decreaseQuantity(productId: number) {
    const index = this.cartItems.findIndex(item => item.product.id === productId);
    if (index !== -1 && this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity -= 1;
      this.cartItemsSubject.next(this.cartItems);
      this.saveCartToLocalStorage();
    } else if (index !== -1 && this.cartItems[index].quantity === 1) {
      this.removeFromCart(productId);
    }
  }
  getCartItems() {
    return this.cartItemsSubject.asObservable();
  }
isProductInCart(id : number) {
return   this.cartItems.some(c => c.product.id === id);
}
getQuantityOfProduct(id : number) {
  let products = this.cartItems.find(c => c.product.id == id);
 if (products) {
   console.log(products.quantity)
   return products.quantity
 
 }
 return 0;
}
  addToCart(product: ProductToCreateOrderWithId, quantity: number = 1) {
    const index = this.cartItems.findIndex(item => item.product.id === product.id);
    if (index !== -1) {
      this.cartItems[index].quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
    this.cartItemsSubject.next(this.cartItems);
    this.saveCartToLocalStorage();
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.cartItemsSubject.next(this.cartItems);
    this.saveCartToLocalStorage();
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
    this.saveCartToLocalStorage();
  }
}
