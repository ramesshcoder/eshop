import { Component, resource } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { products } from '../data-type';
import { NgFor } from '@angular/common';
import { faTrash,faPenToSquare } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-seller-home',
  imports: [NgFor,FontAwesomeModule,RouterModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {
productList: undefined| products[]
productMessage:undefined|string
  constructor(private product: ProductsService) {
    this.product.productList().subscribe((result) => {
      console.warn(result);
      this.productList=result
    });
  }
  deleteProduct(id:string){
    const cleanId=  id.trim().replace(/[^a-zA-Z0-9\-]/g, '');
     console.log('Deleting ID:', cleanId)
    
this.product.deleteProduct(cleanId).subscribe((result)=>{
  if(result){
    this.productMessage="product is deleted succesfully"
    this.loadProducts()
  }
})
setTimeout(()=>{
  this.productMessage=undefined},3000);
  }
  loadProducts() {
  this.product.productList().subscribe((data) => {
    this.productList = data;
  });
}

}