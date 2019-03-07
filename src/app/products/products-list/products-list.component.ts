import { Component, OnInit, EventEmitter, Output, AfterViewInit, OnChanges } from '@angular/core';
import { ProductsService } from 'src/app/shared/products.service';
import { IProduct } from '../../interfaces/product.model';
import { IProducts } from '../../interfaces/products.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ReturnStatement } from '@angular/compiler';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as ProductActions from '../../store/productsReducer/products.actions';
import { AppStates, ProductsState } from '../../store/productsReducer/products.reducer.factory';
import { CategoryService } from 'src/app/shared/category.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  prod;

  public productsState$: Observable<ProductsState>;

  public products: IProduct[];
  public filteredProducts: IProduct[];
  public choosenElement = {};
  public categoryList = [];
  public inputValue;
  public selectedCategory;
  public params;


  constructor(private productsService: ProductsService,
              private router: Router,
              private categoryService: CategoryService,
              private aRoute: ActivatedRoute,
              private store: Store<AppStates>,
              private loc: Location) {
    this.productsState$ = store.select('productsState');
    this.productsState$.subscribe(data => {

      this.categoryList = this.categoryService.createCategoryList(data.initialProducts);
      this.selectedCategory = data.selectedCategory;
      this.filteredProducts = this.productsService.initialCheck(data.filteredProducts, this.selectedCategory, this.inputValue);
    });
  }

  ngOnInit() {
    this.onCategoryChosen(this.categoryService.getCategoryPathFromURL());
    this.inputValue = this.router.parseUrl(this.router.url).queryParams.productName;
    this.onSearchInputCheck();
  }


  onSearchInputCheck() {
    if ( !this.inputValue ) {
      this.store.dispatch(new ProductActions.CopyProducts());
      this.router.navigate([], {queryParams: {}});
    }
    this.store.dispatch(new ProductActions.FilterProducts(this.inputValue));
    this.router.navigate([], {queryParams: {productName: this.inputValue}});
  }

  onCategoryChosen(category: string) {
    this.selectedCategory = category;
    const url = ['/products/categories/', this.selectedCategory].join('');
    this.loc.go(url);
    this.store.dispatch(new ProductActions.ChooseCategory(this.selectedCategory));
    this.store.dispatch(new ProductActions.FilterProducts(this.inputValue));
  }
}

