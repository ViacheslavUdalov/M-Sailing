import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AccountServiceService} from "../core/account/account-service.service";
import {map} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  constructor(private accountService: AccountServiceService, private toastr: ToastrService) {
  }

  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(user => {
        console.log('guard User =>')
        console.log(user)
        if (user?.roles.includes("Admin")) {
          return true;
        }
        this.toastr.error("Нет доступа.")
        return false;
      })
    )
  }
}
