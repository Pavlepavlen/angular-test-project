import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProductsService } from 'src/app/products.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Output() productWasSelected = new EventEmitter<Product>();

  public products = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getData()
      .subscribe(data => this.products = data);
  }

  onProductSelected(product: Product) {
    this.productWasSelected.emit(product);
  }

}
