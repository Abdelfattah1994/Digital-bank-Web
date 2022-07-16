import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccountDetails, Debit} from "../model/account.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http : HttpClient) { }

  public getAccount(accountId : string, pageNumber: number, pageSize: number) : Observable<AccountDetails>{
    return this.http.get<AccountDetails>(environment.backendHost+"/accounts/"+accountId+
      "/pageOperations?page="+pageNumber+"&size="+pageSize);
  }
  public debit(accountId: string, amount: number, description: string){
    let data= {accountId:accountId, amount: amount, description: description};
    return this.http.post(environment.backendHost+"/accounts/debit",data);
  }
  public credit(accountId: string, amount: number, description: string){
    let data= {accountId: accountId, amount: amount, description: description};
    return this.http.post(environment.backendHost+"/accounts/credit",data);
  }
  public transfer(sourceAccount: string, destinationAccount: string, amount: number, description: string){
    let data= {sourceAccount, destinationAccount, amount, description};
    return this.http.post(environment.backendHost+"/accounts/transfer",data);
  }
}
