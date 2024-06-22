import { NgModule } from '@angular/core';
import {HomeComponent} from "./home.component";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import { DataproductshelperComponent } from './dataproductshelper/dataproductshelper.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedModule} from "../shared/shared.module";
import {AppModule} from "../app.module";



@NgModule({
  declarations: [HomeComponent, DataproductshelperComponent],
  imports: [
    CommonModule,
    RouterLink,
    BrowserAnimationsModule,
    SharedModule
  ],
  exports: [HomeComponent, DataproductshelperComponent]
})
export class HomeModule { }
