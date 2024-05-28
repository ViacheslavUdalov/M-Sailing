import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-forfull',
  templateUrl: './forfull.component.html',
  styleUrls: ['./forfull.component.less']
})
export class ForfullComponent implements OnInit{
  ItemsLength: number = 0;
constructor(private basketService: BasketService) {
}

  ngOnInit(): void {
      this.basketService.getCartItems().subscribe((data) => {
        this.ItemsLength = data.length;
      })
    }

}
