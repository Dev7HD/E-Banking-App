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
import {LoginComponent} from "./login/login.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {NotAuthComponent} from "./not-auth/not-auth.component";
import {AuthorizationGuard} from "./guards/authorization.guard";
import {AdminComponent} from "./admin/admin.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent, canActivate: [AuthenticationGuard],
                children: [
                    { path: 'dashboard', component: DashboardComponent},
                    { path: 'customers', component: CustomersComponent},
                    { path: 'accounts', component: AccountsComponent},
                    { path: 'accounts/customer/:id', component: CustomerAccountsComponent},
                    {path: 'admin', component: AdminComponent, canActivate: [AuthorizationGuard], children:[
                            { path: 'operations', component: OperationsComponent },
                            { path: 'accounts/:id/history', component: AccountHistoryComponent}
                        ]},
                ]
            },
            { path: 'login', component: LoginComponent},
            { path: 'not-auth', component: NotAuthComponent},
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
