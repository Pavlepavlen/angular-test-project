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

  public products: IProducts['products'];
  public filteredProducts = [];
  public choosenElement = {};

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getData()
      .subscribe(data => {
        this.filteredProducts = data.products;
        return this.products = data.products;
      });
  }

   assignProductsCopy() {
     this.filteredProducts = Object.assign([], this.products);
   }

   filterItem(value) {
     value = value.trim();
     if ( !value ) {
       this.assignProductsCopy();
     }
     this.filteredProducts = this.filteredProducts.filter(item => {
       return !item.name.toLowerCase().indexOf(value.toLowerCase());
     });
   }

   onClickMade(product) {
     this.choosenElement = product;
   }

  onProductSelected(product: Product) {
    this.productWasSelected.emit(product);
  }

}
