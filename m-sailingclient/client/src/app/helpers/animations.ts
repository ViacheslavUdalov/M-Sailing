import {animate, style, transition, trigger} from "@angular/animations";

export const animations = trigger('animations', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateY(200px)'}),
    animate('1s ease-out', style({opacity: 1, transform: 'translateY(0)'}))
  ])
])
