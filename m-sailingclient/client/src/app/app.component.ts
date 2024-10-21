import {Component, OnInit} from '@angular/core';
import {AccountServiceService} from "./core/account/account-service.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  title = 'client';

constructor(private accountService: AccountServiceService) {
}
  ngOnInit(): void {
  this.loadUser()
  }
  loadUser() {
  const token = localStorage.getItem('token')
    if (token) {
    this.accountService.loadCurrentUser(token).subscribe((user) => {
      console.log("Loaded User")
      console.log(user)
    }, (error: any) => {
      console.log(error)
    })
  }
}
}
