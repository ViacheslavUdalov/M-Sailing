import { Injectable } from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class BusyService {
busyRequestCount = 0;
  constructor(private spinner: NgxSpinnerService) { }
  busy() {
    this.busyRequestCount++;
    this.spinner.show(undefined, {
      type: "line-scale-party",
      size: "large",
      bdColor: "rgba(0,0,0,10)",
      color: "white"
    })
  }
  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.spinner.hide();
    }
  }
}
