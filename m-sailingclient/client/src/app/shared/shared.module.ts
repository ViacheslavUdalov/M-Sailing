import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive} from "@angular/router";
import { ScrollAnimationsDirective } from './scroll-animations.directive';



@NgModule({
    declarations: [
        ScrollAnimationsDirective
    ],
    exports: [
        ScrollAnimationsDirective
    ],
    imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive,
    ]
})
export class SharedModule { }
