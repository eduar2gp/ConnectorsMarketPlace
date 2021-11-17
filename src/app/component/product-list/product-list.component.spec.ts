import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { SearchpipePipe } from 'src/app/searchpipe.pipe';
import { ProductService } from 'src/app/service/product.service';
import { ProductListComponent } from './product-list.component';
import { IProduct } from 'src/app/model/product';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ReviewService } from 'src/app/service/review.service';
import { of } from 'rxjs';
import { Renderer2 } from '@angular/core';


describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let prodService: ProductService;

  beforeEach(async () => {
    
    let productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts']);
    productServiceSpy.getProducts.and.returnValue(of([]));

    let reviewServiceSpy = jasmine.createSpyObj('ReviewService', ['getAllReviews']);
    reviewServiceSpy.getAllReviews.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [ ProductListComponent, SearchpipePipe ],
      imports: [
        MatCardModule,
        MatIconModule,
      ],
      providers: [
        {provide: ProductService, useValue: productServiceSpy},
        {provide: ReviewService, useValue: reviewServiceSpy},
        Renderer2,
      ],
     
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
