import { NgModule } from '@angular/core';
import {
    CommonModule,
    CurrencyPipe,
    DatePipe,
    LocationStrategy,
    NgClass,
    NgIf,
    PathLocationStrategy
} from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './notfound/notfound.component';
import {ToastModule} from "primeng/toast";
import {TableModule} from "primeng/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AppInterceptor} from "./interceptor/app.interceptor";
import {MessageService} from "primeng/api";
import {PaginatorModule} from "primeng/paginator";
import {AccountsComponent} from "./accounts/accounts.component";
import {AccountHistoryComponent} from "./accout-history/account-history.component";
import {CustomerAccountsComponent} from "./customer-accounts/customer-accounts.component";
import {CustomersComponent} from "./customers/customers.component";
import {OperationsComponent} from "./operations/operations.component";
import {SkeletonModule} from "primeng/skeleton";
import {MessagesModule} from "primeng/messages";
import {RouterLink} from "@angular/router";
import {PanelModule} from "primeng/panel";
import {DialogModule} from "primeng/dialog";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {ImageModule} from "primeng/image";
import {TagModule} from "primeng/tag";
import {ChartModule} from "primeng/chart";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AvatarModule} from "primeng/avatar";

@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent,
        AccountsComponent,
        AccountHistoryComponent,
        CustomerAccountsComponent,
        CustomersComponent,
        OperationsComponent,
        DashboardComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        CommonModule,
        CurrencyPipe,
        DatePipe,
        FormsModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        DropdownModule,
        ToastModule,
        PaginatorModule,
        NgClass,
        NgIf,
        RouterLink,
        MessagesModule,
        SkeletonModule,
        PanelModule,
        DialogModule,
        InputGroupAddonModule,
        InputGroupModule,
        ReactiveFormsModule,
        ImageModule,
        DropdownModule,
        TagModule,
        ChartModule,
        AvatarModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        MessageService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AppInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
