import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable, of, ReplaySubject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";
import {IUser} from "../../models/IUser";

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {
  baseURL = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser | null>(1);
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
  loadCurrentUser(token: string) : Observable<IUser | null> {
    if (!token) {
      this.currentUserSource.next(null)
      return of(null)
    }
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${token}`)
    return this.http.get<IUser>(this.baseURL + 'account', {headers}).pipe(
      map((user: IUser) => {
        if (user) {
          user.roles = []
          const roles = this.getDecodedToken(user.token)
          console.log("roles => ")
          console.log(roles)
          Array.isArray(roles.role) ? user.roles = roles : user.roles.push(roles);
          localStorage.setItem('token', user.token)
          this.currentUserSource.next(user)
          console.log(this.currentUserSource)
        }
        return user
      })

    )

  }
}
