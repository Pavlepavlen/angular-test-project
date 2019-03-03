import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductsService } from './products.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductsDetailsComponent } from './products/products-details/products-details.component';
import { ProductsItemComponent } from './products/products-list/products-item/products-item.component';
import { JoinPipe } from './join.pipe';

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
    JoinPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
