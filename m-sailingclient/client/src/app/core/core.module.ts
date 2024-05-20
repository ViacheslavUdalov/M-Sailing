import {CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { ForsmallComponent } from './forsmall/forsmall.component';
import { ForfullComponent } from './forfull/forfull.component';
import {RouterLink, RouterLinkActive, RouterModule} from "@angular/router";
import { FooterComponent } from './footer/footer.component';
import { PaginationComponent } from './pagination/pagination.component';
import {FormsModule} from "@angular/forms";
import { TopBarFilterComponent } from './top-bar-filter/top-bar-filter.component';



@NgModule({
  declarations: [
    NavbarComponent,
    ForsmallComponent,
    ForfullComponent,
    FooterComponent,
    PaginationComponent,
    TopBarFilterComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [
        NavbarComponent,
        FooterComponent,
        PaginationComponent,
      TopBarFilterComponent,
      FormsModule
    ]
})
export class CoreModule { }
