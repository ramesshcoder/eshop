import { Component } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { cart, priceSummary } from '../data-type';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  imports: [NgFor],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
 cartData:cart[]|undefined
 priceSummary:priceSummary={
  price:0,
    discount:0,
    tax:0,
    delivery:0,
    total:0

 }
  constructor(private product:ProductsService,private router :Router){}
  ngOnInit():void{
    this.product.currentCart().subscribe((result)=>{
     this.cartData=result
     if(!result || result.length===0){
      this.priceSummary = {
        price: 0,
        discount: 0,
        tax: 0,
        delivery: 0,
        total: 0
      };
return;
     };
      let price=0;
      result.forEach((item)=>{
        if(item.quantity){
price +=Number(item.price*item.quantity)||0;
        }
        
      });
      this.priceSummary.price=price;
      this.priceSummary.discount=price/10;
      this.priceSummary.tax=price/10;
      this.priceSummary.delivery=100;
      this.priceSummary.total=price+(price/10)+100-(price/10)
      console.warn(this.priceSummary);
      

  })}
  checkout(){
    this.router.navigate(['/checkout'])
  }
  
 removeToCart(cartId: string|undefined) {
  if (cartId) {
    this.product.removeToCart(cartId).subscribe((result) => {
      if (result) {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId);
      }
    });
  }
}


  }

  


