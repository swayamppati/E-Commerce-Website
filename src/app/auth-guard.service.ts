import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  isLoggedIn : any;

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean{ //to return true or false based on acl. Its thinking we are returning void.
    this.isLoggedIn = this.auth.user$.pipe(map((user:boolean) => {

      if(user) return true; 

      this.router.navigate(['/login'],{ queryParams: { returnUrl: state.url} });
      return false;

    }));

    return this.isLoggedIn;
  }

  // canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): any{ //to return true or false based on acl. Its thinking we are returning void.
  //   this.auth.user$.subscribe(user => {

  //     if(user) return true; 

  //     this.router.navigate(['/login'],{ queryParams: { retUrl: route.url} });
  //     return false;

  //   });
  // }
}
