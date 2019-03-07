import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProducts } from '../interfaces/products.model';
import { IProduct } from '../interfaces/product.model';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private url = 'https://demo3907346.mockable.io/products';

  constructor(private http: HttpClient) { }

  getData(): Observable<IProducts> {
    return this.http.get<IProducts>(this.url);
  }

  initialCheck(prod: IProduct[], cat: string, inputValue: string) {
    let filteredProducts = prod.filter(item => {
      if (cat === 'Show All') {
          return item;
      }
      return item.bsr_category === cat;
    });

    filteredProducts = filteredProducts.filter(item => {
      if (!inputValue) {
        return item;
      }
      return !item.name.toLowerCase().indexOf(inputValue.toLowerCase());
    });

    return filteredProducts;
  }

}
