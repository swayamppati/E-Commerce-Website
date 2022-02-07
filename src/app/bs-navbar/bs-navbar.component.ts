import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  isAdmin: any;
  // @Input() isAdmin :boolean;

  constructor(private auth: AuthService, private userService: UserService) {
    this.user$ = this.auth.user$;
    this.auth.user$.subscribe(user => {
      this.userService.getAdmins().subscribe((admins:any) => {
        this.isAdmin = admins[user.uid];
      });
    });
  }

  // ngOnDestroy(): void {
  //     this.isAdmin$.unsubscribe();
  // }

  logout(){
    this.auth.logout();
  }
}
