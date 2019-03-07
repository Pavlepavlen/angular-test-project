import { Component, OnInit, EventEmitter, Output, AfterViewInit, OnChanges } from '@angular/core';
import { ProductsService } from 'src/app/shared/products.service';
import { IProduct } from '../../interfaces/product.model';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ProductActions from '../../store/productsReducer/products.actions';
import { AppStates, ProductsState } from '../../store/productsReducer/products.reducer.factory';
import { CategoryService } from 'src/app/shared/category.service';

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


  constructor(private productsService: ProductsService,
              private router: Router,
              private categoryService: CategoryService,
              private aRoute: ActivatedRoute,
              private store: Store<AppStates>) {
    this.productsState$ = store.select('productsState');
    this.productsState$.subscribe(data => {

      this.categoryList = this.categoryService.createCategoryList(data.initialProducts);
      this.selectedCategory = data.selectedCategory;
      this.filteredProducts = this.productsService.initialCheck(data.filteredProducts, this.selectedCategory, this.inputValue);
    });
  }

  ngOnInit() {
    this.aRoute.queryParams.subscribe(data => {
      this.inputValue = data.productName;
    });

    this.productsService.onInitialCategoryChosen(this.categoryService.getCategoryPathFromURL());

    this.productsService.onInitialSearchInputCheck(this.inputValue);

  }


  onSearchInputCheck() {
    if ( !this.inputValue ) {
      this.store.dispatch(new ProductActions.CopyProducts());
      this.router.navigate(['/products/categories/', this.selectedCategory], {});
      return;
    }
    this.store.dispatch(new ProductActions.FilterProducts(this.inputValue));
    this.router.navigate(['/products/categories/', this.selectedCategory], {queryParams: {productName: this.inputValue}});

  }

  onCategoryChosen(category: string) {
    this.selectedCategory = category;
    if (this.inputValue) {
      this.router.navigate(['/products/categories/', this.selectedCategory], {queryParams: {productName: this.inputValue}});
    } else {
      this.router.navigate(['/products/categories/', this.selectedCategory], {});
    }
    this.store.dispatch(new ProductActions.ChooseCategory(this.selectedCategory));
    this.store.dispatch(new ProductActions.FilterProducts(this.inputValue));
  }
}

