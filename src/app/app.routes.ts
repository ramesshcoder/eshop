import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SellerComponent } from './seller/seller.component';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { authGuard } from './auth.guard';
import { SellerAddProductsComponent } from './seller-add-products/seller-add-products.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';

import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'seller',
    component: SellerComponent,
  },
  
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'update/:id',
    component: SellerUpdateProductComponent,
    canActivate: [authGuard],
  },
  {
    path: 'seller-home',
    component: SellerHomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'seller-add-products',
    component: SellerAddProductsComponent,
    canActivate: [authGuard],
  },
  {
    component: ProductsDetailComponent,
    path: 'details/:productId',
  },
  {
    component: UserAuthComponent,
    path: 'user-auth',
  },
  { path: 'cart-page', component: CartPageComponent },
  {
    path:'checkout',component:CheckoutComponent
  },
  {
    path:'my-orders',component:MyOrdersComponent
  }
];
