import { Injectable } from '@angular/core';

import { IProduct } from '../interfaces/product.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as ProductActions from '../store/productsReducer/products.actions';
import { AppStates, ProductsState } from '../store/productsReducer/products.reducer.factory';

@Injectable()

export class CategoryService {

    productsState$;
    filteredProducts;
    categoryList = [];
    tempList = [];

    constructor(private router: Router, private store: Store<AppStates>) {

        this.productsState$ = store.select('productsState');
        this.productsState$.subscribe(data => {
            this.createCategoryList(data.initialProducts);
            this.filteredProducts = data.filteredProducts;
        });
    }


    createCategoryList(products: IProduct[]) {
        products.forEach(element => {
            this.tempList.push(element.bsr_category);
        });
        this.categoryList = this.tempList.filter((cat, index, arr) => index === arr.indexOf(cat));
        this.categoryList.unshift('Show All');
        return this.categoryList;
    }
}
