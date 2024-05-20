import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { IPagination } from 'src/app/models/IPagination';
import { ShopParams } from 'src/app/models/shopParams';
import { ShopService } from 'src/app/shop/shop.service';

@Component({
  selector: 'app-top-bar-filter',
  templateUrl: './top-bar-filter.component.html',
  styleUrls: ['./top-bar-filter.component.less']
})
export class TopBarFilterComponent {
  @ViewChild('search', {static: false}) searchTerm!: ElementRef;
  @Output() getProducts = new EventEmitter<boolean>();
  @Input() shopParams : ShopParams = new ShopParams();
  @Input() types : any[] = [];
  @Input() options : any[] = []
  @Input() typesForBuy : any[] = [];

  constructor(private shopService: ShopService, private router: Router, private route: ActivatedRoute) {
  }
  onTypeSelected(event: Event) {
    const selected = (event.target as HTMLSelectElement).value;
    const params = this.shopService.getShopParams();
    params.type = selected;
    params.pageIndex = 1;
    this.shopService.setShopParams(params);
    this.updateUrl(params);
    this.getProducts.emit();
  }
  onTypeForBuySelected(event: Event) {
    const selected = (event.target as HTMLSelectElement).value;
    const params = this.shopService.getShopParams();
    params.typeForBuy = selected;;
    params.pageIndex = 1;
    this.shopService.setShopParams(params);
    this.updateUrl(params);
    this.getProducts.emit();
  }

  onSortedSelected(event: Event) {
    const selected = (event.target as HTMLSelectElement).value;
    const params = this.shopService.getShopParams();
    params.sort = selected;
    params.pageIndex = 1;
    this.shopService.setShopParams(params);
    this.updateUrl(params);
    this.getProducts.emit();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    const params = new ShopParams();
    this.shopService.setShopParams(params);
    console.log(params)
    this.updateUrl(params);
    this.getProducts.emit()
  }

  onSearch() {
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value.trim();
    params.pageIndex = 1;
    this.shopService.setShopParams(params);
    this.updateUrl(params);
    this.getProducts.emit();
  }
  updateUrl(params: ShopParams) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        type: params.type,
        typeForBuy: params.typeForBuy,
        sort: params.sort,
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        search: params.search
      },
      queryParamsHandling: 'merge',
      replaceUrl: true
    })
  }
}
