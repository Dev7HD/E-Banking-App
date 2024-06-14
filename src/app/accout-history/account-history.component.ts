import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AccountService} from "../services/account.service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {ButtonModule} from "primeng/button";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";

@Component({
  selector: 'app-accout-history',
  standalone: true,
    imports: [
        ButtonModule,
        CurrencyPipe,
        DatePipe,
        DropdownModule,
        InputTextModule,
        SharedModule,
        TableModule
    ],
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
    @ViewChild('filter') filter!: ElementRef;

    ngOnInit(): void {
        this.loading = true;
        this.accountId = this.activatedRoute.snapshot.params['id'];
        this.getAccountHistory();
    }
    getAccountHistory(){
        this.accountService.getHistory(this.accountId).subscribe({
            next: history => {
                this.accountHistory = history
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
}
