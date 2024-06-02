import {Component, HostListener, OnInit} from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-forsmall',
  templateUrl: './forsmall.component.html',
  styleUrls: ['./forsmall.component.less']
})
export class ForsmallComponent implements OnInit {
isOpen: boolean = false;
  ItemsLength: number = 0;

  constructor(private basketService: BasketService) {
  }

  ngOnInit(): void {
    this.basketService.getCartItems().subscribe((data) => {
      this.ItemsLength = data.length;
    })
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
  setIsOpenByClickOutside(event: MouseEvent): void {
      this.isOpen = false;

  }
}
