import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-forsmall',
  templateUrl: './forsmall.component.html',
  styleUrls: ['./forsmall.component.less']
})
export class ForsmallComponent {
isOpen: boolean = false;
constructor() {
}
  setIsOpen(event: MouseEvent) {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    event.stopPropagation();
  }
}
