import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive} from "@angular/router";
import { ScrollAnimationsDirective } from './scroll-animations.directive';
import {SizeTableComponent} from "./size-table/size-table.component";
import {HasRoleDirective} from "./has-role.directive";



@NgModule({
    declarations: [
        ScrollAnimationsDirective,
      SizeTableComponent,
      HasRoleDirective
    ],
    exports: [
        ScrollAnimationsDirective,
      SizeTableComponent,
      HasRoleDirective
    ],
    imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive
    ]
})
export class SharedModule { }
