import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Table } from 'primeng/table';
import {OperationService} from "../services/operation.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrl: './operations.component.scss'
})
export class OperationsComponent implements OnInit{
    constructor(private operationService: OperationService) {
    }

    operations: any;
    loading: boolean = true;
    @ViewChild('filter') filter!: ElementRef;
    types: any[];

    ngOnInit(): void {
        this.operationService.getOperations().subscribe({
            next: data =>{
                this.loading = false;
                this.operations = data;
            }, error: err => {
                console.error(err);
            }
        })
        this.types=[
            {label: 'CREDIT', value: 'CREDIT'},
            {label: 'DEBIT', value: 'DEBIT'}
        ]
    }

     clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    protected readonly environment = environment;
}
