import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CommonModule} from "@angular/common";
import {OneboatComponent} from "./shop/oneboat/oneboat.component";
import {BoatsComponent} from "./shop/boats/boats.component";
import {OnearmamentComponent} from "./shop/onearmament/onearmament.component";
import {ArmamentComponent} from "./shop/armament/armament.component";
import {OnecoverComponent} from "./shop/onecover/onecover.component";
import {CoversComponent} from "./shop/covers/covers.component";
import {OneequipmentComponent} from "./shop/oneequipment/oneequipment.component";
import {EquipmentComponent} from "./shop/equipment/equipment.component";
import {HomeComponent} from "./home/home.component";
import { CreateOrderComponent } from './orders/create-order/create-order.component';
import { BasketComponent } from './basket/basket/basket.component';
import { OrderSuccessComponent } from './orders/order-success/order-success.component';
import {TermsOfServiceComponent} from "./core/terms-of-service/terms-of-service.component";
import {PrivacyPolicyComponent} from "./core/privacy-policy/privacy-policy.component";
import {CookieComponent} from "./core/cookie/cookie.component";

// const routes: Routes = [
//   {path: '', component: HomeComponent},
//   {path: 'equipment', component: EquipmentComponent, data: {breadcrumb: "Экипировка"}},
//   {path: 'equipment/:id',
//     component: OneequipmentComponent,
//     resolve: {product: EquipmentResolver},
//     data: {breadcrumb: (data: Equipment) => `${data.name}`}},
//   {path: 'covers', component: CoversComponent, data: {breadcrumb: "Чехлы"}},
//   {path: 'covers/:id', component: OnecoverComponent, resolve: {product: CoversResolver},
//     data: {breadcrumb: (data: Cover) => `${data.name}`}},
//   {path: 'armament', component: ArmamentComponent, data: {breadcrumb: "Вооружение"}},
//   {path: 'armament/:id', component: OnearmamentComponent, resolve: {product: ArmamentResolver},
//     data: {breadcrumb: (data: Armament) => `${data.name}`}},
//   {path: 'boats', component: BoatsComponent, data: {breadcrumb: "Яхты"}},
//   {path: 'boats/:id', component: OneboatComponent, resolve: {product: BoatsResolver},
//     data: {breadcrumb: (data: Boat) => `${data.name}`}},
//   { path: 'create-order', component: CreateOrderComponent },
//   { path: 'basket', component: BasketComponent, data: {breadcrumb: "Корзина" } },
//   { path: 'order-success', component: OrderSuccessComponent },
//   {path: '**', redirectTo: '/', pathMatch: "full"}
// ];
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'equipment', component: EquipmentComponent, data: {breadcrumb: {alias : 'productDetails'}}},
  {path: 'equipment/:id', component: OneequipmentComponent, data: {breadcrumb: {alias : 'productDetails'}}},
  {path: 'covers', component: CoversComponent, data: {breadcrumb: {alias : 'productDetails'}}},
  {path: 'covers/:id', component: OnecoverComponent, data: {breadcrumb: {alias : 'productDetails'}}},
  {path: 'armament', component: ArmamentComponent, data: {breadcrumb: {alias : 'productDetails'}}},
  {path: 'armament/:id', component: OnearmamentComponent,data: {breadcrumb: {alias : 'productDetails'}}},
  {path: 'boats', component: BoatsComponent, data: {breadcrumb: {alias : 'productDetails'}}},
  {path: 'boats/:id', component: OneboatComponent, data: {breadcrumb: {alias : 'productDetails'}}},
  { path: 'create-order', component: CreateOrderComponent },
  { path: 'basket', component: BasketComponent, data: {breadcrumb: "Корзина" } },
  { path: 'order-success', component: OrderSuccessComponent },
  {path: 'core',
    loadChildren: () => import('./core/core.module').then(m => m.CoreModule)},
  {path: 'shop',
  loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)},
  {path: '**', redirectTo: '/', pathMatch: "full"}
];
@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
