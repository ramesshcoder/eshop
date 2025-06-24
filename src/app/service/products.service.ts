import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, products } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  cartData = new EventEmitter<products[]>();

  constructor(private http: HttpClient) {}
  addProduct(data: products) {
    return this.http.post('http://localhost:3000/products', data);
  }
  productList() {
    return this.http.get<products[]>('http://localhost:3000/products');
  }
  deleteProduct(id: string) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
  getProduct(id: string) {
    return this.http.get<products>(`http://localhost:3000/products/${id}`);
  }
  updateProduct(product: products) {
    return this.http.put<products>(
      `http://localhost:3000/products/${product.id}`,
      product
    );
  }
  trendyProducts() {
    return this.http.get<products[]>('http://localhost:3000/products?_limit=8');
  }
  localAddToCart(data: products) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }
  removeItemsFromCarts(productId: string) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: products[] = JSON.parse(cartData);
      items = items.filter((items: products) => productId !== items.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }
  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }
  getCartList(userId: string) {
    return this.http
      .get('http://localhost:3000/cart?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body as products[]);
        }
      });
  }
  removeToCart(cartId: string) {
    return this.http.delete(`http://localhost:3000/cart/` + cartId);
  }
  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>(
      `http://localhost:3000/cart?userId=` + userData.id
    );
  }
  orederNow(data: order) {
    return this.http.post('http://localhost:3000/ordes', data);
  }
  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>(
      `http://localhost:3000/ordes?userId=` + userData.id
    );
  }
  deleteCartItems(cartId: string) {
    return this.http
      .delete(`http://localhost:3000/cart/` + cartId, { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          this.cartData.emit([]);
        }
      });
  }
  cancelOrder(orderId:string){
    return this.http.delete(`http://localhost:3000/ordes/`+orderId);
    
  }
}
