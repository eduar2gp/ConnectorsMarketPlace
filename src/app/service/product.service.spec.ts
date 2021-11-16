import { TestBed } from '@angular/core/testing';
import { IProduct } from '../model/product';
import { ProductService } from './product.service';
import { PRODUCTS } from '../database/products';


describe('ProductService', () => {
  let service: ProductService;
  let expectedProd: IProduct[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it('should return value from observable',
  (done: DoneFn) => {
  service.getProducts().subscribe(value => {
    expect(value).toEqual(PRODUCTS);
    done();
  });
});
});
