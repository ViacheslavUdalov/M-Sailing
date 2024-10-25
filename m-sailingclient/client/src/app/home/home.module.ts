import { NgModule } from '@angular/core';
import {HomeComponent} from "./home.component";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import { DataproductshelperComponent } from './dataproductshelper/dataproductshelper.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedModule} from "../shared/shared.module";
import {AppModule} from "../app.module";
import {ShopModule} from "../shop/shop.module";
import { SlideshowComponent } from './slideshow/slideshow.component';



@NgModule({
  declarations: [HomeComponent,
    DataproductshelperComponent,
    SlideshowComponent],
  imports: [
    CommonModule,
    RouterLink,
    BrowserAnimationsModule,
    SharedModule
  ],
  exports: [HomeComponent, DataproductshelperComponent]
})
export class HomeModule { }
