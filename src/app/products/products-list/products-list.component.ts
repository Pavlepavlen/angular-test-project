import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProductsService } from 'src/app/products.service';
import { Product } from '../product.model';
import { IProducts } from '../../products';
import { Router } from '@angular/router';
import { ReturnStatement } from '@angular/compiler';

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
  public inputValue;

  constructor(private productsService: ProductsService,
              private router: Router) {}

  ngOnInit() {
    this.categoryList.push('Show All');
    this.productsService.getData()
      .subscribe(data => {
        this.getCategoryList(data.products);
        this.filteredProducts = data.products;
        this.inputValue = this.router.parseUrl(this.router.url).queryParams.productName;
        this.products = data.products;
        this.onCategoryChosen(this.getCategoryPath());
        console.log(this.router.parseUrl(this.router.url).queryParams);
        // return this.products = data.products;
      });
  }

  getCategoryPath(): string {
    let filteredPath;
    if (this.router.url.indexOf('/categories') !== -1) {
      const tempPath = this.router.url.split('/')[2].split('');
      const questionMarkIndex = tempPath.indexOf('?');
      if (questionMarkIndex !== -1) {
        filteredPath = tempPath.join('').slice(0, questionMarkIndex).split('%20').join(' ');
      } else {
        filteredPath = tempPath.join('').split('%20').join(' ');
      }
      return filteredPath;
    } else {
      return 'Show All';
    }
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

   filterItem() {
     if ( !this.inputValue ) {
       if (this.getCategoryPath() === 'Show All') {
          this.assignProductsCopy();
          this.router.navigate([], {});
          return;
       } else {
          this.onCategoryChosen(this.getCategoryPath());
          return;
       }
     }

     this.filterProducts();

     this.router.navigate([], {queryParams: {productName: this.inputValue}});
   }

   onCategoryChosen(category: string) {
     console.log('hello');
     if  (category === 'Show All') {
      this.assignProductsCopy();
      this.choosenCategoryIndex = 0;

      this.filterProducts();

      this.router.navigate([''], {queryParams: this.router.parseUrl(this.router.url).queryParams});
    } else {
      this.assignProductsCopy();

      this.filterProducts();

      this.choosenCategoryIndex = this.categoryList.indexOf(category);
      this.filteredProducts = this.filteredProducts.filter(item => {
        return item.bsr_category === category;
      });

      if (!this.inputValue) {
        this.router.navigate(['/categories', category], {});
      } else {
        this.router.navigate(['/categories', category], {queryParams: this.router.parseUrl(this.router.url).queryParams});
      }
    }
   }

   filterProducts() {
     if (this.inputValue) {
        this.filteredProducts = this.filteredProducts.filter(item => {
          return !item.name.toLowerCase().indexOf(this.inputValue.toLowerCase());
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
