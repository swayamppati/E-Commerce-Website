import { Injectable, Output } from '@angular/core';
import { isAdmin } from '@firebase/util';
import * as auth from 'firebase/auth';
import { getDatabase, ref, set, get, child, onValue, update, DataSnapshot} from 'firebase/database';
import { AppUser } from './models/app-user';
import { Observable } from 'rxjs';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  isAdmin: any;

  save(user: auth.User){
    const db = getDatabase();
    update(ref(db,'/users/' + user.uid),{
      name: user.displayName,
      email: user.email
    });
  }

  check(uid: string){
    const db = getDatabase();
    const admin = ref(db, 'users/' + uid);
    onValue(admin, (snapshot) => {
      const data =  snapshot.val()['isAdmin'];
      console.log(data);
      this.isAdmin = data;
    });

    // return get(child(ref(db), `roles/admins/${uid}`));
    // // .then((snapshot) => {
    // //   if(snapshot.exists()) { this.isAdmin =  true; }
    // //   else { this.isAdmin = false; }
    // // });
    // console.log(this.isAdmin);
    return this.isAdmin;
  }

  check_admin(){
    return this.isAdmin;
  }
}