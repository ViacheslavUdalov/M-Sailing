import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Equipment} from "../../models/equipment";
import {animations} from "../../helpers/animations";
import { ShopService } from '../shop.service';
import { ProductToCreateOrder , ProductToCreateOrderWithId} from 'src/app/models/OrdersModels';
import { BasketService } from 'src/app/basket/basket.service';
import {Meta, Title } from '@angular/platform-browser';
import {DOCUMENT} from "@angular/common";
import {BreadcrumbService} from "xng-breadcrumb";
import {ProductVariant} from "../../models/ProductVariant";
import {ToastrService} from "ngx-toastr";

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
  selectedSize!: ProductVariant;
  constructor(@Inject(DOCUMENT) private document: Document,
              private shopService: ShopService,
              private activeRouter: ActivatedRoute,
              private basketService: BasketService,
              private metaService: Meta, private titleService: Title,
              private bcService: BreadcrumbService,
              private toastr: ToastrService) {
  this.bcService.set('@productDetails', '')
  }

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    this.activeRouter.paramMap.subscribe(params => {
      this.id = params.get('id') as string;
      this.getOneProduct();
      console.log(   this.equipment )
    })
    this.addJsonLd();

  }
  addJsonLd(): void {
    const jsonLd = {
      "@context": "https://schema.org/",
      "@type": "Equipment",
      "name": this.equipment?.name,
      "image": this.equipment?.pictures,
      "description": this.equipment?.description,
      "offers": {
        "@type": "Offer",
        "url": window.location.href,
        "priceCurrency": "RUB",
        "price": this.equipment?.price,
        "priceValidUntil": "2024-12-31",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock"
      }
    };

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    this.document.head.appendChild(script);
  }
  getOneProduct() {
    this.shopService.getOneEquipment(Number(this.id)).subscribe(data => {
      this.quantityInBasket = this.basketService.getQuantityOfProduct(Number(this.id))
      this.equipment = data;
      // const breadcrumb = [
      //   {label : "Экипировка", url: '/equipment'},
      //   {label: this.equipment.name, url: ''}
      // ]
      // this.bcService.set('@equip', `Экипировка/${this.equipment.type.replace(/\./g, ' ')}`)
      this.activeRouter.queryParams.subscribe(params => {

        let type = (`${params['type']}`).replace(/\./g, ' ').toUpperCase() || '';
        console.log(type.length)
        if (type === "UNDEFINED") {
          type = '';
        }

        // const parentRoute = this.activeRouter.snapshot.url[0].path;

        this.bcService.set('@productDetails', (`Экипировка / ${type}${type.length > 0  ? ' / ' :  ''}${this.equipment?.name}`).toUpperCase());
        // this.bcService.set('@productDetails', `${parentRoute}/${this.equipment?.name}`)

      })
      // this.selectedSize = data.size[0];
      this.titleService.setTitle(`M-sailing | Купить ${this.equipment.name}`);
      this.metaService.addTags([
        { name: 'description', content: `Интернет-магазин парусной экипировки и одежды для яхтинга. ${this.equipment.name}.` },
        { name: 'keywords', content: `${this.equipment.name.toLowerCase()}, купить ${this.equipment.name.toLowerCase()}, гидрокостюм, купить гидрокостюм` },
        { name: 'robots', content: 'index, follow' }
      ]);
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
      size: this.selectedSize.size
    }
    console.log(productForOrder)
    if (this.selectedSize) {
      this.updateRemoveButtonVisibility(Number(product.id), this.selectedSize)
    } else {
      this.toastr.error("Не удалось добавить в корзину")
      return
    }
    this.basketService.addToCart(productForOrder, productForOrder.quantity);
    this.checkoutQuantity(Number(product.id))
    this.toastr.success("Товар добавлен в корзину!")
  }
  onSizeChange(selectedSize: ProductVariant) {
    this.selectedSize = selectedSize;
    console.log('Selected size:', selectedSize);
  }
  checkoutQuantity(id: number) {
    this.quantityInBasket = this.basketService.getQuantityOfProduct(id);
      if (this.quantityInBasket === this.selectedSize?.quantity) {
      }
  }
  isLastVariant(variant: ProductVariant) {
    if (!this.equipment || !this.equipment.productVariants) {
      return false; // Если нет данных, возвращаем false
    }
    return this.equipment?.productVariants.indexOf(variant) === this.equipment?.productVariants?.length - 1
  }
  removeFromCart(productId: number) {
    if (this.selectedSize) {
      this.updateRemoveButtonVisibility(productId, this.selectedSize )
    } else {
      this.toastr.error("Не удалось удалить из корзины")
      return
    }
    this.basketService.removeFromCart(productId, this.selectedSize.size);
    this.checkoutQuantity(productId)
    this.toastr.success("Товар удалён из корзины!")
  }
  clearCart() {
    this.basketService.clearCart()
  }
  updateRemoveButtonVisibility(productId: number, variant: ProductVariant) {
    this.isProductAddedToCart = this.basketService.isProductInCart(productId, variant);
  }
  clickToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
