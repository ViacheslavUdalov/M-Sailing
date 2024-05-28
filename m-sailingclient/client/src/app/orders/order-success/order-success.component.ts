import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreateOrderData } from 'src/app/models/OrdersModels';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.less']
})
export class OrderSuccessComponent {
  orderData: CreateOrderData | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.orderData = history.state.data;
  }
}
