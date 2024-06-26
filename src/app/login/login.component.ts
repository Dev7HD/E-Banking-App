import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

    constructor(
        private formBuilder: FormBuilder,
        private loginService: LoginService,
        private router: Router,
        private messageService: MessageService
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
        if (!this.loginForm.value.username || !this.loginForm.value.password) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please provide both username and password.' });
            return;
        }
        this.loginService.login(this.loginForm.value).subscribe({
            next: token => {
                this.loginService.loadUserState(token.access_token).then(() => {
                    this.router.navigateByUrl("/dashboard");
                })

            }, error: err => {
                if (err.status === 401) {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid username or password.' });
                } else {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to authenticate. Please try again later.' });
                }
            }
        })
    }
}
