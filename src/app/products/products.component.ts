import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  selectedProduct;
  show: boolean;

  constructor() { }

  ngOnInit() {
  }

  onClosed(event: any) {
    if (event === 'close') {
      this.selectedProduct = null;
    }
  }

}
