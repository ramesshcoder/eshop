import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SellerComponent } from './seller/seller.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path:'',component:HomeComponent
    },
    {
        path:'seller',component:SellerComponent
    },{
        path:'cart',component:CartComponent
    },
    {
        path:'login',component:LoginComponent
    },
    {
        path:'seller-home',component:SellerHomeComponent,
        canActivate:[authGuard]
    }
];
