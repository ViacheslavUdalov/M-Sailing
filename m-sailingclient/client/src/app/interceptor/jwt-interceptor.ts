import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {IUser} from "../models/IUser";
import {Observable, switchMap, take} from "rxjs";
import {AccountServiceService} from "../core/account/account-service.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountServiceService) {
  }

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//
//     return this.accountService.currentUser$.pipe(take(1),
//       switchMap(user => {
//         if (user) {
//           console.log("JWTINTERCEPTOR =========>>>>>>>>")
//           console.log(user)
//           request = request.clone({
//             setHeaders: {
//               Authorization: `Bearer ${user.token}`
//             }
//           });
//         }
//         return next.handle(request);
//       })
//
//     );
//   }
// }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser: any;
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
         currentUser = user
      console.log("INTERCEPTOR ==========>>>>>>>>>")
      console.log(currentUser)
      }
    );
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      })
    }
    return next.handle(request);
  }
}
