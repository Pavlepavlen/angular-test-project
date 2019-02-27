import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public countProducts: number;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getData()
      .subscribe(data => this.countProducts = data.count_products);
  }
}
