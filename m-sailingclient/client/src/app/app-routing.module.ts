import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CommonModule} from "@angular/common";
import {OneboatComponent} from "./shop/oneboat/oneboat.component";
import {BoatsComponent} from "./shop/boats/boats.component";
import {OnearmamentComponent} from "./shop/onearmament/onearmament.component";
import {ArmamentComponent} from "./shop/armament/armament.component";
import {OnecoverComponent} from "./shop/onecover/onecover.component";
import {CoversComponent} from "./shop/covers/covers.component";
import {OneclothesComponent} from "./shop/oneclothes/oneclothes.component";
import {ClothesComponent} from "./shop/clothes/clothes.component";
import {OneequipmentComponent} from "./shop/oneequipment/oneequipment.component";
import {EquipmentComponent} from "./shop/equipment/equipment.component";
import {HomeComponent} from "./home/home.component";
import { CreateOrderComponent } from './orders/create-order/create-order.component';
import { BasketComponent } from './basket/basket/basket.component';
import { OrderSuccessComponent } from './orders/order-success/order-success.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'equipment', component: EquipmentComponent},
  {path: 'equipment/:id', component: OneequipmentComponent},
  {path: 'clothes',  component: ClothesComponent},
  {path: 'clothes/:id', component: OneclothesComponent},
  {path: 'covers', component: CoversComponent},
  {path: 'covers/:id', component: OnecoverComponent},
  {path: 'armament', component: ArmamentComponent},
  {path: 'armament/:id', component: OnearmamentComponent},
  {path: 'boats', component: BoatsComponent},
  {path: 'boats/:id', component: OneboatComponent},
  { path: 'create-order', component: CreateOrderComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'order-success', component: OrderSuccessComponent },
  {path: '**', redirectTo: '/', pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
