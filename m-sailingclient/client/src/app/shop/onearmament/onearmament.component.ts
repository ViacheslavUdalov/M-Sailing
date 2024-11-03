import {Component, Inject, OnInit} from '@angular/core';
import {ShopService} from "../shop.service";
import {ActivatedRoute} from "@angular/router";
import {Armament} from "../../models/armament";
import {animations} from "../../helpers/animations";
import { BasketService } from 'src/app/basket/basket.service';
import { ProductToCreateOrder } from 'src/app/models/OrdersModels';
import { Meta, Title } from '@angular/platform-browser';
import {BreadcrumbService} from "xng-breadcrumb";
import {ToastrService} from "ngx-toastr";
import {DOCUMENT} from "@angular/common";

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
              @Inject(DOCUMENT) private document: Document,
              private activeRouter: ActivatedRoute,
              private basketService: BasketService,
              private metaService: Meta, private titleService: Title,
              private bcService: BreadcrumbService,
              private toastr: ToastrService) {
    this.bcService.set('@productDetails', '')
  }

  ngOnInit(): void {
    this.titleService.setTitle('M-sailing | Магазин парусных яхт, парусного и яхтенного вооружения');
    this.metaService.addTags([
      { name: 'description', content: 'Интернет-магазин парусной экипировки, парусных яхт, одежды и вооружения для яхтинга. Лучшие бренды, отличные цены.' },
      { name: 'keywords', content: 'гик-оттяжка для лазера, верёвки, блочки, руль, рангоут, купить рангоут для лазера, купить вооружение для лазера, купить гик-оттяжку дёшево, Optimist, Optiparts' },
      { name: 'robots', content: 'index, follow' }
    ]);
    this.activeRouter.paramMap.subscribe(params => {
      this.id = params.get('id') as string;
      this.getOneProduct();
    })
    this.getArmamentForHome();
this.addJsonLd()

  }
  getOneProduct() {
    this.shopService.getOneArmament(Number(this.id)).subscribe(data => {
      this.quantityInBasket = this.basketService.getQuantityOfProduct(Number(this.id))
      this.armament = data;
      this.activeRouter.queryParams.subscribe(params => {
        console.log("OneArmament")
        console.log(this.quantityInBasket)
        console.log(this.armament?.quantity)
        let type = (`${params['type']}`).replace(/\./g, ' ').toUpperCase();
        console.log(type)
        // const parentRoute = this.activeRouter.snapshot.url[0].path;
        if (type === "UNDEFINED") {
          type = '';
        }
        this.bcService.set('@productDetails', (`Вооружение / ${type}${type.length > 0 ? ' / ' :  ''}${this.armament?.name}`).toUpperCase());
        // this.bcService.set('@productDetails', `${parentRoute}/${this.equipment?.name}`)

      })
      this.updateRemoveButtonVisibility(this.armament.id)
      this.checkoutQuantity(this.armament.id)
      this.titleService.setTitle(`M-sailing | Купить ${this.armament.name}`);
      this.metaService.addTags([
        { name: 'description', content: `Интернет-магазин парусной экипировки и вооружения. ${this.armament.name}.` },
        { name: 'keywords', content: `${this.armament.name.toLowerCase()}, купить ${this.armament.name.toLowerCase()}` },
        { name: 'robots', content: 'index, follow' }
      ]);
    })
  }
  getPriceInLocalCurrency(priceInEuro: number) {
    return this.shopService.convertToLocalCurrency(priceInEuro);
  }
  addJsonLd(): void {
    const jsonLd = {
      "@context": "https://schema.org/",
      "@type": "Armament",
      "name": this.armament?.name,
      "image": this.armament?.pictures,
      "description": this.armament?.description,
      "offers": {
        "@type": "Offer",
        "url": window.location.href,
        "priceCurrency": "RUB",
        "price": this.armament?.price,
        "priceValidUntil": "2025-12-31",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock"
      }
    };
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    this.document.head.appendChild(script);
  }

  getArmamentForHome() {
    this.shopService.getRandomArmament().subscribe(data => {
      this.additional = data;
    })
  }
  increaseQuantity(productId: number): void {
    console.log(productId)
    this.basketService.increaseQuantity(productId);
    this.checkoutQuantity(Number(productId))
  }

  decreaseQuantity(productId: number): void {
    this.basketService.decreaseQuantity(productId);
    this.checkoutQuantity(Number(productId))
  }
  checkoutQuantity(id: number) {
    this.quantityInBasket = this.basketService.getQuantityOfProduct(id);
  }
  addItem(product : Armament) {
    let productForOrder : ProductToCreateOrder = {
      productId : product.id,
      name : product.name,
      price : product.price,
      pictures : product.pictures,
      quantity: 1,
      type: "Armament"
    }
    this.basketService.addToCart(productForOrder, productForOrder.quantity);
    this.updateRemoveButtonVisibility(product.id)
    this.checkoutQuantity(product.id)
    this.toastr.success("Товар добавлен в корзину")
  }
  removeFromCart(productId: number) {
    this.basketService.removeFromCart(productId);
    this.updateRemoveButtonVisibility(productId)
     this.checkoutQuantity(productId)
    this.toastr.success("Товар удалён из корзины!")
  }
  clearCart() {
    this.basketService.clearCart()
  }
  updateRemoveButtonVisibility(productId: number) {
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
