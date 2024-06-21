import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Customer} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

    public customers!: Customer[];
    public customer!: Customer;

  constructor(private http: HttpClient) { }

    public getCustomers(){
      return this.http.get<Customer[]>(`${environment.host}customers/all`)
    }

    public getCustomer(id: number){
      return this.http.get<Customer>(`${environment.host}customers/${id}`)
    }

    public saveCustomer(customer: Customer){
      return this.http.post(`${environment.host}customers/new`, customer);
    }

    public deleteCustomer(customerId: number){
      return this.http.delete(`${environment.host}customers/${customerId}`);
    }

    public updateCustomer(customerId: number, customer: Customer){
      return this.http.put<Customer>(`${environment.host}customers/${customerId}`, customer);
    }

}
