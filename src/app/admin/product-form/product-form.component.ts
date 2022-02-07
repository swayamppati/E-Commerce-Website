import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: Observable<any>
  products$:any
  productID:any
  product = {
    title:"",
    price:"",
    category:"",
    imageURL:""
  };

  constructor(
    private categoryService: CategoryService, 
    private productService: ProductService, 
    private router: Router,
    private route: ActivatedRoute) {
      this.categories$ = this.categoryService.getCategories();
      this.productID = this.route.snapshot.paramMap.get('id');
      if(this.productID) {
          // console.log(productID);
          this.productService.get(this.productID).subscribe((product:any) => {
            this.product = product;
            console.log(product);
          })
      }
    }

  save(product: any){
    if(this.productID){
      this.productService.update(this.productID, product)
      .then(() => {
        console.log("Product Updated");
        this.router.navigateByUrl('/admin/admin-products');
      })
    }

    else{
      this.productService.create(product)
      .then(() => {
        console.log("Product Added");
        this.router.navigateByUrl('/admin/admin-products');
      });
    }
  }

  ngOnInit(): void {
  }
}
