import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { cart, priceSummary } from '../data-type';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
  standalone: true,
  imports: [NgFor]
})
export class CartPageComponent implements OnInit {
  cartData: cart[] = [];
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  };

  constructor(private product: ProductsService, private router: Router) {}

  ngOnInit(): void {
    this.loadCartData();
  }

  // ✅ Load cart data based on login status
  loadCartData(): void {
    const user = localStorage.getItem('user');

    if (user) {
      // Logged in user: fetch cart from server
      this.product.currentCart().subscribe(
        (result) => {
          this.cartData = result || [];
          this.updatePriceSummary();
        },
        (error) => {
          console.error('Failed to load backend cart:', error);
          this.cartData = [];
          this.updatePriceSummary();
        }
      );
    } else {
      // Guest user: fetch cart from localStorage
      const localCart = localStorage.getItem('localCart');
      if (localCart) {
        this.cartData = JSON.parse(localCart);
      } else {
        this.cartData = [];
      }
      this.updatePriceSummary();
    }
  }

  // ✅ Navigate to checkout
  checkout(): void {
    this.router.navigate(['/checkout']);
  }

  // ✅ Remove an item from the cart
  removeToCart(cartId: string | undefined): void {
    const user = localStorage.getItem('user');

    if (!cartId) return;

    if (user) {
      // Logged in user: remove from backend
      this.product.removeToCart(cartId).subscribe(
        () => {
          this.loadCartData();
          const userId = JSON.parse(user).id;
          this.product.getCartList(userId); // update other views if needed
        },
        (error) => {
          console.error('Error removing item from backend cart:', error);
        }
      );
    } else {
      // Guest user: remove from localStorage
      const localCart = localStorage.getItem('localCart');
      if (localCart) {
        let cartItems = JSON.parse(localCart);
        cartItems = cartItems.filter((item: cart) => item.id !== cartId);
        localStorage.setItem('localCart', JSON.stringify(cartItems));
        this.cartData = cartItems;
        this.updatePriceSummary();
      }
    }
  }

  // ✅ Calculate and update price summary
  updatePriceSummary(): void {
    if (!this.cartData || this.cartData.length === 0) {
      this.priceSummary = {
        price: 0,
        discount: 0,
        tax: 0,
        delivery: 0,
        total: 0
      };
      return;
    }

    let price = 0;

    this.cartData.forEach((item) => {
      const itemPrice = Number(item.price);
      const itemQuantity = Number(item.quantity || 1); // default quantity 1
      if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
        price += itemPrice * itemQuantity;
      }
    });

    const tax = price * 0.1;
    const discount = price * 0.1;
    const delivery = 100;
    const total = price + tax + delivery - discount;

    this.priceSummary = {
      price,
      tax,
      discount,
      delivery,
      total
    };
  }
}
