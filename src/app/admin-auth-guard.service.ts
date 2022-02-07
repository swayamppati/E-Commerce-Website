import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { DataSnapshot } from 'firebase/database';
import { Observable } from 'rxjs';
import { map, retry, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  isAdmin:any;

  constructor(private auth: AuthService, private userService: UserService, private router: Router) {
    this.auth.user$.subscribe(user => {
      this.userService.getAdmins().subscribe((admins:any) => {
        this.isAdmin = admins[user.uid];
      });
    });
   }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):any {
    // console.log(this.isAdmin);
    return this.isAdmin;
  }
}