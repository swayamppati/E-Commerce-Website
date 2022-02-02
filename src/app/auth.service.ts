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

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router, private user_ser: UserService) {
    this.user$ = this.afAuth.authState;
   }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    // localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
    .then(() =>{
      this.user$.subscribe(user => {
        this.user_ser.save(user);
        this.user_ser.check(user.uid);
      });
      this.router.navigateByUrl(returnUrl);
    });
  }

  logout(){
    this.afAuth.signOut()
    .then(() => {
      this.user$.subscribe(user => {
        this.user_ser.check(user.uid);
      });
      this.router.navigateByUrl('/');
    });
  }

}
