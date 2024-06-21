import {Component, OnInit} from '@angular/core';
import {AccountService} from "../services/account.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
    constructor(private accountService: AccountService) {}
        BankAccountsCount: any;
        operationsCount: any;

        sectorOptions: any;
        lineOptions: any;

        ngOnInit() {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

            //Sector chart
            this.accountService.getCountAccounts().subscribe({
                next: dataCount => {
                    this.BankAccountsCount = {
                        labels: ['Current accounts', 'Saving accounts'],
                        datasets: [
                            {
                                data: dataCount,
                                backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                                hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
                            }
                        ]
                    };
                },
                error: err => {console.error(err)}
            })

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
            //Line chart
            this.accountService.getOperationsCount().subscribe({
                next: operationCountData => {
                    let debitCount = [];
                    for (let i = 0; i < 12; i++) {
                        debitCount.push(operationCountData[0][1][i][0])
                    }
                    let creditCount = [];
                    for (let i = 0; i < 12; i++) {
                        creditCount.push(operationCountData[1][1][i][0])
                    }
                    this.operationsCount = {
                        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                        datasets: [
                            {
                                label: 'Debit',
                                data: debitCount,
                                fill: false,
                                borderColor: documentStyle.getPropertyValue('--blue-500'),
                                tension: 0.4
                            },
                            {
                                label: 'Credit',
                                data: creditCount,
                                fill: false,
                                borderColor: documentStyle.getPropertyValue('--pink-500'),
                                tension: 0.4
                            }
                        ]
                    };
                }
            })
            this.lineOptions = {
                maintainAspectRatio: false,
                aspectRatio: 0.6,
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
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
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
