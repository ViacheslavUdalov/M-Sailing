import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Cover} from "../../models/cover";
import {ShopService} from "../shop.service";
import {animations} from "../../helpers/animations";
import {Armament} from "../../models/armament";
import {ActivatedRoute, Router} from "@angular/router";
import { ShopParams } from 'src/app/models/shopParams';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-covers',
  templateUrl: './covers.component.html',
  styleUrls: ['./covers.component.less'],
  animations: [animations]
})
export class CoversComponent implements OnInit{
  @ViewChild('search', {static: false}) searchTerm!: ElementRef
  covers: Cover[] = []
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
      value: 'верхний',
      name: 'Верхний'
    },
    {
      value: 'для.пера.и.шверта',
      name: 'Для пера и шверта'
    },
    {
      value: 'нижний',
      name: 'Нижний'
    }
  ]
  typesForBuy = [
    {name: 'Все товары', value: ''},
    {name: 'Есть в наличии', value: 'Есть.в.наличии'},
    {name: 'Под заказ', value: 'Под.заказ'}
  ]
  constructor(private shopService: ShopService, private router: Router,
              private route: ActivatedRoute,
              private metaService: Meta, private titleService: Title) {
    this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit() {
    this.titleService.setTitle('Магазин парусной экипировки и вооружения | M-sailing');
    this.metaService.addTags([
      { name: 'description', content: 'Интернет-магазин парусного и яхтенного вооружения. Лучшие бренды, отличные цены.' },
      { name: 'keywords', content: 'чехлы для яхт, чехол для лазера, купить чехлы для яхт, купить чехол для лазера' },
      { name: 'robots', content: 'index, follow' }
    ]);
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
      this.getCovers();
    })
  }

  getCovers() {
    console.log(this.totalCount)
    this.shopService.getCovers().subscribe(data => {
      console.log(data);
      this.covers = data.data as Cover[];
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
      this.getCovers()
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
