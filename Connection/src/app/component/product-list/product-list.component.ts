import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/model/product';

import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  searchText: string ="";

    products: IProduct[] = [];

  constructor(private ProductService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.ProductService.getProducts().subscribe(products => this.products = products);
    this.products.sort((a, b) => (a.stars > b.stars) ? -1 : 1);
  }



}
