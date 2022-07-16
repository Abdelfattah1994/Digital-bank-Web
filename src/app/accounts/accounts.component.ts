import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountService} from "../services/account.service";
import {catchError, Observable, throwError} from "rxjs";
import {AccountDetails, Debit} from "../model/account.model";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accountFormGroup!: FormGroup;
  accountObservable!: Observable<AccountDetails>;
  currentPage: number = 0;
  pageSize: number = 5;
  operationsFormGroup! : FormGroup;
  errorMessage! : string;
  constructor(private fb : FormBuilder, private accountService : AccountService) { }

  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountId : this.fb.control("")
    });
    this.operationsFormGroup= this.fb.group({
      operationType: this.fb.control(null),
      destinationAccount: this.fb.control(null),
      amount: this.fb.control(0),
      description: this.fb.control(null)
    });
  }
  handleSearchAccount(){
    let accountId = this.accountFormGroup.value.accountId;
    this.accountObservable = this.accountService.getAccount(accountId, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage= err.error.message;
        throw throwError(err);
      })
    );
  }
  goToPage(page: number){
    this.currentPage= page;
    this.handleSearchAccount();
  }
  handleSaveOperation(){
    let accountId: string= this.accountFormGroup.value.accountId;
    let operationType: string= this.operationsFormGroup.value.operationType;
    let amount: number= this.operationsFormGroup.value.amount;
    let description: string= this.operationsFormGroup.value.amount;
    let destinationAccount: string= this.operationsFormGroup.value.destinationAccount;
    switch (operationType){
      case 'DEBIT': {
        this.accountService.debit(accountId, amount, description).subscribe({
          next : (date)=>{
            alert("Debit has been made successfully");
            this.handleSearchAccount();
            this.operationsFormGroup.reset();
          },
          error: (err) =>{
            console.log(err);
          }
        });
        break;
      }
      case 'CREDIT' : {
        this.accountService.credit(accountId, amount, description).subscribe({
          next : (data)=>{
            alert("Success credit operation");
            this.handleSearchAccount();
            this.operationsFormGroup.reset();
          },
          error : (err)=> {
            console.log(err);
          }
        });
        break;
      }
      case 'TRANSFER': {
        this.accountService.transfer(accountId, destinationAccount, amount, description).subscribe({
          next : (data)=> {
            alert("Success transfer operation");
            this.handleSearchAccount();
            this.operationsFormGroup.reset;
          },
          error : (err)=> {
            console.log(err);
          }
        });
        break;
      }
    }
  }

}
