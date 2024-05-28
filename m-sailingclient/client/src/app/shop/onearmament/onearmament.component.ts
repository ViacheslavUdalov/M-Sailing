import {Component, OnInit} from '@angular/core';
import {Equipment} from "../../models/equipment";
import {ShopService} from "../shop.service";
import {ActivatedRoute} from "@angular/router";
import {Armament} from "../../models/armament";
import {animations} from "../../helpers/animations";
import { BasketService } from 'src/app/basket/basket.service';
import { ProductToCreateOrder } from 'src/app/models/OrdersModels';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-onearmament',
  templateUrl: './onearmament.component.html',
  styleUrls: ['./onearmament.component.less'],
  animations: [animations]
})
export class OnearmamentComponent implements OnInit{
  armament: Armament | undefined;
  additional: Armament[] = [];
  id: string = '';
  isProductAddedToCart: boolean = false;
  quantityInBasket: number = 0;
  constructor(private shopService: ShopService,
              private activeRouter: ActivatedRoute,
              private basketService: BasketService,
              private metaService: Meta, private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Магазин парусных яхт, парусного и яхтенного вооружения | M-sailing');
    this.metaService.addTags([
      { name: 'description', content: 'Интернет-магазин парусной экипировки, парусных яхт, одежды и вооружения для яхтинга. Лучшие бренды, отличные цены.' },
      { name: 'keywords', content: 'гик-оттяжка для лазера, верёвки, блочки, руль, рангоут, купить рангоут для лазера, купить вооружение для лазера, купить гик-оттяжку дёшево' },
      { name: 'robots', content: 'index, follow' }
    ]);
    this.activeRouter.paramMap.subscribe(params => {
      this.id = params.get('id') as string;
      this.getOneProduct();
    })
    this.getArmamentForHome();

  }
  getOneProduct() {
    this.shopService.getOneArmament(this.id).subscribe(data => {
      this.armament = data;
      this.updateRemoveButtonVisibility(this.armament.id)
      this.checkoutQuantity(this.armament.id)
    })
  }
  getArmamentForHome() {
    this.shopService.getRandomArmament().subscribe(data => {
      this.additional = data;
    })
  }
  checkoutQuantity(id: string) {
    this.quantityInBasket = this.basketService.getQuantityOfProduct(id);
  }
  addItem(product : Armament) {
    let productForOrder : ProductToCreateOrder = {
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
  removeFromCart(productId: string) {
    this.basketService.removeFromCart(productId);
    this.updateRemoveButtonVisibility(productId)
     this.checkoutQuantity(productId)
  }
  clearCart() {
    this.basketService.clearCart()
  }
  updateRemoveButtonVisibility(productId: string) {
    this.isProductAddedToCart = this.basketService.isProductInCart(productId);
  }
  clickToTop() {
    this.getArmamentForHome()
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
