import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductsService } from '../service/products.service';

import { Router } from '@angular/router';
import { cart } from '../data-type';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule,],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  totalPrice:number|undefined;
  CartData:cart[]|undefined;
  orderMsg:string|undefined
 

  constructor(private product :ProductsService,private router:Router){}
  ngOnInit():void{
    this.product.currentCart().subscribe((result)=>{
      let price=0;
      this.CartData=result;
      result.forEach((item)=>{
        if(item.quantity){
          price+=Number(item.price* item.quantity)
        }

      })
      this.totalPrice=price+(price/10)+100-(price/10)
      console.warn(this.totalPrice);
      
    })
  }
orderNow(data:{email:string,address:string,contact:string}){
  console.warn(data);
  let user=localStorage.getItem('user');
let userId=user&& JSON.parse(user).id;
if(this.totalPrice){
  let orderData={
    ...data,
    totalPrice:this.totalPrice,userId
  }
  this.CartData?.forEach((item)=>{
    setTimeout(() => {
      item.id && this.product.deleteCartItems(item.id)
      
    }, 900);

  })

  
  this.product.orederNow(orderData).subscribe((result)=>{
    if(result){
      this.orderMsg="your order has been placed"      
      
      
       setTimeout(() => {
         this.router.navigate(['/my-orders'])
        
       }, 2000);
      

    }
  })
}


  

}
}
