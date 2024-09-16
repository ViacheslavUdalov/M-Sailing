import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Equipment} from "../../models/equipment";
import {animations} from "../../helpers/animations";
import {ActivatedRoute, Router} from "@angular/router";
import {ShopParams} from "../../models/shopParams";
import {ShopService} from "../shop.service";
import { Meta, Title } from '@angular/platform-browser';
import {BreadcrumbService} from "xng-breadcrumb";
import {BcServicePrivateService} from "../../shared/bc-service-private.service";

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.less'],
  animations: [animations]
})

export class EquipmentComponent implements OnInit {

  @ViewChild('search', {static: false}) searchTerm!: ElementRef
  equipment: Equipment[] = []
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
      value: 'неопрен',
      name: 'Неопрен'
    },
    {
      value: 'спасательный.жилет',
      name: 'Спасательный жилет'
    },
    {
      value: 'летнее',
      name: 'Летнее'
    },
    {
      value: 'откреночные.шорты',
      name: 'Откреночные шорты'
    },
    {
      value: 'шорты',
      name: 'Шорты'
    },
    {
      value: 'непромокаемая.одежда',
      name: 'Непромокаемая одежда'
    },
    {
      value: 'обувь',
      name: 'Обувь'
    }
  ]
  typesForBuy = [
    {name: 'Все товары', value: ''},
    {name: 'Есть в наличии', value: 'Есть.в.наличии'},
    {name: 'Под заказ', value: 'Под.заказ'}
  ]
  constructor(private shopService: ShopService, private router: Router,
              private route: ActivatedRoute,
              private metaService: Meta, private titleService: Title,
              private bcService: BreadcrumbService,
              private brService: BcServicePrivateService) {
  this.bcService.set('@productDetails', '')
    this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit() {
    // this.bcService.set('@equip', `Экипировка/${this.shopParams.type.replace(/\./g, ' ')}`)
    this.titleService.setTitle('M-sailing | Магазин парусной экипировки и вооружения');
    this.metaService.addTags([
      { name: 'description', content: 'Интернет-магазин парусной экипировки и одежды для яхтинга. Лучшие бренды, отличные цены.' },
      { name: 'keywords', content: 'парусная экипировка, парусная одежда, одежда для яхтинга, купить экипировку для яхт, купить парусную одежду, гидрокостюм, гидрокостюм купить' },
      { name: 'robots', content: 'index, follow' }
    ]);
    this.route.queryParams.subscribe(params => {
      this.shopParams.type = params['type'] || '';
      this.shopParams.typeForBuy = params["typeForBuy"] || '';
      this.shopParams.sort = params['sort'] || 'name';
      this.shopParams.pageIndex = +params["pageIndex"] || 1;
      this.shopParams.pageSize = +params["pageSize"] || 10;
      this.shopParams.search = params["search"] || '';

      this.bcService.set('@productDetails', `Экипировка ${this.shopParams.type.length > 1 ? ' / ' : ''} ${this.shopParams.type.replace(/\./g, ' ').toUpperCase()}`)
      if (this.searchTerm && this.shopParams.search) {
        this.searchTerm.nativeElement.value = this.shopParams.search;
      }
      this.getEquipment();
    })
  }

  getEquipment() {
    console.log(this.totalCount)
    this.shopService.getEquipment().subscribe(data => {
      console.log(data);
      this.equipment = data.data as Equipment[];
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
      this.getEquipment()
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
    this.bcService.set('@equip', `Экипировка/${this.shopParams.type.replace(/\./g, ' ')}`)
  }
}
