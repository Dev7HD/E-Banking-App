import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {CustomerService} from "../services/customer.service";
import { expandedRows } from '../models/models';

@Component({
  selector: 'app-customers',
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
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit{
    constructor(private customerService: CustomerService) {
    }

    customers: any;
    public loading: boolean = true;

    statuses: any[] = [];
    rowGroupMetadata: any;
    isExpanded: boolean = false;
    expandedRows: expandedRows = {};
    @ViewChild('filter') filter!: ElementRef;

    ngOnInit(): void {
        this.customerService.getCustomers().subscribe({
            next: data => {
                this.loading = false;
                this.customers = data;
            }, error: err => {
                console.error(err);
            }
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
