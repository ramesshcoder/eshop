import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../service/products.service';
import { products } from '../data-type';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [NgbCarouselModule ,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  trendyProducts:undefined|products[]
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  
  constructor(private product:ProductsService){

  }
  ngOnInit():void{
    this.product.trendyProducts().subscribe((data)=>{
      this.trendyProducts=data
    })
  }

}
