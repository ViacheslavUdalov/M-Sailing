import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {EquipmentComponent} from "../shop/equipment/equipment.component";
import {OneequipmentComponent} from "../shop/oneequipment/oneequipment.component";
import {CoversComponent} from "../shop/covers/covers.component";
import {OnecoverComponent} from "../shop/onecover/onecover.component";
import {ArmamentComponent} from "../shop/armament/armament.component";
import {OnearmamentComponent} from "../shop/onearmament/onearmament.component";
import {BoatsComponent} from "../shop/boats/boats.component";
import {OneboatComponent} from "../shop/oneboat/oneboat.component";
import {CreateOrderComponent} from "../orders/create-order/create-order.component";
import {BasketComponent} from "../basket/basket/basket.component";
import {OrderSuccessComponent} from "../orders/order-success/order-success.component";
import {PrivacyPolicyComponent} from "./privacy-policy/privacy-policy.component";
import {CookieComponent} from "./cookie/cookie.component";
import {TermsOfServiceComponent} from "./terms-of-service/terms-of-service.component";
import {LoginComponent} from "./account/login/login.component";


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'cookie-policy', component: CookieComponent },
  { path: 'terms-of-service', component: TermsOfServiceComponent },

  ]
@NgModule({
  declarations: [],
 imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
