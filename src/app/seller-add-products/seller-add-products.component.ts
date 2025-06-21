import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductsService } from '../service/products.service';
import { products } from '../data-type';

@Component({
  selector: 'app-seller-add-products',
  imports: [FormsModule],
  templateUrl: './seller-add-products.component.html',
  styleUrl: './seller-add-products.component.css',
})
export class SellerAddProductsComponent {
  addProductMessage:string|undefined;
  constructor(private product: ProductsService) {}

  submitProduct(data: products) {
    
    this.product.addProduct(data).subscribe((result)=>{
      console.warn(result)
      if(result){
        this.addProductMessage="product added succesfully";
      }
      setTimeout(()=>(this.addProductMessage=undefined),3000)
    });
  }
}
