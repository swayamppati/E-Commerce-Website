import { Component, Input, OnInit } from '@angular/core';
import { Auth } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent{

  user$:Observable<any>;
  isAdmin : any;
  // @Input() isAdmin :boolean;

  constructor(private auth: AuthService, private user_ser: UserService) {
    this.user$ = this.auth.user$;
  }

  logout(){
    this.auth.logout();
  }

  check_admin(){
    this.isAdmin = this.user_ser.check_admin();
  }

  // ngOnInit(){
  //   this.user$.pipe(map((user:boolean) => {
  //     if(user){
  //       this.isAdmin = this.user_ser.check_admin();
  //     }
  //   }));
  // }

}
