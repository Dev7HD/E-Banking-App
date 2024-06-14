import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Account} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
    customerId: number;
    accountId: string;

  constructor(private http: HttpClient) { }

    public getAccounts(){
      return this.http.get<Account[]>(`${environment.host}accounts/all`);
    }

    public getCustomerAccounts(id: number){
      return this.http.get<Account[]>(`${environment.host}accounts/customer/${id}`);
    }

    public newCurrentAccount(customerId: number, initiatedBalance: number, overDraft: number) {
      return this.http.post(`${environment.host}accounts/ca?initialBalance=${initiatedBalance}&customerId=${customerId}&overDraft=${overDraft}`, null);
    }

    public newSavingAccount(customerId: number, initiatedBalance: number, interestRate: number) {
        return this.http.post(`${environment.host}accounts/sa?initialBalance=${initiatedBalance}&customerId=${customerId}&interestRate=${interestRate}`, null);
    }

    public getHistory(id: string){
        return this.http.get(`${environment.host}accounts/${id}/history`);
    }
}
