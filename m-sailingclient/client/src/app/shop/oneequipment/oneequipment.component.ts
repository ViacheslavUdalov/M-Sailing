import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Equipment} from "../../models/equipment";
import {animations} from "../../helpers/animations";
import { ShopService } from '../shop.service';
import { ProductToCreateOrder } from 'src/app/models/OrdersModels';
import { BasketService } from 'src/app/basket/basket.service';
import {Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-oneequipment',
  templateUrl: './oneequipment.component.html',
  styleUrls: ['./oneequipment.component.less'],
  animations: [animations]
})
export class OneequipmentComponent implements OnInit{
  equipment: Equipment | undefined;
  addition: Equipment[] = [];
  id: string = '';
  quantityInBasket: number = 0;
  isProductAddedToCart: boolean = false
  constructor(private shopService: ShopService,
              private activeRouter: ActivatedRoute,
              private basketService: BasketService,
              private metaService: Meta, private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Магазин парусной экипировки и вооружения | M-sailing');
    this.metaService.addTags([
      { name: 'description', content: 'Интернет-магазин парусной экипировки и одежды для яхтинга. Лучшие бренды, отличные цены.' },
      { name: 'keywords', content: 'парусные ботинки, откренки, откреночные шорты, купить откреночные шорты, купить парусную куртку, ' +
          'купить неопреновую кофту' },
      { name: 'robots', content: 'index, follow' }
    ]);
    this.activeRouter.paramMap.subscribe(params => {
      this.id = params.get('id') as string;
      this.getOneProduct();
    })
    this.getEquipForHome();
  }
  getOneProduct() {
    this.shopService.getOneEquipment(this.id).subscribe(data => {
      this.equipment = data;
    })
  }
  getEquipForHome() {
    this.shopService.getCovers().subscribe(data => {
      this.addition = data.data.slice(0, 4) as Equipment[];
    })
  }
  addItem(product : Equipment) {
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
  checkoutQuantity(id: string) {
    this.quantityInBasket = this.basketService.getQuantityOfProduct(id);
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
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
