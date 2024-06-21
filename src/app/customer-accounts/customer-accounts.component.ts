import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DropdownChangeEvent} from "primeng/dropdown";
import {Message} from "primeng/api";
import {Table} from "primeng/table";
import {AccountService} from "../services/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../services/customer.service";
import {Customer} from "../models/models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {firstValueFrom} from "rxjs";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrl: './customer-accounts.component.scss'
})
export class CustomerAccountsComponent implements OnInit{
    constructor(
        private accountService: AccountService,
        private activatedRoute: ActivatedRoute,
        private customerService: CustomerService,
        public formBuilder: FormBuilder,
        private router: Router

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
    message: Message[];

    statuses: any[] = [];
    @ViewChild('filter') filter!: ElementRef;

    ngOnInit(): void {
        this.message =  [{ severity: 'warn', summary: 'This customer have no accounts!' }];
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

    viewAccountHistory(id: string) {
        this.router.navigateByUrl(`/accounts/${id}/history`);
    }

    protected readonly environment = environment;
}
