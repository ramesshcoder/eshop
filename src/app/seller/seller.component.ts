import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { SellerService } from '../service/seller.service';
import { Router } from '@angular/router';
import { login, SignUp } from '../data-type';

import { NgIf } from '@angular/common';

@Component({
  selector: 'app-seller',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css'],
})
export class SellerComponent {
  constructor(private seller: SellerService, private router: Router) {}
  showLogin=true;
    
  sellerData(val: SignUp) {
    if (!val.name || !val.number || !val.email || !val.password) {
      alert('Please fill out all fields before submitting.');
      return;
    }
    this.seller.addSeller(val).subscribe((response) => {
      console.log('seller added:', response);
      alert('seller registered successfully');
      localStorage.setItem('seller', JSON.stringify(response));

      if (response) {
        this.router.navigate(['seller-home']);
      }
    });
  }
sellerLoginData(val:login){
  console.warn(val)
  this.seller.userLogin(val)

}

  openLogin(){
  
    this.showLogin=false

  }
  openSignUp(){
     this.showLogin=true
  }
}
