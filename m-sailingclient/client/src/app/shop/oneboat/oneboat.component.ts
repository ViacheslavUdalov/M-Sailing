import {Component, OnInit} from '@angular/core';
import {Equipment} from "../../models/equipment";
import {ShopService} from "../shop.service";
import {ActivatedRoute} from "@angular/router";
import {Boat} from "../../models/boat";
import { animations } from 'src/app/helpers/animations';
import { BasketService } from 'src/app/basket/basket.service';
import { ProductToCreateOrder, ProductToCreateOrderWithId } from 'src/app/models/OrdersModels';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-oneboat',
  templateUrl: './oneboat.component.html',
  styleUrls: ['./oneboat.component.less'],
  animations: [animations]
})
export class OneboatComponent implements OnInit{
  boat: Boat | undefined;
  additional: Boat[] = [];
  id: string = '';
  quantityInBasket: number = 0;
  isProductAddedToCart: boolean = false
  constructor(private shopService: ShopService,
              private activeRouter: ActivatedRoute,
              private basketService: BasketService,
              private metaService: Meta, private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('M-sailing | Магазин парусных яхт и парусного вооружения');
    this.metaService.addTags([
      { name: 'description', content: 'Интернет-магазин парусной экипировки, парусных яхт и одежды для яхтинга. Лучшие бренды, отличные цены.' },
      { name: 'keywords', content: 'парусная яхта, парусная лодка, яхты, купить яхту, Ilca, Ilca 7, Ilca 6, Ilca 4, laser, Laser' },
      { name: 'robots', content: 'index, follow' }
    ]);
    this.activeRouter.paramMap.subscribe(params => {
      this.id = params.get('id') as string;
      this.getOneProduct();
    })
    this.getEquipForHome();
  }
  getOneProduct() {
    this.shopService.getOneboat(Number(this.id)).subscribe(data => {
      this.boat = data;
    })
  }
  getEquipForHome() {
    this.shopService.getBoats().subscribe(data => {
      this.additional = data.data.slice(0, 4);
    })
  }
  addItem(product : Boat) {
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
