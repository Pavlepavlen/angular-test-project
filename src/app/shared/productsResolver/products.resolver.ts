import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ProductsService } from '../products.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as ProductActions from '../../store/productsReducer/products.actions';
import { AppStates, ProductsState } from '../../store/productsReducer/products.reducer.factory';

@Injectable()
export class ProductResolver implements Resolve<any> {

    isLoaded: boolean;
    productsState$;

  constructor(private productsService: ProductsService, private store: Store<AppState>) {

    this.store.dispatch(new ProductActions.GetProducts());
    this.productsState$ = store.select('productsState');
    this.productsState$.subscribe(data => {

        this.isLoaded = data.isLoadSuccess;
      });
  }

  resolve() {
      if (this.isLoaded) {
        return true;
      } else {
        return this.productsService.getData();
      }
    }
}
