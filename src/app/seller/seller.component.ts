import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { SellerService } from '../service/seller.service';
import { Router } from '@angular/router';
import { login, SignUp } from '../data-type';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-seller',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css'],
})
export class SellerComponent {
  showLogin = true;
 ngOnInit(): void {
    // ✅ Check if seller is already logged in
    const sellerData = localStorage.getItem('seller');
    if (sellerData) {
      this.router.navigate(['seller-home']);
    }
  }
  constructor(private seller: SellerService, private router: Router) {}

  // Seller SignUp
  sellerData(val: SignUp) {
    if (!val.name || !val.number || !val.email || !val.password) {
      alert('Please fill out all fields before submitting.');
      return;
    }

    this.seller.addSeller(val).subscribe((response) => {
      console.log('Seller registered:', response);
      alert('Seller registered successfully');

      // Save in localStorage
      localStorage.setItem('seller', JSON.stringify(response));

      // Redirect to seller-home
      if (response) {
        this.router.navigate(['seller-home']);
      }
    });
  }

  // Seller Login
  sellerLoginData(val: login) {
    console.warn('Login data:', val);
    this.seller.userLogin(val).subscribe({
      next: (result: any) => {
        if (result?.body?.length > 0) {
          console.warn('User logged in');

          // Save logged in user data
          localStorage.setItem('seller', JSON.stringify(result.body[0]));

          // Redirect to seller-home
          this.router.navigate(['seller-home']);
        } else {
          alert('Login failed: Invalid email or password');
        }
      },
      error: (err:any) => {
        console.error('Login error:', err);
        alert('Something went wrong. Please try again.');
      }
    });
  }

  // Toggle login/signup view
  openLogin() {
    this.showLogin = false;
  }

  openSignUp() {
    this.showLogin = true;
  }
}
