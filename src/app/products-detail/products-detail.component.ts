import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../service/products.service';
import { products } from '../data-type';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-products-detail',
  imports: [NgIf],
  templateUrl: './products-detail.component.html',
  styleUrl: './products-detail.component.css'
})
export class ProductsDetailComponent {
  productQuantity:number=1
  productData:undefined|products
  constructor(private activeRoute:ActivatedRoute,private product:ProductsService){}
ngOnInit():void{
  let productId=this.activeRoute.snapshot.paramMap.get('productId');
  productId && this.product.getProduct(productId).subscribe((result)=>{
    console.warn(result)
    this.productData=result
  })
}
handleQuantity(val:string){
  if(this.productQuantity<20 && val==='plus'){
    this.productQuantity+=1
  }else if(this.productQuantity>1 && val==='minus'){
    this.productQuantity-=1
  }
this
}
}
