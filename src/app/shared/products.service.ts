import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProducts } from '../interfaces/products.model';
import { IProduct } from '../interfaces/product.model';

import { Store } from '@ngrx/store';
import * as ProductActions from '../store/productsReducer/products.actions';
import { AppStates } from '../store/productsReducer/products.reducer.factory';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private url = 'https://demo3907346.mockable.io/products';

  constructor(private http: HttpClient, private store: Store<AppStates>) {}

  getData(): Observable<IProducts> {
    return this.http.get<IProducts>(this.url);
  }

  initialCheck(prod: IProduct[], cat: string, inputValue: string) {
    let filteredProducts = prod.filter(item => {
      if (cat === 'Show All') {
          return item;
      }
      return item.bsr_category === cat;
    });

    filteredProducts = filteredProducts.filter(item => {
      if (!inputValue) {
        return item;
      }
      return !item.name.toLowerCase().indexOf(inputValue.toLowerCase());
    });

    return filteredProducts;
  }

  onInitialSearchInputCheck(val) {
    if ( !val ) {
      this.store.dispatch(new ProductActions.CopyProducts());
      return;
    }
    this.store.dispatch(new ProductActions.FilterProducts(val));
  }

  onInitialCategoryChosen(category: string) {

    this.store.dispatch(new ProductActions.ChooseCategory(category));
  }

}
