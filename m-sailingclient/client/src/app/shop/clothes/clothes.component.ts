import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Cover} from "../../models/cover";
import {ShopService} from "../shop.service";
import {Clothes} from "../../models/Clothes";
import {animations} from "../../helpers/animations";
import {Armament} from "../../models/armament";
import {ActivatedRoute, Router} from "@angular/router";
import { ShopParams } from 'src/app/models/shopParams';

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.less'],
  animations: [animations]
})
export class ClothesComponent implements OnInit{
  @ViewChild('search', {static: false}) searchTerm!: ElementRef
  clothes: Clothes[] = []
  type = ''
  typeForBuy = '';
  shopParams = new ShopParams();
  totalCount = 0;
  pagesCount = 0;
  sortOptions = [
    {name: 'По Алфавиту', value: 'name'},
    {name: 'Сначала дешевле', value: 'priceAsc'},
    {name: 'Сначала дороже', value: 'priceDesc'}
  ]
  types = [
    {
      value: '',
      name: 'Все типы'
    },
    {
      value: 'головные.уборы',
      name: 'Головные уборы'
    },
    {
      value: 'штаны',
      name: 'Штаны'
    },
    {
      value: 'кофты',
      name: 'Кофты'
    }
  ]
  typesForBuy = [
    {name: 'Все товары', value: ''},
    {name: 'Есть в наличии', value: 'Есть.в.наличии'},
    {name: 'Под заказ', value: 'Под.заказ'}
  ]
  constructor(private shopService: ShopService, private router: Router,
              private route: ActivatedRoute) {
    this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.shopParams.type = params['type'] || '';
      this.shopParams.typeForBuy = params["typeForBuy"] || '';
      this.shopParams.sort = params['sort'] || 'name';
      this.shopParams.pageIndex = +params["pageIndex"] || 1;
      this.shopParams.pageSize = +params["pageSize"] || 10;
      this.shopParams.search = params["search"] || '';
      if (this.searchTerm && this.shopParams.search) {
        this.searchTerm.nativeElement.value = this.shopParams.search;
      }
      this.getClothes();
    })
  }

  getClothes() {
    console.log(this.totalCount)
    this.shopService.getClothes().subscribe(data => {
      console.log(data);
      this.clothes = data.data as Clothes[];
      this.totalCount = data.count;
      this.pagesCount = Math.ceil(this.totalCount / Number(this.shopParams.pageSize));
      console.log(this.totalCount)

    })
  }

  changePage(page: number) {
    const params = this.shopService.getShopParams();
    if (params.pageIndex !== page) {
      params.pageIndex = page;
      this.shopService.setShopParams(params);
      this.updataUrl(params);
      this.getClothes()
    }
  }
  updataUrl(params: ShopParams) {
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
