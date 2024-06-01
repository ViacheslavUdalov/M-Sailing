import {Component, OnInit} from '@angular/core';
import {Equipment} from "../../models/equipment";
import {ShopService} from "../shop.service";
import {ActivatedRoute} from "@angular/router";
import {Clothes} from "../../models/Clothes";
import {animations} from "../../helpers/animations";
import { BasketService } from 'src/app/basket/basket.service';
import { ProductToCreateOrder, ProductToCreateOrderWithId } from 'src/app/models/OrdersModels';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-oneclothes',
  templateUrl: './oneclothes.component.html',
  styleUrls: ['./oneclothes.component.less'],
  animations: [animations]
})
export class OneclothesComponent implements OnInit{
  clothes: Clothes | undefined;
  addition: Clothes[] = [];
  id: string = '';
  quantityInBasket: number = 0;
  isProductAddedToCart: boolean = false
  selectedSize: string = '';
  constructor(private shopService: ShopService,
              private activeRouter: ActivatedRoute,
              private basketService: BasketService,
              private metaService: Meta, private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Магазин парусной одежды и экипировки, яхтенного вооружения | M-sailing');
    this.metaService.addTags([
      { name: 'description', content: 'Интернет-магазин парусной экипировки, одежды для яхтинга и парусного спорта. Лучшие бренды, отличные цены.' },
      { name: 'keywords', content: 'парусная одежда, парусная экипировка, одежда для яхтинга, купить одежду для парусной яхты, купить экипировку для парусного спорта' },
      { name: 'robots', content: 'index, follow' }
    ]);
    this.activeRouter.paramMap.subscribe(params => {
      this.id = params.get('id') as string;
      this.getOneProduct();
    })
    this.getEquipForHome();
  }
  onSizeChange(selectedSize: string) {
    this.selectedSize = selectedSize;
    console.log('Selected size:', selectedSize);
  }
  getOneProduct() {
    this.shopService.getOneClothes(Number(this.id)).subscribe(data => {
      this.clothes = data;
      this.selectedSize = data.size[0];
    })
  }
  getEquipForHome() {
    this.shopService.getClothes().subscribe(data => {
      this.addition = data.data.slice(0, 4) as Clothes[];
    })
  }
  addItem(product : Clothes) {
    let productForOrder : ProductToCreateOrderWithId = {
      id : product.id,
      name : product.name,
      price : product.price,
      pictures : product.pictures,
      quantity: 1,
      size: this.selectedSize
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
