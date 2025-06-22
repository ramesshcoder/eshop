import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgIf, NgSwitch, NgSwitchCase, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf, NgSwitch, NgSwitchCase,TitleCasePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';

  constructor(private route: Router,private product :ProductsService) {
    this.route.events.subscribe((val: any) => {
      if (val instanceof NavigationEnd) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = 'seller';

          // ✅ Correct parsing from object
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore); // No [0] here
          this.sellerName = sellerData?.name || ''; // Safe fallback
        } else {
          this.menuType = 'default';
        }
      }
    });
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
 searchProducts(query: KeyboardEvent) {
  const element = query.target as HTMLInputElement;
  const searchTerm = element.value.trim();

  if (searchTerm) {
    this.product.searchProducts(searchTerm).subscribe({
      next: (result) => {
        console.log("Search result:", result);
      },
      error: (err) => {
        console.error("Error fetching search results", err);
      }
    });
  }
}


}
