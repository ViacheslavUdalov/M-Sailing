import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PrivacyPolicyComponent} from "./privacy-policy/privacy-policy.component";
import {CookieComponent} from "./cookie/cookie.component";
import {TermsOfServiceComponent} from "./terms-of-service/terms-of-service.component";
import {LoginComponent} from "./account/login/login.component";


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'cookie-policy', component: CookieComponent },
  { path: 'terms-of-service', component: TermsOfServiceComponent },
  // { path: '**', component: HomeComponent },

  ]
@NgModule({
  declarations: [],
 imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
