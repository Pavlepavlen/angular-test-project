import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { ProductsService } from './products.service';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductsDetailsComponent } from './products/products-details/products-details.component';
import { ProductsItemComponent } from './products/products-list/products-item/products-item.component';
import { GetProductsEffect } from './store/productsEffects/products.effect';

// import { productsReducer } from './store/productsReducer/products.reducer';
import { productsReducers } from './store/productsReducer/products.reducer.factory';
import { CategoryService } from './shared/category.service';
import { fromEventPattern } from 'rxjs';

const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'categories/:category', component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    ProductsListComponent,
    ProductsDetailsComponent,
    ProductsItemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(
      appRoutes
    ),
    StoreModule.forRoot(productsReducers),
    EffectsModule.forRoot([
      GetProductsEffect
    ])
  ],
  providers: [ProductsService, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
