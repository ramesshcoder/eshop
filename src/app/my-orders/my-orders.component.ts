import { Component } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { order } from '../data-type';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  imports: [NgFor],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {
  orderData:order[]|undefined
  constructor(private product:ProductsService){}
  ngOnInit():void{
    this.getOrderList();
  }
  cancelOrder(orderId:string|undefined){
    orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
      this.getOrderList();

    })

  }
  getOrderList(){
    this.product.orderList().subscribe((result)=>{
      this.orderData=result

    })
    
    
  }

}
