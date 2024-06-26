import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

    constructor(
        private formBuilder: FormBuilder,
        private loginService: LoginService,
        private router: Router
    ) { }

    password!: string;
    public loginForm: FormGroup;

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            username: this.formBuilder.control('', [Validators.required]),
            password: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
        })
    }

    handleLogin() {
        this.loginService.login(this.loginForm.value).subscribe({
            next: token => {
                this.loginService.loadUserState(token.access_token);
                this.router.navigateByUrl("/dashboard");
            }, error: err => {
                console.error(err);
            }
        })
    }
}
