import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AccountService} from "../services/account.service";
import {Table} from "primeng/table";
import {Router} from "@angular/router";
import {Message} from "primeng/api";
import {environment} from "../../environments/environment";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsComponent implements OnInit{
    constructor(private accountService: AccountService,
                private router: Router,
                protected loginService: LoginService) {
    }

    accounts: any;
    loading: boolean = true;
    message: Message[];

    status: any[] = [];
    @ViewChild('filter') filter!: ElementRef;

    ngOnInit(): void {
        this.message =  [{ severity: 'warn', summary: 'No accounts found!' }];
        this.accountService.getAccounts().subscribe({
            next: data => {
                this.loading = false;
                this.accounts = data;
            }, error: err => {
                console.error(err)
            }
        });
        this.status=[
            { label: 'Created', value: 'CREATED'},
            { label: 'Activated', value: 'ACTIVATED' },
            { label: 'Suspended', value: 'SUSPENDED' },
        ];

    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }


    viewAccountHistory(id: string) {
        this.router.navigateByUrl(`/admin/accounts/${id}/history`);
    }

    protected readonly environment = environment;

}
