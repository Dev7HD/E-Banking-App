import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CurrencyPipe, DatePipe, JsonPipe, NgIf} from "@angular/common";
import {DropdownChangeEvent, DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {AccountService} from "../services/account.service";
import {ActivatedRoute} from "@angular/router";
import {CustomerService} from "../services/customer.service";
import {Customer} from "../models/models";
import {PanelModule} from "primeng/panel";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {DialogModule} from "primeng/dialog";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {InputNumberModule} from "primeng/inputnumber";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-customer-accounts',
  standalone: true,
    imports: [
        ButtonModule,
        CurrencyPipe,
        DatePipe,
        DropdownModule,
        InputTextModule,
        NgIf,
        SharedModule,
        TableModule,
        PanelModule,
        FormsModule,
        DialogModule,
        InputGroupAddonModule,
        InputGroupModule,
        ReactiveFormsModule,
        InputNumberModule,
        JsonPipe
    ],
  templateUrl: './customer-accounts.component.html',
  styleUrl: './customer-accounts.component.scss'
})
export class CustomerAccountsComponent implements OnInit{
    constructor(
        private accountService: AccountService,
        private activatedRoute: ActivatedRoute,
        private customerService: CustomerService,
        public formBuilder: FormBuilder

    ) {
    }

    id: number;
    accounts: any;
    loading: boolean = true;
    customer: Customer;
    newAccountDialogVisible: boolean = false;
    newAccountFormGroup: FormGroup;
    accountTypeList: any[];
    accountType: string;

    statuses: any[] = [];
    @ViewChild('filter') filter!: ElementRef;

    ngOnInit(): void {
        this.accountTypeList = [
            'Saving account',
            'Current account'
        ];

        this.id = this.activatedRoute.snapshot.params['id'];
        this.customer = this.customerService.customer;

        if (!this.customer) {
            this.loadCustomerData();
        }

        this.getCustomerAccounts();
        this.initializeForm();
    }

    async loadCustomerData() {
        try {
            this.customer = await firstValueFrom(this.customerService.getCustomer(this.id));
        } catch (error) {
            console.error('Error loading customer data:', error);
        }
    }

    showDialog() {
        this.newAccountDialogVisible = true;
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    getCustomerAccounts() {
        this.accountService.getCustomerAccounts(this.id).subscribe({
            next: data => {
                this.accounts = data;
                this.loading = false;
            },
            error: err => {
                console.error('Error fetching customer accounts:', err);
                this.loading = false;
            }
        });
    }

    saveAccount() {
        const { initialBalance, interestRate, overDraft } = this.newAccountFormGroup.value;

        if (this.accountType === 'Current account') {
            this.accountService.newCurrentAccount(this.id, initialBalance, overDraft).subscribe({
                next: () => this.handleAccountSaveSuccess(),
                error: err => console.error('Error saving current account:', err)
            });
        } else {
            this.accountService.newSavingAccount(this.id, initialBalance, interestRate).subscribe({
                next: () => this.handleAccountSaveSuccess(),
                error: err => console.error('Error saving saving account:', err)
            });
        }
    }

    handleAccountSaveSuccess() {
        this.newAccountDialogVisible = false;
        this.getCustomerAccounts();
        this.newAccountFormGroup.reset();
    }

    initializeForm() {
        this.newAccountFormGroup = this.formBuilder.group({
            customerId: [{ value: this.id, disabled: true }, Validators.required],
            initialBalance: ['', [Validators.required, Validators.min(100)]],
            overDraft: [''],
            interestRate: [''],
            accountType: ['', Validators.required]
        });
    }

    setAccountType(event: DropdownChangeEvent) {
        this.accountType = event.value;
    }
}
