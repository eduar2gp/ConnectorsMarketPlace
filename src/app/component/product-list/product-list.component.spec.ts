import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { SearchpipePipe } from 'src/app/searchpipe.pipe';
import { ProductService } from 'src/app/service/product.service';
import { ProductListComponent } from './product-list.component';
import { IProduct } from 'src/app/model/product';


describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let prodService: ProductService;

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      declarations: [ ProductListComponent, SearchpipePipe ],
 
     
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, 'getProducts').and.callThrough();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should set getProducts to true', fakeAsync(() => {
    component.getProducts();
    expect(component.getProducts).toBeTruthy();

 }));
 it('expects getProducts() to have been called', function () {
  // make the call to this function
  component.getProducts()
  // Check internal function
  expect(component.getProducts).toHaveBeenCalled();
});
});
