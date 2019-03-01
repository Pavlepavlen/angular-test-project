import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../product.model';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {

  @Input() product: Product;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onClosedEmit = new EventEmitter<string>();

  show = true;

  constructor() {
  }

  ngOnInit() {
    this.product.img = decodeURI(this.product.img);
  }

  onClose(val: string) {
    this.show = false;
    this.onClosedEmit.emit(val);
  }

}
