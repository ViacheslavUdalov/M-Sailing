import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountServiceService} from "../account-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  loginForm!: FormGroup;
  returnUrl: string = '';
  error: string = ''
  constructor(private accountService: AccountServiceService, private router: Router,
              private activatedRoute: ActivatedRoute, private toastr: ToastrService) {
  }
  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
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
      this.router.navigateByUrl(this.returnUrl);
      this.toastr.success('Вы успешно вошли в аккаунт!')
    }, error => {
      console.log(error);
      this.error = 'Неверный логин или пароль.'
      this.toastr.error('Неверный логин или пароль.')
    })
  }
}
