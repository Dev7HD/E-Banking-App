import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import {LoginService} from "../services/login.service";

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService, protected loginService: LoginService) { }

    ngOnInit() {
        this.model = [
            {
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] },
                    { label: 'Customers', icon: 'pi pi-user', routerLink: ['/customers']},
                    { label: 'Accounts', icon: 'pi pi-dollar', routerLink: ['/accounts']},
                ]
            }
        ];
        if(this.loginService.userState.isAdmin){
            this.model[0]['items'].push({ label: 'Operations', icon: 'pi pi-sort-alt', routerLink: ['/admin/operations']});
        }
    }
}
