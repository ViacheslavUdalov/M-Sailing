import {Component, OnInit} from '@angular/core';
import {ShopService} from "../shop.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-change-currency-value',
  templateUrl: './change-currency-value.component.html',
  styleUrls: ['./change-currency-value.component.less']
})
export class ChangeCurrencyValueComponent implements OnInit{
  currentRate: number = 0;

  constructor(private currencyService: ShopService,
              private toastr: ToastrService) {}

  ngOnInit() {
  this.currencyService.euroRate$.subscribe((rate) => {
    this.currentRate = rate;
  });
  }
  onRateChange(newRate: number) {
    this.currencyService.setNewValueForEuro(newRate).subscribe(() => {
      this.toastr.success("Курс евро обновлён!")
    }, error => {
      this.toastr.error("Не удалось обновить курс евро");
      console.error("Ошибка при обновлении:", error);
    });
  }
}
