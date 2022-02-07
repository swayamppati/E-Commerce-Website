import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { UrlHandlingStrategy } from '@angular/router';
import { map } from 'rxjs/operators';
import { update, ref, getDatabase } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products$: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.products$ = db.list('/products');
   }

  create(product:any){
    return this.products$.push(product);
  }
  getAll(){
    return this.products$.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({key: c.payload.key, ...c.payload.val() }))
    ));
  }
  get(productID:any){
    return this.db.object('/products/' + productID).valueChanges();
  }

  update(productID:any, product:any){
    return update(ref(getDatabase(),'/products/'+productID),product);
  }

  delete(productID:any){
    return this.db.object('/products/' + productID).remove();
  }
}
