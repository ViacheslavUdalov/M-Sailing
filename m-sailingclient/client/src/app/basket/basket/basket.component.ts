import { Component } from '@angular/core';
import { CartItem } from 'src/app/models/OrdersModels';
import { BasketService } from '../basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.less']
})
export class BasketComponent {
  cartItems: CartItem[] = [];
totalPrice: number = 0;
  constructor(private cartService: BasketService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      console.log(this.cartItems)
      items.map(item => this.totalPrice += item.product.price * item.quantity);
    });
  }
  increaseQuantity(productId: number): void {
    this.cartService.increaseQuantity(productId);
  }

  decreaseQuantity(productId: number, size?: string): void {
    this.cartService.decreaseQuantity(productId, size);
  }
  removeFromCart(productId: number,  size?: string) {
    this.cartService.removeFromCart(productId, size);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
