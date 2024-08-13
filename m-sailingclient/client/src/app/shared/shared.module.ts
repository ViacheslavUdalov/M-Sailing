import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive} from "@angular/router";
import { ScrollAnimationsDirective } from './scroll-animations.directive';
import {SizeTableComponent} from "./size-table/size-table.component";



@NgModule({
    declarations: [
        ScrollAnimationsDirective,
      SizeTableComponent
    ],
    exports: [
        ScrollAnimationsDirective,
      SizeTableComponent
    ],
    imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive,
    ]
})
export class SharedModule { }
