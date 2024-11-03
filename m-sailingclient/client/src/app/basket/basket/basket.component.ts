import { Component } from '@angular/core';
import { CartItem } from 'src/app/models/OrdersModels';
import { BasketService } from '../basket.service';
import {ShopService} from "../../shop/shop.service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.less']
})
export class BasketComponent {
  cartItems: CartItem[] = [];
totalPrice: number = 0;
  constructor(private cartService: BasketService,
              private shopService: ShopService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      console.log(this.cartItems)
      this.totalPrice = this.cartService.getFullPrice(this.cartItems)
    });
  }
  getPriceInLocalCurrency(priceInEuro: number) {
    return this.shopService.convertToLocalCurrency(priceInEuro);
  }
  increaseQuantity(productId: number,  size?: string): void {
    this.cartService.increaseQuantity(productId, size);
    this.totalPrice = this.cartService.getFullPrice(this.cartItems)
  }

  decreaseQuantity(productId: number, size?: string): void {
    this.cartService.decreaseQuantity(productId, size);
    this.totalPrice = this.cartService.getFullPrice(this.cartItems)
  }
  removeFromCart(productId: number,  size?: string) {
    this.cartService.removeFromCart(productId, size);
    this.totalPrice = this.cartService.getFullPrice(this.cartItems)
  }

  clearCart() {
    this.cartService.clearCart();
    this.totalPrice = 0
  }
}
