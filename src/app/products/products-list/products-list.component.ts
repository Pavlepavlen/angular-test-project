import { Component, OnInit, EventEmitter, Output, AfterViewInit, OnChanges } from '@angular/core';
import { ProductsService } from 'src/app/products.service';
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

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  public productsState$: Observable<ProductsState>;

  public products: IProduct[];
  public filteredProducts: IProduct[];
  public choosenElement = {};
  public categoryList = [];
  public choosenCategoryIndex = 0;
  public inputValue;

  public actualCategory;

  constructor(private productsService: ProductsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService,
              private store: Store<AppStates>) {
    this.productsState$ = store.select('productsState');
    this.productsState$.subscribe(data => {

      this.filteredProducts = data.filteredProducts;
      this.categoryList = this.categoryService.createCategoryList(data.initialProducts);
    });
    this.store.dispatch(new ProductActions.GetProducts());

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(url => {
      this.inputValue = url.productName;
    });
    this.productsService.getData()
      .subscribe(() => {
         this.onCategoryChosen(this.getCategoryPathFromURL());
      });
  }

  getCategoryPathFromURL(): string {
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

  onSearchInputEntered() {
    if ( !this.inputValue ) {
        if (this.getCategoryPathFromURL() === 'Show All') {
          this.store.dispatch(new ProductActions.CopyProducts());
          this.router.navigate([], {});
          return;
    } else {
          this.onCategoryChosen(this.getCategoryPathFromURL());
          return;
        }
    }
    this.filterProducts();
    this.router.navigate([], {queryParams: {productName: this.inputValue}});
  }

  onCategoryChosen(category: string) {
    if  (category === 'Show All') {
    this.store.dispatch(new ProductActions.CopyProducts());
    this.choosenCategoryIndex = 0;

    this.filterProducts();

    this.router.navigate([''], {queryParams: this.router.parseUrl(this.router.url).queryParams});
  } else {
    this.store.dispatch(new ProductActions.CopyProducts());

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
      this.store.dispatch(new ProductActions.FilterProducts(this.inputValue));
    } else {
      this.store.dispatch(new ProductActions.CopyProducts());
    }
  }

}
