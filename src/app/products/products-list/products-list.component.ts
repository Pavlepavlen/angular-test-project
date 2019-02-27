import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProductsService } from 'src/app/products.service';
import { Product } from '../product.model';
import { IProducts } from '../../products';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Output() productWasSelected = new EventEmitter<Product>();

  public products = [];
  public filteredProducts = [];
  choosenElement = {};
  prod = 'products';

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getData()
      .subscribe(data => {
        this.assignProductsCopy(data);
        return this.products = data;
      });
  }

  onClickMade(productElem) {
    this.choosenElement = productElem;
    console.log(this.choosenElement);
  }

  assignProductsCopy(data) {
    if (data !== 0) {
      return this.filteredProducts = Object.assign([], data);
    }
    this.filteredProducts = Object.assign([], this.products);
  }

  filterItem(value) {
    value = value.trim();
    if ( value === '' ) {
      this.choosenElement = {};
    }

    if ( !value ) {
      this.assignProductsCopy(0);
    }
    this.filteredProducts = Object.assign([], this.products[this.prod]);
    const remainProducts = this.filteredProducts.filter(item => {
      return !item.name.toLowerCase().indexOf(value.toLowerCase());
    });
    this.filteredProducts[this.prod] = remainProducts;
  }

  onProductSelected(product: Product) {
    this.productWasSelected.emit(product);
  }

}
