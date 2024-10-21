import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountServiceService} from "../account-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {IUser} from "../../../models/IUser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  loginForm!: FormGroup;
  // returnUrl: string = '';
  error: string = ''
  user!: IUser | null;

  constructor(private accountService: AccountServiceService, private router: Router,
              private activatedRoute: ActivatedRoute, private toastr: ToastrService) {
    this.accountService.currentUser$.subscribe(user => {
      this.user = user
      console.log(this.user)
      if (this.user) {
        this.router.navigateByUrl('/')
      }
    })
  }
  ngOnInit() {
    // this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/equipment';
    // console.log(this.returnUrl)
    this.createLoginForm();
  }
  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('', Validators.required)
    });
  }
  onSubmit() {
    this.accountService.login(this.loginForm?.value).subscribe((response) => {
      // console.log(this.returnUrl)
      this.router.navigateByUrl('/');
      this.toastr.success('Вы успешно вошли в аккаунт!')
    }, error => {
      console.log(error);
      this.error = 'Неверный логин или пароль.'
      this.toastr.error('Неверный логин или пароль.')
    })
  }
}
