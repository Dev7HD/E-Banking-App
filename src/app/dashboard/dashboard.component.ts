import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from "../services/account.service";
import {debounceTime, Subscription} from "rxjs";
import {LayoutService} from "../layout/service/app.layout.service";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    BankAccountsCount: any;
    operationsCount: any;
    sectorOptions: any;
    lineOptions: any;
    username: string;
    roles: any;
    isAdmin: boolean;

    constructor(private layoutService: LayoutService, private accountService: AccountService, private loginService: LoginService) {
        this.subscription = this.layoutService.configUpdate$
            .pipe(debounceTime(25))
            .subscribe(() => {
                if(this.isAdmin){
                    this.initCharts();
                }
            });
    }

    ngOnInit() {
        this.isAdmin = this.loginService.userState.roles.includes('ROLE_ADMIN')
        this.username = this.loginService.userState.username
        this.roles = this.loginService.userState.roles
        if(this.isAdmin){
            this.initCharts();
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        // Sector chart
        this.accountService.getCountAccounts().subscribe({
            next: dataCount => {
                this.BankAccountsCount = {
                    labels: ['Current accounts', 'Saving accounts'],
                    datasets: [
                        {
                            data: dataCount,
                            backgroundColor: [
                                documentStyle.getPropertyValue('--blue-500'),
                                documentStyle.getPropertyValue('--yellow-500')
                            ],
                            hoverBackgroundColor: [
                                documentStyle.getPropertyValue('--blue-400'),
                                documentStyle.getPropertyValue('--yellow-400')
                            ]
                        }
                    ]
                };
            },
            error: err => {
                console.error(err);
            }
        });

        this.sectorOptions = {
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        };

        // Line chart
        this.accountService.getOperationsCount().subscribe({
            next: operationCountData => {
                const debitCount = Array.from({ length: 12 }, (_, i) => operationCountData[0][1][i][0]);
                const creditCount = Array.from({ length: 12 }, (_, i) => operationCountData[1][1][i][0]);

                this.operationsCount = {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    datasets: [
                        {
                            label: 'Debit',
                            data: debitCount,
                            backgroundColor: documentStyle.getPropertyValue('--pink-600'),
                            borderColor: documentStyle.getPropertyValue('--pink-600'),
                        },
                        {
                            label: 'Credit',
                            data: creditCount,
                            backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                            borderColor: documentStyle.getPropertyValue('--blue-500'),
                        }
                    ]
                };
            }
        });

        this.lineOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColor,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColor
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }
}
