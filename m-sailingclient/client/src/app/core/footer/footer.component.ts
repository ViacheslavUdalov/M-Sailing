import {Component, OnInit} from '@angular/core';
import {AccountServiceService} from "../account/account-service.service";
import {ToastrService} from "ngx-toastr";
import {IUser} from "../../models/IUser";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit{
  user!: IUser | null;
constructor(private accountService: AccountServiceService, private toastr: ToastrService) {
}
  ngOnInit(): void {
  this.loadCurrUser();
  }
logout() {
this.accountService.logout();
this.toastr.success('Вы вышли из аккаунта!')
}
loadCurrUser() {
  this.accountService.currentUser$.subscribe(user => {
    this.user = user
  })
}

}
