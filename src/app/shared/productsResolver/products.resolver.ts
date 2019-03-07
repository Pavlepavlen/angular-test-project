import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ProductsService } from '../products.service';
import { IProduct } from 'src/app/interfaces/product.model';
import { IProducts } from 'src/app/interfaces/products.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as ProductActions from '../../store/productsReducer/products.actions';
import { AppStates, ProductsState } from '../../store/productsReducer/products.reducer.factory';
import { CategoryService } from 'src/app/shared/category.service';

@Injectable()
export class ProductResolver implements Resolve<any> {

    isLoaded: boolean;
    productsState$;

  constructor(private productsService: ProductsService, private store: Store<AppState>) {

    this.store.dispatch(new ProductActions.GetProducts());
  }

  resolve(route: ActivatedRouteSnapshot) {
        return this.productsService.getData();
      }
}
