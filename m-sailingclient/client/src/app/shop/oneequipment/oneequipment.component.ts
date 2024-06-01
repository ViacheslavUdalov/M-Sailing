import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Equipment} from "../../models/equipment";
import {animations} from "../../helpers/animations";
import { ShopService } from '../shop.service';
import { ProductToCreateOrder , ProductToCreateOrderWithId} from 'src/app/models/OrdersModels';
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
  isProductAddedToCart: boolean = false;
  selectedSize: string = '';
  constructor(private shopService: ShopService,
              private activeRouter: ActivatedRoute,
              private basketService: BasketService,
              private metaService: Meta, private titleService: Title) {
  }

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
      console.log(   this.equipment )
    })

  }
  getOneProduct() {
    this.shopService.getOneEquipment(Number(this.id)).subscribe(data => {
      this.quantityInBasket = this.basketService.getQuantityOfProduct(Number(this.id))
      this.equipment = data;
      this.selectedSize = data.size[0];
      console.log(   this.equipment )
    })
    this.getEquipForHome();
  }
  getEquipForHome() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    this.shopService.getRandomEquipment().subscribe(data => {
      this.addition = data;
    })
  }
  addItem(product : Equipment) {
    let productForOrder : ProductToCreateOrderWithId = {
      id : product.id,
      name : product.name,
      price : product.price,
      pictures : product.pictures,
      quantity: 1,
      size: this.selectedSize
    }
    console.log(productForOrder)
    this.basketService.addToCart(productForOrder, productForOrder.quantity);
    this.updateRemoveButtonVisibility(Number(product.id))
    this.checkoutQuantity(Number(product.id))
  }
  onSizeChange(selectedSize: string) {
    this.selectedSize = selectedSize;
    console.log('Selected size:', selectedSize);
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
