import { Injectable, OnInit, Output } from '@angular/core';
import * as auth from 'firebase/auth';
import { getDatabase, ref, update, DataSnapshot} from 'firebase/database';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class UserService{
  constructor(private db: AngularFireDatabase) {
    this.admins = this.db
    .object('/roles/admins')
    .valueChanges();
   }

  admins: any;

  save(user: auth.User){
    const db = getDatabase();
    update(ref(db,'/users/' + user.uid),{
      name: user.displayName,
      email: user.email
    });
  }

  getAdmins(){
    this.admins = this.db
    .object('/roles/admins')
    .valueChanges();
    return this.admins;
  }
}