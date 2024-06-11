import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { Table } from 'primeng/table';

import {OperationService} from "../services/operation.service";

@Component({
  selector: 'app-operations',
  standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        RatingModule,
        ButtonModule,
        SliderModule,
        InputTextModule,
        ToggleButtonModule,
        RippleModule,
        MultiSelectModule,
        DropdownModule,
        ProgressBarModule,
        ToastModule
    ],
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

}
