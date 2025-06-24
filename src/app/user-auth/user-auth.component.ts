import { Component, NgModule } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { cart, products, SignUp } from '../data-type';
import { UsersService } from '../service/users.service';
import { NgIf } from '@angular/common';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-user-auth',
  imports: [FormsModule, NgIf],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent {
  showLogin: boolean = true;
  constructor(private user: UsersService, private product: ProductsService) {}
  ngOnInit(): void {
    this.user.userReload();
  }
  signUP(data: SignUp) {
    this.user.userSignUp(data);
  }
  Login(data: SignUp) {
    this.user.userLogin(data);
  }
  openSignUp() {
    this.showLogin = false;
  }
  openLogin() {
    this.showLogin = true;
  }
  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList = JSON.parse(data);
    
      cartDataList.forEach((product: products,index:number) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.warn('item stored in db');
            }
          })
          if(cartDataList.length===index+1){
            localStorage.removeItem('localCart')
          }
        },500);
      });
    }

    setTimeout(() => {
      this.product.getCartList(userId);
      
    }, 2000);
  }
}
