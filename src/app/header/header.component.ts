import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgIf, NgSwitch, NgSwitchCase, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf, NgSwitch, NgSwitchCase, TitleCasePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';

  constructor(private route: Router, private product: ProductsService) {
    this.route.events.subscribe((val: any) => {
      if (val instanceof NavigationEnd) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = 'seller';

          // ✅ Correct parsing from object
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore); // No [0] here
          this.sellerName = sellerData?.name || ''; // Safe fallback
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
          this.product.getCartList(userData.id)
        } else {
          this.menuType = 'default';
        }
      }
    });
    let cartData=localStorage.getItem('localCart')
    if(cartData){
      this.cartItems=JSON.parse(cartData).length
    }
    this.product.cartData.subscribe((items)=>{
      this.cartItems=items.length
    })
  }
userLogOut(){
   localStorage.removeItem('user');
    this.route.navigate(['user-auth']);
    this.product.cartData.emit([])
}
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  cartItems=0
}
