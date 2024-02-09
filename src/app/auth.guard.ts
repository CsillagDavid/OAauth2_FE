import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "./services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        if (this.authService.logedIn()) {
            console.log("true");
            return true;
        } else {
            console.log("navigate");
            this.router.navigate(['/login']);
            return false;
        }
    }
}