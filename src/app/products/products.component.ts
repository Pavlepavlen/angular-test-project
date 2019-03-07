import { Component, OnInit } from '@angular/core';
import { IProduct } from '../interfaces/product.model';
import { Observable, observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as ProductActions from '../store/productsReducer/products.actions';
import { AppStates, ProductsState } from '../store/productsReducer/products.reducer.factory';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productsState$: Observable<ProductsState>;
  productSelected;

  constructor(private store: Store<AppStates>) {
    this.productsState$ = store.select('productsState');
    this.productsState$.subscribe(data => {
      this.productSelected = data.choosenProduct;
    });
  }

  ngOnInit() {
  }

}
