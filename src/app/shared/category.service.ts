import { Injectable } from '@angular/core';

import { IProduct } from '../interfaces/product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as ProductActions from '../store/productsReducer/products.actions';
import { AppStates, ProductsState } from '../store/productsReducer/products.reducer.factory';

@Injectable()

export class CategoryService {


    categoryList = [];
    tempList = [];
    filteredPath;


    constructor(private router: Router, private activatedRoute: ActivatedRoute) {}


    createCategoryList(products: IProduct[]) {
        products.forEach(element => {
            this.tempList.push(element.bsr_category);
        });
        this.categoryList = this.tempList.filter((cat, index, arr) => index === arr.indexOf(cat));
        this.categoryList.unshift('Show All');
        return this.categoryList;
    }

    getCategoryPathFromURL(): string {
        if (this.router.url.indexOf('/categories') !== -1) {
          const tempPath = this.router.url.split('/')[3].split('');
          const questionMarkIndex = tempPath.indexOf('?');
          if (questionMarkIndex !== -1) {
            this.filteredPath = tempPath.join('').slice(0, questionMarkIndex).split('%20').join(' ');
          } else {
            this.filteredPath = tempPath.join('').split('%20').join(' ');
          }
          return this.filteredPath;
        } else {
          return 'Show All';
        }
      }

}
