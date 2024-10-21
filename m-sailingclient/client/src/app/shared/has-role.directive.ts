import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {IUser} from "../models/IUser";
import {AccountServiceService} from "../core/account/account-service.service";

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[] = []
  user!: IUser | null

  constructor(private viewContainerRef: ViewContainerRef,
              private templateRef: TemplateRef<any>,
              private accountService: AccountServiceService) {
//   this.accountService.currentUser$.subscribe(user => {
// this.user = user
//     console.log('User =>')
//     console.log(this.user)
//   })
  }

  ngOnInit() {
    this.accountService.currentUser$.subscribe(user => {
      this.user = user;
      console.log('User =>')
    console.log(this.user)
      if (!this.user?.roles || this.user == null) {
        this.viewContainerRef.clear()
        return;
      }
      console.log("directive => ")
      console.log(this.appHasRole)
      console.log(this.user.roles)
      if (this.user.roles.some(r => this.appHasRole[0] = r)) {
        console.log(true)
        this.viewContainerRef.createEmbeddedView(this.templateRef)
      }
    })
  }
}
