import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Authentication } from '../services/authentication.services';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: Authentication
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigateByUrl("");
        return false;
    }
}