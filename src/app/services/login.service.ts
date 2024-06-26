import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {LoginData, LoginToken} from "../models/models";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    userState = {
        token: '',
        username: '',
        roles: '',
        isAuthenticated: false
    }

  constructor(private http: HttpClient) { }

    public login(loginData: LoginData){
      let options = {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}
      let params = new HttpParams().set('username', loginData.username).set('password', loginData.password);
      return this.http.post<LoginToken>(`${environment.host}auth/login`,params, options);
    }

    public loadUserState(token: string){
        this.userState.token = token;
        let jwtDecoded: any = jwtDecode(token);
        this.userState.username = jwtDecoded.sub
        this.userState.roles = jwtDecoded.scope
        this.userState.isAuthenticated = true;
    }

    public logout(){
        this.userState.isAuthenticated = false;
        this.userState.token = undefined;
        this.userState.username = undefined;
        this.userState.roles = undefined;
    }
}
