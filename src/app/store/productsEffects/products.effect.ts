import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as ProductsActions from '../productsReducer/products.actions';
import { ProductsService } from '../../shared/products.service';

@Injectable()

export class GetProductsEffect {
    constructor(private actions$: Actions, private productsService: ProductsService) {}

    @Effect()
    loadProducts$ = this.actions$.pipe(
        ofType(ProductsActions.GET_PRODUCTS),
        switchMap(() => {
            return this.productsService.getData().pipe(
                map(data => new ProductsActions.GetProductsSuccess(data.products)),
                catchError(error => of(new ProductsActions.GetProductsFailed(error)))
            );
        })
    );
}
