import { Component } from '@angular/core';
import { IProducts } from 'src/app/interfaces/products.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import * as ProductActions from './store/productsReducer/products.actions';
import { AppStates, ProductsState } from './store/productsReducer/products.reducer.factory';
import { CategoryService } from 'src/app/shared/category.service';
import { Effect, Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-test-app';
constructor(private store: Store<AppStates>) {
  // this.store.dispatch(new ProductActions.GetProducts());
}
}
