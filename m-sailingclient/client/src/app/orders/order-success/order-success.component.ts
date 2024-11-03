import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreateOrderData } from 'src/app/models/OrdersModels';
import {ShopService} from "../../shop/shop.service";

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.less']
})
export class OrderSuccessComponent {
  orderData: CreateOrderData | null = null;

  constructor(private route: ActivatedRoute,
               private shopService: ShopService) {}

  ngOnInit(): void {
    this.orderData = history.state.data;
  }
  getPriceInLocalCurrency(priceInEuro: number) {
    return this.shopService.convertToLocalCurrency(priceInEuro);
  }
}
