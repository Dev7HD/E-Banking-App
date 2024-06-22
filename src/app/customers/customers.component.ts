import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {CustomerService} from "../services/customer.service";
import {Customer} from '../models/models';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router, } from "@angular/router";
import {Message} from "primeng/api";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit{
    emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    customer!: Customer;
    customers!: any[];
    customerFormGroup!: FormGroup;
    updateCustomerFormGroup!: FormGroup;
    loading: boolean;
    newCustomerDialogVisible: boolean = false;
    deleteCustomerDialogVisible: boolean = false;
    updateCustomerDialogVisible: boolean = false;
    statuses: any[] = [];
    id:number;
    message: Message[];

    @ViewChild('filter') filter!: ElementRef;
    disabled: boolean = false;

    constructor(public customerService: CustomerService,
                public formBuilder: FormBuilder,
                private router: Router) {
    }

    ngOnInit(): void {
        this.message =  [{ severity: 'warn', summary: 'No customer found!' }];
        this.loading = true;
        this.getCustomers();
        this.resetForm();
        this.updateCustomerFormGroup = this.formBuilder.group({
            id: this.formBuilder.control('', [Validators.required]),
            name: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
            email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailRegExp), Validators.minLength(5)])
        })
    }

    getCustomers(){
        this.customerService.getCustomers().subscribe({
            next: customers => { this.customers = customers; this.loading = false },
            error: err => { console.error(err) }
        })
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
                this.getCustomers();
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
            email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailRegExp)])
        })
    }

    deleteCustomerDialog(id:number) {
        this.deleteCustomerDialogVisible = true
        this.id = id;
    }

    deleteCustomer(id: number) {
        this.customerService.deleteCustomer(id).subscribe({
            next: () => {
                this.getCustomers();
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
                    email: this.formBuilder.control(this.customer.email, [Validators.required, Validators.pattern(this.emailRegExp)])
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
            email: this.formBuilder.control({value: this.customer.email, disabled: true}, [Validators.required, Validators.pattern(this.emailRegExp)])
        })

        this.customerService.updateCustomer(id,this.customer).subscribe({
            next: () => {
                this.getCustomers();
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

    protected readonly environment = environment;
}
