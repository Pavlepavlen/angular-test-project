import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProducts } from './interfaces/products.model';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private url = 'https://demo3907346.mockable.io/products';

  constructor(private http: HttpClient) { }

  getData(): Observable<IProducts> {
    return this.http.get<IProducts>(this.url);
  }
}
