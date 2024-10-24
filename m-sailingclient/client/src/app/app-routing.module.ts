import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CommonModule} from "@angular/common";
import {OneboatComponent} from "./shop/oneboat/oneboat.component";
import {BoatsComponent} from "./shop/boats/boats.component";
import {OnearmamentComponent} from "./shop/onearmament/onearmament.component";
import {ArmamentComponent} from "./shop/armament/armament.component";
import {OneequipmentComponent} from "./shop/oneequipment/oneequipment.component";
import {EquipmentComponent} from "./shop/equipment/equipment.component";
import {HomeComponent} from "./home/home.component";
import { CreateOrderComponent } from './orders/create-order/create-order.component';
import { BasketComponent } from './basket/basket/basket.component';
import { OrderSuccessComponent } from './orders/order-success/order-success.component';
import {LoginComponent} from "./core/account/login/login.component";
import {PrivacyPolicyComponent} from "./core/privacy-policy/privacy-policy.component";
import {CookieComponent} from "./core/cookie/cookie.component";
import {TermsOfServiceComponent} from "./core/terms-of-service/terms-of-service.component";
import {CreateEquipComponent} from "./core/create-edite-products/create-equip/create-equip.component";
import {AuthAdminGuard} from "./guards/auth-admin.guard";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'equipment', component: EquipmentComponent, data: {breadcrumb: {alias : 'productDetails'}}},
  {path: 'equipment/:id', component: OneequipmentComponent, data: {breadcrumb: {alias : 'productDetails'}}},
 {path: 'armament', component: ArmamentComponent, data: {breadcrumb: {alias : 'productDetails'}}},
  {path: 'armament/:id', component: OnearmamentComponent,data: {breadcrumb: {alias : 'productDetails'}}},
  {path: 'boats', component: BoatsComponent, data: {breadcrumb: {alias : 'productDetails'}}},
  {path: 'boats/:id', component: OneboatComponent, data: {breadcrumb: {alias : 'productDetails'}}},
  { path: 'create-order', component: CreateOrderComponent },
  { path: 'basket', component: BasketComponent, data: {breadcrumb: "Корзина" } },
  { path: 'order-success', component: OrderSuccessComponent },
  { path: 'login', component: LoginComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'cookie-policy', component: CookieComponent },
  { path: 'terms-of-service', component: TermsOfServiceComponent },
  { path: 'create-equipment/:id', canActivate: [AuthAdminGuard], component: CreateEquipComponent },
  { path: 'create-equipment', canActivate: [AuthAdminGuard], component: CreateEquipComponent },
  {path: '**', redirectTo: '/', pathMatch: "full"}
];
@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
