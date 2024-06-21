import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import {CustomersComponent} from "./customers/customers.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {OperationsComponent} from "./operations/operations.component";
import {CustomerAccountsComponent} from "./customer-accounts/customer-accounts.component";
import {AccountHistoryComponent} from "./accout-history/account-history.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: 'dashboard', component: DashboardComponent},
                    { path: 'customers', component: CustomersComponent},
                    { path: 'accounts', component: AccountsComponent},
                    { path: 'operations', component: OperationsComponent},
                    { path: 'accounts/customer/:id', component: CustomerAccountsComponent},
                    { path: 'accounts/:id/history', component: AccountHistoryComponent},
                ]
            },

            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
