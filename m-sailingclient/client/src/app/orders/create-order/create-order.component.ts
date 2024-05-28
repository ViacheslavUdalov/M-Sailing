import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import {CartItem, CreateOrderData } from 'src/app/models/OrdersModels';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.less']
})
  export class CreateOrderComponent implements OnInit {
  orderForm: FormGroup;
  cartItems: CartItem[] = [];

  constructor(
    private fb: FormBuilder,
    private cartService: BasketService,
    private orderService: OrdersService,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
      address: this.fb.group({
        region: ['', Validators.required],
        city: ['', Validators.required],
        street: ['', Validators.required],
        house: [null, [Validators.required, Validators.min(1)]],
        corpus: ['']
      }),
      nameOfGetter: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const orderData: CreateOrderData = {
        ...this.orderForm.value,
        products: this.cartItems.map(item => ({
          ...item.product,
          quantity: item.quantity
        })),
        totalPrice: this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
      };

      this.orderService.createOrder(orderData).subscribe(response => {
        console.log('Order created successfully', response);
        this.cartService.clearCart();
        this.router.navigate(['/order-success'], { state: { data: response } });
      });
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.orderForm.get(field);
    return !!(control && control.touched && control.invalid);
  }

  isAddressFieldInvalid(field: string): boolean {
    const control = this.orderForm.get('address.' + field);
    return !!(control && control.touched && control.invalid);
  }
}
