import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from '../../../interfaces/product.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import * as ProductActions from '../../../store/productsReducer/products.actions';
import { AppStates, ProductsState } from '../../../store/productsReducer/products.reducer.factory';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.css']
})
export class ProductsItemComponent implements OnInit {

  public productsState$: Observable<ProductsState>;

  @Input() product: IProduct;

  public slicedProductName: string;
  public isSelected: boolean;
  public selectedProduct: IProduct;

  constructor(private store: Store<AppStates>) {
    this.productsState$ = store.select('productsState');
    this.productsState$.subscribe(data => {
      this.selectedProduct = data.choosenProduct;
    });
    this.isSelected = false;
  }

  ngOnInit() {
    this.product.img = decodeURI(this.product.img);
    this.slicedProductName = this.product.name.split(' ').slice(0, 3).join(' ');
  }

  onSelected() {
    this.store.dispatch(new ProductActions.ChooseProduct(this.product));
    this.addActiveClass();
  }

  addActiveClass() {
    // compare by values not by references
    if ( JSON.stringify(this.selectedProduct) === JSON.stringify(this.product) ) {
      this.isSelected = true;
    }
  }

}
