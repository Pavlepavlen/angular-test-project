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
  public categoryList = [];
  public choosenCategoryIndex = 0;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.categoryList.push('Show All');
    this.productsService.getData()
      .subscribe(data => {
        this.getCategoryList(data.products);
        this.filteredProducts = data.products;
        return this.products = data.products;
      });
  }

   assignProductsCopy() {
     this.filteredProducts = Object.assign([], this.products);
   }

   getCategoryList(products) {
    products.forEach(element => {
      this.categoryList.push(element.bsr_category);
    });
    this.categoryList = this.categoryList.filter((cat, index, arr) => index === arr.indexOf(cat));
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

   onCategoryChosen(category: string) {

    if  (category === 'Show All') {
      this.assignProductsCopy();
      this.choosenCategoryIndex = 0;
    } else {
      this.assignProductsCopy();
      this.choosenCategoryIndex = this.categoryList.indexOf(category);
      this.filteredProducts = this.filteredProducts.filter(item => {
        return item.bsr_category === category;
      });
    }
   }

   onClickMade(product: Product) {
     this.choosenElement = product;
   }

  onProductSelected(product: Product) {
    this.productWasSelected.emit(product);
  }

}
