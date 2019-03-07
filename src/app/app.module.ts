import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { ProductsService } from './shared/products.service';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductsDetailsComponent } from './products/products-details/products-details.component';
import { ProductsItemComponent } from './products/products-list/products-item/products-item.component';
import { GetProductsEffect } from './store/productsEffects/products.effect';
import { ProductResolver } from './shared/productsResolver/products.resolver';


import { productsReducers } from './store/productsReducer/products.reducer.factory';
import { CategoryService } from './shared/category.service';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'products/categories', redirectTo: 'products/categories/Show All', pathMatch: 'full'},
  { path: 'products/categories/:categoryName', component: ProductsComponent, resolve: {prod: ProductResolver} }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    ProductsListComponent,
    ProductsDetailsComponent,
    ProductsItemComponent,
    HomeComponent
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
  providers: [ProductsService, CategoryService, ProductResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
