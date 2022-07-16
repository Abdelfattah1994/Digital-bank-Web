import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/Customer.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http : HttpClient) { }

  public getCustomers() : Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(environment.backendHost+"/customers");
  }

  searchCustomers(keyword : string) : Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(environment.backendHost+"/customers/search?keyword="+keyword);
  }
  public saveNewCustomer(customer: Customer): Observable<Customer>{
    return this.http.post<Customer>(environment.backendHost+"/customers", customer);
  }
  public deleteCustomer(customerId: number){
    return this.http.delete(environment.backendHost+"/customers/"+customerId);
  }
}
