import {animate, style, transition, trigger} from "@angular/animations";

export const animations = trigger('animations', [
  transition(':enter', [
    style({opacity: 0, }),
    animate('1s', style({opacity: 1}))
  ])
])
