import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';

import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';

import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AuthService } from './auth.service';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { AdminAuthGuardService as AdminAuthGuard } from './admin-auth-guard.service';
import { UserService } from './user.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';
import { ProductService } from './product.service';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CustomFormsModule,
    RouterModule.forRoot([
      //Anonymous User
      { path: 'login', component: LoginComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: '', component: HomeComponent },
      
      //Logged in user
      { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
      { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuard] },
      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
      
      //Admin
      { path: 'admin/admin-orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/admin-products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/admin-products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/admin-products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    ]),
    NgbModule
  ],
  providers: [
    AuthService, 
    AuthGuard,
    AdminAuthGuard,
    UserService,
    CategoryService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
