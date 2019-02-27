import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProducts } from './products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = 'https://demo3907346.mockable.io/products';

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<IProducts>(this.url);
  }
}
