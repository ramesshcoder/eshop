import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../service/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';


@Component({
  selector: 'app-seller',
  standalone:true,
  imports: [FormsModule],
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent {
  constructor(private seller:SellerService,private router:Router){}

sellerData(val:SignUp){
  if (!val.name||!val.number||!val.email||!val.password){
    alert("Please fill out all fields before submitting.");
    return;
  }
 this.seller.addSeller(val).subscribe(response=>{
  console.log('seller added:',response);
  alert('seller registered successfully');
  localStorage.setItem('seller', JSON.stringify(response));

  if(response){
    this.router.navigate(['seller-home'])
  }
 });

}
}
