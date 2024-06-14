import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CurrencyPipe, DatePipe, JsonPipe} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {CustomerService} from "../services/customer.service";
import {Customer} from '../models/models';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {DialogModule} from "primeng/dialog";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {Router, RouterLink} from "@angular/router";
import {RippleModule} from "primeng/ripple";

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
        TableModule,
        DialogModule,
        FormsModule,
        InputGroupAddonModule,
        InputGroupModule,
        ReactiveFormsModule,
        JsonPipe,
        RouterLink,
        RippleModule
    ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit{
    customer!: Customer;
    customerFormGroup!: FormGroup;
    updateCustomerFormGroup!: FormGroup;
    loading: boolean = false;
    newCustomerDialogVisible: boolean = false;
    deleteCustomerDialogVisible: boolean = false;
    updateCustomerDialogVisible: boolean = false;
    statuses: any[] = [];
    id:number;

    @ViewChild('filter') filter!: ElementRef;
    disabled: boolean = false;

    constructor(public customerService: CustomerService,
                public formBuilder: FormBuilder,
                private router: Router) {
    }

    ngOnInit(): void {
        this.customerService.getCustomers();
        this.customerFormGroup = this.formBuilder.group({
            name: this.formBuilder.control('', Validators.required),
            email: this.formBuilder.control('', [Validators.required, Validators.email])
        })
        this.updateCustomerFormGroup = this.formBuilder.group({
            id: this.formBuilder.control('', [Validators.required]),
            name: this.formBuilder.control('', Validators.required),
            email: this.formBuilder.control('', [Validators.required, Validators.email])
        })
        while (this.customerService.customers.length == 0){
            this.loading = true;
        }
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    showDialog() {
        this.newCustomerDialogVisible = true;
    }

    public saveCustomer(){
        this.customer = this.customerFormGroup.value;
        this.customerService.saveCustomer(this.customer).subscribe({
            next: value => {
                console.log('----success-----')
                this.customerService.getCustomers();
                console.table(value);
                this.resetForm();
                this.newCustomerDialogVisible = false;
            }, error: err => {
                console.error(err);
            }
        })
    }

    resetForm() {
        this.customerFormGroup = this.formBuilder.group({
            name: this.formBuilder.control('', Validators.required),
            email: this.formBuilder.control('', [Validators.required, Validators.email])
        })
    }

    deleteCustomerDialog(id:number) {
        this.deleteCustomerDialogVisible = true
        this.id = id;
    }

    deleteCustomer(id: number) {
        this.customerService.deleteCustomer(id).subscribe({
            next: value => {
                this.customerService.getCustomers();
                this.deleteCustomerDialogVisible = false
            }, error: err => {
                this.deleteCustomerDialogVisible = false
                console.error(err)
            }
        })
    }

    updateCustomerDialog(id: number){
        this.disabled = false;
        this.loading = true;
        this.id = id
        this.customerService.getCustomer(id).subscribe({
            next: value => {
                this.customer = value;
                this.updateCustomerFormGroup = this.formBuilder.group({
                    id: this.formBuilder.control({value: this.customer.id, disabled: true}, Validators.required),
                    name: this.formBuilder.control(this.customer.name, Validators.required),
                    email: this.formBuilder.control(this.customer.email, [Validators.required, Validators.email])
                })
                this.loading = false;
                this.updateCustomerDialogVisible = true;
            }, error: err => {
                console.error(err);
            }
        });

    }

    updateCustomer(id: number) {
        this.disabled = true;
        this.customer = this.updateCustomerFormGroup.value;
        this.updateCustomerFormGroup = this.formBuilder.group({
            id: this.formBuilder.control({value: this.customer.id, disabled: true}, Validators.required),
            name: this.formBuilder.control({value: this.customer.name, disabled: true}, Validators.required),
            email: this.formBuilder.control({value: this.customer.email, disabled: true}, [Validators.required, Validators.email])
        })
        this.customerService.updateCustomer(id,this.customer).subscribe({
            next: data => {
                this.customerService.getCustomers();
                this.updateCustomerDialogVisible = false;
            }, error: err => {
                console.error(err);
            }
        })
    }

    viewCustomerAccounts(customer: any) {
        this.customerService.customer = customer;
        this.router.navigateByUrl(`/accounts/customer/${customer.id}`);
    }
}
