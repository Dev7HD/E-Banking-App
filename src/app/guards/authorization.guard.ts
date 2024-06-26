import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router';
import {LoginService} from "../services/login.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
@Injectable({
    providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
    constructor(private router: Router, private loginService: LoginService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let isAdmin = this.loginService.userState.roles.includes('ADMIN')
        if (isAdmin) {
            return true;
        } else {
            this.router.navigate(['/not-auth']);
            return false;
        }
    }
}
