import {CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { ForsmallComponent } from './forsmall/forsmall.component';
import { ForfullComponent } from './forfull/forfull.component';
import {RouterLink, RouterLinkActive, RouterModule} from "@angular/router";
import { FooterComponent } from './footer/footer.component';
import { PaginationComponent } from './pagination/pagination.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TopBarFilterComponent } from './top-bar-filter/top-bar-filter.component';
import { LoginComponent } from './account/login/login.component';
import {PrivacyPolicyComponent} from "./privacy-policy/privacy-policy.component";
import {TermsOfServiceComponent} from "./terms-of-service/terms-of-service.component";
import { CookieComponent } from './cookie/cookie.component';
import { CoreRoutingModule } from './core-routing.module';
import {ToastrModule} from "ngx-toastr";



@NgModule({
  declarations: [
    NavbarComponent,
    ForsmallComponent,
    ForfullComponent,
    FooterComponent,
    PaginationComponent,
    TopBarFilterComponent,
    LoginComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
    CookieComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterModule,
    FormsModule,
    CoreRoutingModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    NavbarComponent,
    FooterComponent,
    PaginationComponent,
    TopBarFilterComponent,
    FormsModule,
  ]
})
export class CoreModule { }
