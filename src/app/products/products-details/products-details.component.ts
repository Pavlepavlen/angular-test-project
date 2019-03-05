import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IProduct } from '../../interfaces/product.model';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as ProductActions from '../../store/productsReducer/products.actions';
import { AppStates, ProductsState } from '../../store/productsReducer/products.reducer.factory';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {

  // @Input() product: IProduct;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onClosedEmit = new EventEmitter<string>();

  product: IProduct;
  productsState$: Observable<ProductsState>;

  constructor(private store: Store<AppStates>) {
    this.productsState$ = store.select('productsState');
    this.productsState$.subscribe(data => {
      this.product = data.choosenProduct;
    });
  }

  ngOnInit() {
    this.product.img = decodeURI(this.product.img);
  }

  onClose(val: string) {
    this.store.dispatch(new ProductActions.ChooseProduct(null));
    /* this.onClosedEmit.emit(val); */
  }

}
