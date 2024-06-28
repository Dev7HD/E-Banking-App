import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {LoginData, LoginToken} from "../models/models";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    userState = {
        token: '',
        username: '',
        roles: '',
        isAuthenticated: false,
        isAdmin: false
    }

  constructor(private http: HttpClient, private router: Router) { }

    public login(loginData: LoginData){
      let options = {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}
      let params = new HttpParams().set('username', loginData.username).set('password', loginData.password);
      return this.http.post<LoginToken>(`${environment.host}auth/login`,params, options);
    }

    public async loadUserState(token: string){
        this.userState.token = token;
        let jwtDecoded: any = jwtDecode(token);
        this.userState.username = jwtDecoded.sub
        this.userState.roles = jwtDecoded.scope
        this.userState.isAuthenticated = true;
        if(this.userState.roles.includes('ADMIN')){
            this.userState.isAdmin = true;
        }
        window.localStorage.setItem('jwt-token', token);
    }

    public logout(){
        this.userState.isAuthenticated = false;
        this.userState.token = undefined;
        this.userState.username = undefined;
        this.userState.roles = undefined;
        this.userState.isAdmin = undefined;
        window.localStorage.removeItem('jwt-token');
        this.router.navigateByUrl("/login")
    }
}
