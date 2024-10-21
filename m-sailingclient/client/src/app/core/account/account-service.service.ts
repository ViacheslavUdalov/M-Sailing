import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {ReplaySubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";
import {IUser} from "../../models/IUser";

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {
  baseURL = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private  http: HttpClient, private router: Router) { }
  login(values: any) {
    return this.http.post<IUser>(this.baseURL + 'account/login', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
          user.roles = this.getDecodedToken(user.token);
          console.log(this.currentUserSource)
        }
      })
    )
  }
  getDecodedToken(token: string) {
    console.log('GetToken => ')
    console.log(JSON.parse(atob(token.split('.')[1])).role)
    return JSON.parse(atob(token.split('.')[1])).role;
  }
}
