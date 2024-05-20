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
  {path: '**', redirectTo: 'not-found', pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
