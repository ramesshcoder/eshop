import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { ProductsService } from '../service/products.service';
import { products } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  imports: [FormsModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent {
  productData:undefined|products
  prductMessage:undefined|string
  constructor(private route:ActivatedRoute,private product :ProductsService){
    
  }
  ngOnInit():void{
    let productId=this.route.snapshot.paramMap.get('id')
    console.warn(productId);
   productId && this.product.getProduct(productId).subscribe((data)=>{
    console.warn(data)
    this.productData=data;
       
    })
  }

  submitProduct(data:products){
console.warn(data)
if(this.productData){
  data.id=this.productData.id
}
this.product.updateProduct(data).subscribe((result)=>{
  if(result){
    this.prductMessage="product has updated"
  }


})
setTimeout(()=>
{
  this.prductMessage=undefined},3000
)

  }
}
