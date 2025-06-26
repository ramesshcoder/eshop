import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../service/products.service';
import { cart, products } from '../data-type';
import { NgIf, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-products-detail',
  imports: [NgIf,TitleCasePipe],
  templateUrl: './products-detail.component.html',
  styleUrl: './products-detail.component.css',
})
export class ProductsDetailComponent {
  productQuantity: number = 1;
  productData: undefined | products;
  removeCart = false;
  CartData: products | undefined;
  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductsService
  ) {}
  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    productId &&
      this.product.getProduct(productId).subscribe((result) => {
        console.warn(result);
        this.productData = result;
        let cartData = localStorage.getItem('localCart');
        if (productId && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter((item: products) => productId == item.id);
          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }
        let user = localStorage.getItem('user');
        if (user) {
          let userId = user && JSON.parse(user).id;
          this.product.getCartList(userId);
          this.product.cartData.subscribe((result) => {
            let item = result.filter(
              (item: products) =>
                productId?.toString() === item['productId']?.toString()
            );
            if (item.length) {
              this.CartData = item[0];
              this.removeCart = true;
            }
          });
        }
      });
  }
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'minus') {
      this.productQuantity -= 1;
    }
    this;
  }
  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        console.warn(this.productData);
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        console.warn('user is logged in');
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        console.warn(userId);
        let cartData: cart = {
          ...this.productData,
          userId,
          productId: this.productData.id,
        };
        delete cartData.id;
        console.warn(cartData);
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }
  removeToCart(productId: string) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemsFromCarts(productId);
    } else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      console.warn(this.CartData);
      this.CartData &&
        this.product.removeToCart(this.CartData.id).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
          }
        });
      this.removeCart = false;
    }
  }
}
