import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AccountService} from "../services/account.service";
import {Message} from "primeng/api";
import {Table} from "primeng/table";
import {PaginatorState} from "primeng/paginator";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-accout-history',
  templateUrl: './account-history.component.html',
  styleUrl: './account-history.component.scss'
})
export class AccountHistoryComponent implements OnInit{
    constructor(
        private activatedRoute: ActivatedRoute,
        private accountService: AccountService) {
    }
    accountId: string;
    accountHistory: any;
    loading: boolean;
    first: number = 0;
    rows: number = 5;
    page: number = 0;
    balance: number;
    totalPages: number;
    totalElements: number;
    types: any[];
    message: Message[]
    @ViewChild('filter') filter!: ElementRef;

    ngOnInit(): void {
        this.message =  [{ severity: 'warn', summary: 'This account have no operations history!' }];
        this.types = [
            { label: "CREDIT", value: "CREDIT" },
            { label: "DEBIT", value: "DEBIT" }
        ]
        this.loading = true;
        this.accountId = this.activatedRoute.snapshot.params['id'];
        this.getAccountHistory();
    }
    getAccountHistory(){
        this.accountService.getHistory(this.accountId,this.page,this.rows).subscribe({
            next: history => {
                this.accountHistory = history.operationDTOList;
                this.balance = history.balance;
                this.totalPages = history.totalPages;
                this.totalElements = history.totalElements;
                console.table(history)
                this.loading = false;
            },
            error: err => console.log(err)
        })
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }



    onPageChange(event: PaginatorState) {
        this.first = event.first;
        this.rows = event.rows;
        this.page = event.page;
        this.getAccountHistory();
    }

    protected readonly environment = environment;
}
