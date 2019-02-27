import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../product.model';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.css']
})
export class ProductsItemComponent implements OnInit {

  @Input() product: Product;

  @Input() selected: {};

  @Output() productSelected = new EventEmitter<void>();

  // public selected = false;

  public listClass = true;

  public listClasses = '.list-item-wrapper';

  constructor() {
    this.selected = false;
    this.listClass = true;
  }

  ngOnInit() {
    this.product.img = decodeURI(this.product.img);
  }

  onSelected() {
    this.selected = true;
    this.productSelected.emit();
  }

  classes() {
    if ( this.selected ) {
     this.listClasses = '.list-item-wrapper active';
    } else {
      this.listClasses = '.list-item-wrapper';
    }
  }

}
