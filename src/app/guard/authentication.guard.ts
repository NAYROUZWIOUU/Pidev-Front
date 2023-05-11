import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/authservice/auth.service";
import {TokenStorageService} from "../services/tokenstorageservice/token-storage.service";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private tss: TokenStorageService,private authService:AuthService, private router: Router) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    // @ts-ignore
    if (next.component.name === 'LoginComponent' || next.component.name === 'RegisterComponent') {
      if (this.tss.getId() != null) {
        if (this.authService.getRoles().includes("ROLE_ADMIN")) {
          this.router.navigate(['admin']);
        } else {
          this.router.navigate(['landing']);
        }
        return false;
      } else {
        return true;
      }
    } else {
      if (this.tss.getId() == null) {
        // @ts-ignore
        if (next.component.name !== 'LandingComponent') {
          this.router.navigate(['landing']);
          return false;
        } else {
          return true;
        }
      } else {
        if (this.authService.getRoles().includes("ROLE_ADMIN")) {
          // @ts-ignore
          if(next.component.name !== 'DashboardComponent') {
            this.router.navigate(['admin']);
            return false;
          } else{
            return true;
          }
        } else {
          // @ts-ignore
          if (next.component.name == 'DashboardComponent') {
            this.router.navigate(['landing']);
            return false;
          } else {
            return true;
          }
        }
      }
    }

  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
