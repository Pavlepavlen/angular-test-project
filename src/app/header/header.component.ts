import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public countProducts: number;

  mobileToggler: boolean;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.mobileToggler = false;
    this.productsService.getData()
      .subscribe(data => this.countProducts = data.count_products);
  }

  onClick(event: any) {
    if (event.target.nodeName === 'I' && this.mobileToggler === false) {
      event.target.classList.remove('animate-bars-close');
      event.target.classList.add('animate-bars-open');
      this.mobileToggler = true;
    } else {
      event.target.classList.remove('animate-bars-open');
      event.target.classList.add('animate-bars-close');
      this.mobileToggler = false;
    }
  }
}
