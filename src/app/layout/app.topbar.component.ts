import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit{

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;
    themes: any[];
    selectedMode: any;

    constructor(public layoutService: LayoutService, private loginService: LoginService, private router: Router) { }

    ngOnInit(): void {
        this.themes = [
            {name:'Light',theme:'mdc-light-deeppurple',colorScheme:"light", icon:"pi pi-sun"},
            {name:'Dark',theme:'mdc-dark-deeppurple',colorScheme:"dark", icon: "pi pi-moon"},
        ];
        this.selectedMode = this.themes[0];
        this.changeTheme(this.themes[0].theme,this.themes[0].colorScheme);
    }

    set colorScheme(val: string) {
        this.layoutService.config.update((config) => ({
            ...config,
            colorScheme: val,
        }));
    }

    set theme(val: string) {
        this.layoutService.config.update((config) => ({
            ...config,
            theme: val,
        }));
    }

    changeTheme(theme: string, colorScheme: string) {
        this.theme = theme;
        this.colorScheme = colorScheme;
    }

    toggleMode(){
        console.log(this.selectedMode)
        if(this.selectedMode == 'Light'){
            this.changeTheme(this.selectedMode.theme,this.selectedMode.colorScheme);
        } else {
            this.changeTheme(this.selectedMode.theme,this.selectedMode.colorScheme);
        }
    }

    logout() {
        this.loginService.userState.isAuthenticated = false;
        this.loginService.userState.token = '';
        this.loginService.userState.username = '';
        this.loginService.userState.roles = '';
        this.router.navigateByUrl("/login");
    }
}
