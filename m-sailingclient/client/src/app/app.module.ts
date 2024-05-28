import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoadingInterceptor} from "./interceptor/loadingInterceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgxSpinnerModule} from "ngx-spinner";
import {HomeModule} from "./home/home.module";
import {SharedModule} from "./shared/shared.module";
import {ShopModule} from "./shop/shop.module";
import {CoreModule} from "./core/core.module";
import { CreateOrderComponent } from './orders/create-order/create-order.component';
import { BasketComponent } from './basket/basket/basket.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderSuccessComponent } from './orders/order-success/order-success.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateOrderComponent,
    BasketComponent,
    OrderSuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ShopModule,
    SharedModule,
    HomeModule,
    HttpClientModule,
    NgxSpinnerModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
