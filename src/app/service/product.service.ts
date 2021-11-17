import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
//importing the model and mock database
import { IProduct } from '../model/product';
import { PRODUCTS } from '../database/products';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts(): Observable<IProduct[]> {
    const products = of(PRODUCTS);
    return products;
  }

}
