import {Component, OnInit} from '@angular/core';
import {ShopService} from "../shop.service";
import {ActivatedRoute} from "@angular/router";
import {Cover} from "../../models/cover";
import {animations} from "../../helpers/animations";
import { Armament } from 'src/app/models/armament';
import { ProductToCreateOrder , ProductToCreateOrderWithId} from 'src/app/models/OrdersModels';
import { BasketService } from 'src/app/basket/basket.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-onecover',
  templateUrl: './onecover.component.html',
  styleUrls: ['./onecover.component.less'],
  animations: [animations]
})
export class OnecoverComponent implements OnInit {
  cover: Cover | undefined;
  addition: Cover[] = [];
  id: string = '';
  quantityInBasket: number = 0;
  isProductAddedToCart: boolean = false
  constructor(private shopService: ShopService,
              private activeRouter: ActivatedRoute,
              private basketService: BasketService,
              private metaService: Meta, private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('M-sailing | Магазин парусного и яхтенного вооружения, чехлов для яхт');
    this.metaService.addTags([
      { name: 'description', content: 'Интернет-магазин парусной экипировки, яхтенного вооружения, чехлов для яхт. Лучшие бренды, отличные цены.' },
      { name: 'keywords', content: 'парусное вооружение, чехлы для яхт, яхтенное вооружение, купить чехол для парусной яхты, купить чехол лазера' },
      { name: 'robots', content: 'index, follow' }
    ]);
    this.activeRouter.paramMap.subscribe(params => {
      this.id = params.get('id') as string;
      this.getOneProduct();
    })
    this.getEquipForHome();
  }
  getOneProduct() {
    this.shopService.getOneCovers(Number(this.id)).subscribe(data => {
      this.cover = data;

    })
  }
  getEquipForHome() {
    this.shopService.getCovers().subscribe(data => {
      this.addition = data.data.slice(0, 4) as Cover[];
    })
  }
  addItem(product : Cover) {
    let productForOrder : ProductToCreateOrderWithId = {
      id : product.id,
      name : product.name,
      price : product.price,
      pictures : product.pictures,
      quantity: 1
    }
    this.basketService.addToCart(productForOrder, productForOrder.quantity);
    this.updateRemoveButtonVisibility(product.id)
    this.checkoutQuantity(product.id)
  }
  checkoutQuantity(id: number) {
    this.quantityInBasket = this.basketService.getQuantityOfProduct(id);
  }
  removeFromCart(productId: number) {
    this.basketService.removeFromCart(productId);
    this.updateRemoveButtonVisibility(productId)
    this.checkoutQuantity(productId)
  }
  clearCart() {
    this.basketService.clearCart()
  }
  updateRemoveButtonVisibility(productId: number) {
    this.isProductAddedToCart = this.basketService.isProductInCart(productId);
  }
  clickToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
