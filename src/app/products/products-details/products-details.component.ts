import { Component, OnInit, Input } from '@angular/core';

import { Product } from '../product.model';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {

  @Input() product: Product;

  constructor() {
   }

  ngOnInit() {
    this.product.img = decodeURI(this.product.img);
  }

}
