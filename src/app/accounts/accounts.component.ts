import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AccountService} from "../services/account.service";
import {Table, TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {ChipsModule} from "primeng/chips";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {SliderModule} from "primeng/slider";
import {CurrencyPipe, DatePipe, NgClass} from "@angular/common";
import {ProgressBarModule} from "primeng/progressbar";
import { expandedRows } from '../models/models';

@Component({
  selector: 'app-accounts',
  standalone: true,
    imports: [
        TableModule,
        ButtonModule,
        ChipsModule,
        MultiSelectModule,
        FormsModule,
        DropdownModule,
        SliderModule,
        DatePipe,
        CurrencyPipe,
        ProgressBarModule,
        NgClass
    ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsComponent implements OnInit{
    constructor(private accountService: AccountService) {
    }

    public accounts: any;
    public loading: boolean = true;

    statuses: any[] = [];
    @ViewChild('filter') filter!: ElementRef;

    ngOnInit(): void {
        this.accountService.getAccounts().subscribe({
            next: data => {
                this.loading = false;
                this.accounts = data;
            }, error: err => {
                console.error(err)
            }
        });
        this.statuses=[
            { label: 'Created', value: 'CREATED'},
            { label: 'Activated', value: 'ACTIVATED' },
            { label: 'Suspended', value: 'SUSPENDED' },
        ]
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }


}
