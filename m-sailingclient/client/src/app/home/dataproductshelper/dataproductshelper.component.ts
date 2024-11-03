import {Component, Input, OnInit} from '@angular/core';
import {ShopService} from "../../shop/shop.service";

@Component({
  selector: 'app-dataproductshelper',
  templateUrl: './dataproductshelper.component.html',
  styleUrls: ['./dataproductshelper.component.less']
})
export class DataproductshelperComponent{
@Input() data: any[] = [];
@Input() title: string = ''
  constructor(private shopService: ShopService) {
  }
  getPriceInLocalCurrency(priceInEuro: number) {
    return this.shopService.convertToLocalCurrency(priceInEuro);
  }
}
