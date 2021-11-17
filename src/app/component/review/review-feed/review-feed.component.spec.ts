import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IReview } from 'src/app/model/review';
import { ReviewService } from 'src/app/service/review.service';
import { RouterTestingModule } from '@angular/router/testing';

import { ReviewFeedComponent } from './review-feed.component';
import { ReviewComponent } from '../review/review.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ReviewFeedComponent', () => {
  let component: ReviewFeedComponent;
  let fixture: ComponentFixture<ReviewFeedComponent>;

  // ReviewService spys
  let getReviewsSpy: jasmine.Spy;
  let postReviewSpy: jasmine.Spy;
  let updateReviewSpy: jasmine.Spy;

  // Review-Feed spys
  let checkUserHasReviewedSpy: jasmine.Spy;
  let checkHalfRatingSpy: jasmine.Spy;
  let setStarsFromRatingSpy: jasmine.Spy;

  let expectedReviews: IReview[];
  let expectedPostedReview: IReview;
  let expectedUpdatedReview: IReview;

  beforeEach(async () => {

    expectedReviews = [
      {
        id: 0,
        authorId: 0,
        stars: 0,
        text: "test",
        submitted: new Date(2021,11,15)
      }
    ];

    expectedPostedReview = {
      id: 1,
      authorId: 0,
      stars: 5,
      text: "test",
      submitted: new Date(2021,11,15)
    };

    expectedUpdatedReview = {
      id: 0,
      authorId: 0,
      stars: 3.5,
      text: "test updated",
      submitted: new Date(2021,11,15)
    }

    const reviewServiceSpy = jasmine.createSpyObj('ReviewService', ['getReviewsByProductId',
     'postReviewForProduct',
     'updateReviewForProduct']);
    getReviewsSpy = reviewServiceSpy.getReviewsByProductId.and.returnValue(of(expectedReviews));
    postReviewSpy = reviewServiceSpy.postReviewForProduct.and.returnValue(of(expectedPostedReview));
    updateReviewSpy = reviewServiceSpy.updateReviewForProduct.and.returnValue(of(expectedUpdatedReview));

    const datePipeSpy = jasmine.createSpyObj('DatePipe', ['transform']);
    datePipeSpy.transform.and.returnValue("15 November, 2021, 12:00 AM");

    await TestBed.configureTestingModule({
      declarations: [ ReviewFeedComponent, ReviewComponent],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {provide: ReviewService, useValue: reviewServiceSpy},
        {provide: DatePipe, useValue: datePipeSpy},
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewFeedComponent);
    component = fixture.componentInstance;

    const reviewService = TestBed.inject(ReviewService);

    checkUserHasReviewedSpy = spyOn(component, 'checkUserHasReviewed').and.callThrough();
    checkHalfRatingSpy = spyOn(component, 'checkHalfRating').and.callThrough();
    setStarsFromRatingSpy = spyOn(component, 'setStarsFromRating').and.callThrough();

    // This component will only use localStorage to get user's id
    spyOn(localStorage, 'getItem').and.returnValue('1');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get reviews from reviewService', () => {
    expect(component.reviews).toEqual(expectedReviews);
    expect(getReviewsSpy.calls.any()).toBeTrue();
  });

  it('should check if user has already reviewed this product', () => {
    // Should have been called after onInit()
    expect(checkUserHasReviewedSpy.calls.any()).toBeTrue();

    // Set authorId to match the localStorage's mocked userId
    component.reviews[0].authorId = 1;
    component.checkUserHasReviewed();
    fixture.detectChanges();

    expect(component.hasAlreadyReviewed).toBeTrue();
    expect(component.reviewForm.get('reviewText')?.value).toEqual(expectedReviews[0].text);
    expect(component.reviewForm.get('stars')?.value).toEqual(expectedReviews[0].stars);

    // Has review form been set to mirror the user's existing review?
  });

  it('should set stars based on review rating', () => {
    component.setStarsFromRating(2);
    fixture.detectChanges();

    // Get elements
    let compiled = fixture.nativeElement;
    let starElements = compiled.querySelectorAll('.stars');

    let expectedStarValues = ['star', 'star', 'star_outline', 'star_outline', 'star_outline'];
    for (let i = 0; i < 5; i++) {
      expect(starElements[i].textContent).toEqual(expectedStarValues[i]);
    }
    
    // Try with 4.5
    component.setStarsFromRating(4.5);
    fixture.detectChanges();

    expectedStarValues = ['star', 'star', 'star', 'star', 'star_half'];
    for (let i = 0; i < 5; i++) {
      expect(starElements[i].textContent).toEqual(expectedStarValues[i]);
    }

  });

  it('should only allow a review to be submitted when form is valid', () => {
    expect(component.reviewForm.valid).toBeFalse();

    // Set text value > 3 chars
    component.reviewForm.controls['reviewText'].setValue("333");
    component.reviewForm.controls['stars'].setValue(3);
    
    expect(component.reviewForm.valid).toBeTrue();
  });

  it('should set stars back to saved rating after user moves mouse out', () => {
    let calls = setStarsFromRatingSpy.calls.count();
    component.onStarMouseOut();
    expect(setStarsFromRatingSpy.calls.count() === calls+1).toBeTrue();
  });

  it('should call function to update stars as they are moused over', () => {
    let calls = setStarsFromRatingSpy.calls.count();
    
    let compiled = fixture.nativeElement;
    let starElements: HTMLElement[] = compiled.querySelectorAll('.stars');

    // Move mouse over 3rd star
    starElements[2].dispatchEvent(new MouseEvent('mousemove'));

    fixture.detectChanges();

    expect(setStarsFromRatingSpy.calls.count()).toBe(calls+1);
    expect(setStarsFromRatingSpy).toHaveBeenCalledWith(2.5);
  });

  it('should post a review when submitted', () => {
    let callsPost = postReviewSpy.calls.count()
    let callsGet = getReviewsSpy.calls.count()

    // Arrange
    component.hasAlreadyReviewed = false;
    component.reviewForm.setValue({
      reviewText: expectedPostedReview.text,
      stars: expectedPostedReview.stars
    });

    // Act
    component.onReviewSubmit();

    // Assert
    expect(postReviewSpy.calls.count()).toBe(callsPost+1);
    expect(getReviewsSpy.calls.count()).toBe(callsGet+1);
  });

  it('should update a review when submitted if one was already authored', () => {
    let callsUpdate = updateReviewSpy.calls.count()
    let callsGet = getReviewsSpy.calls.count()

    // Arrange
    component.hasAlreadyReviewed = true;
    component.reviewForm.setValue({
      reviewText: expectedUpdatedReview.text,
      stars: expectedUpdatedReview.stars
    });

    // Act
    component.onReviewSubmit();

    // Assert
    expect(updateReviewSpy.calls.count()).toBe(callsUpdate+1);
    expect(getReviewsSpy.calls.count()).toBe(callsGet+1);
  });

});
