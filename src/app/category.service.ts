import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getDatabase, orderByChild, query, ref, update } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories(){
    return this.db
      .list<any>('/categories')
      .valueChanges();
  }
}
