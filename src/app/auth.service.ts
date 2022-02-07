import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import *  as auth from 'firebase/auth';
import { Observable } from 'rxjs';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.user$ = this.afAuth.authState;
   }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    // localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
    .then(() =>{
      this.user$.subscribe(user => {
        this.userService.save(user);
        this.userService.getAdmins();
      });
      this.router.navigateByUrl(returnUrl);
    });
  }

  logout(){
    this.afAuth.signOut()
    .then(() => {
      this.router.navigateByUrl('/');
    });
  }

}
