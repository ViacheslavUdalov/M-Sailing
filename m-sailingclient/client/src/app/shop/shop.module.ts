import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentComponent } from './equipment/equipment.component';
import { ArmamentComponent } from './armament/armament.component';
import {HttpClientModule} from "@angular/common/http";
import { OneequipmentComponent } from './oneequipment/oneequipment.component';
import { OnearmamentComponent } from './onearmament/onearmament.component';
import {RouterModule} from "@angular/router";
import {HomeModule} from "../home/home.module";
import {CoreModule} from "../core/core.module";
import {SharedModule} from "../shared/shared.module";
import { OneboatComponent } from './oneboat/oneboat.component';
import {BoatsComponent} from "./boats/boats.component";



@NgModule({
  declarations: [
    EquipmentComponent,
    ArmamentComponent,
    OneequipmentComponent,
    OnearmamentComponent,
    OneboatComponent,
    BoatsComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    CoreModule,
    SharedModule,
    HomeModule
  ]
})
export class ShopModule { }
