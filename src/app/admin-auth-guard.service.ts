import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { DataSnapshot } from 'firebase/database';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  isAdmin: any;

  constructor(private auth: AuthService, private user_ser: UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    this.auth.user$.subscribe(user => {
      this.isAdmin = this.user_ser.check(user.uid);
      // console.log(this.isAdmin);
    });

    // console.log(this.isAdmin);
    // return this.isAdmin;
    // return this.user_ser.isAdmin;
    // this.isAdmin = this.user_ser.check

    return this.isAdmin;
  }
}