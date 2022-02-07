import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products$;
  constructor(private productService: ProductService, private router: Router) { 
    this.products$ = this.productService.getAll();
    // console.log(this.products$);
    this.products$.subscribe(products => {
      // console.log(products);
    })
  }

  delete(productID: any){
    if(!confirm("Are you sure you want to Delete this Product?")) return;
    
    this.productService.delete(productID)      
    .then(() => {
      console.log("Product Added");
      this.router.navigateByUrl('/admin/admin-products');
    });
  }

  ngOnInit(): void {
  }

}