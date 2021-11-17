import { DatePipe } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { IReview } from 'src/app/model/review';
import { IUser } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

import { ReviewComponent } from './review.component';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;

  let getUserByIdSpy: jasmine.Spy;

  /** Date review was submitted after going through date pipe */
  let expectedDate: string = "15 November, 2021, 12:00 AM";

  /** Review that would be injected by host component */
  let expectedReview: IReview;

  /** Author of review */
  let expectedAuthor: IUser;

  beforeEach(async () => {

    expectedAuthor = {
      id: 0,
      email: "test@gmail.com",
      password: "pass",
      firstName: "bob",
      lastName: "smith"
    };

    // Spy user service's getUserById
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUserById']);
    getUserByIdSpy = userServiceSpy.getUserById.and.returnValue(of(expectedAuthor));
    
    const datePipeSpy = jasmine.createSpyObj('DatePipe', ['transform']);
    datePipeSpy.transform.and.returnValue(expectedDate);

    await TestBed.configureTestingModule({
      declarations: [ ReviewComponent ],
      imports: [
        MatCardModule,
        MatIconModule,
        RouterModule,
      ],
      providers: [
        {provide: UserService, useValue: userServiceSpy},
        {provide: DatePipe, useValue: datePipeSpy},
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;

    const userService = TestBed.inject(UserService);

    expectedReview = {
      id: 0,
      authorId: 0,
      stars: 0,
      text: "test",
      submitted: new Date(2021,11,15)
    };

    // Initialize review without a host component
    component.review = expectedReview;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the review passed by host component', () => {
    expect(component.review).toBe(expectedReview);
  });

  it('should function without being passed a review by host', () => {
    // Create component without initializing review
      const fixtureNoReview = TestBed.createComponent(ReviewComponent);
      const componentNoReview = fixtureNoReview.componentInstance;

      fixtureNoReview.detectChanges();

      // Checking that subsequent logic was not triggered
      expect(componentNoReview.author).toBeNull();
  })

  it('should not display the review card when review is undefined', () => {
    // Create component without initializing review
    const fixtureNoReview = TestBed.createComponent(ReviewComponent);
    const componentNoReview = fixtureNoReview.componentInstance;

    fixtureNoReview.detectChanges();

    const compiled = fixtureNoReview.nativeElement;
    const cardElement = compiled.querySelectorAll('mat-card');
    
    expect(cardElement.length).toBe(0);
  });

  it('should retreive the review author', () => {
    expect(component.author).toBe(expectedAuthor);
    expect(getUserByIdSpy.calls.any()).toBeTrue();
  });

  it('should convert the submitted date', ()=> {
    expect(component.submittedDate).toBe(expectedDate);
  });

  it('should set up variables to display review stars', () => {
    // reviewStarSetup() should have been called when component was initialized
    // Initialized with whole number review
    expect(component.reviewIsWholeNumber).toBeTrue();
    expect(component.starsEmpty.length).toBe(5);
    expect(component.starsFilled.length).toBe(0);

    // Test when review is not a whole number
    component.review!.stars = 1.5;
    component.reviewStarsSetup();

    expect(component.reviewIsWholeNumber).toBeFalse();
    expect(component.starsEmpty.length).toBe(3);
    expect(component.starsFilled.length).toBe(1);
  });

  it('should display author info and date in html', ()=> {
    const compiled = fixture.nativeElement;
    const subtitleElements = compiled.querySelectorAll('mat-card-subtitle');

    expect(subtitleElements.length).toBe(2);
    expect(subtitleElements[0].textContent).toContain(expectedAuthor.firstName);
    expect(subtitleElements[0].textContent).toContain(expectedAuthor.lastName);
    expect(subtitleElements[1].textContent).toContain(component.submittedDate);
    
  });

  it('should not display author info when author is null', () => {

    component.author = null;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const subtitleElements = compiled.querySelectorAll('mat-card-subtitle');

    expect(subtitleElements.length).toBe(1);
  });

  it('should display stars based on review rating', () => {
    // Retrieve elements
    let compiled = fixture.nativeElement;
    let starsFilled = compiled.querySelectorAll('.star-filled');
    let starsHalf = compiled.querySelectorAll('.star-half');
    let starsEmpty = compiled.querySelectorAll('.star-empty');

    // Test values from expectedReview's rating
    expect(starsFilled.length).toBe(component.starsFilled.length);
    expect(starsEmpty.length).toBe(component.starsEmpty.length);
    expect(starsHalf.length).toBe(0);

    // Test with new rating
    component.review!.stars = 1.5;
    component.reviewStarsSetup();
    fixture.detectChanges();

    // Retrieve elements again
    compiled = fixture.nativeElement;
    starsFilled = compiled.querySelectorAll('.star-filled');
    starsHalf = compiled.querySelectorAll('.star-half');
    starsEmpty = compiled.querySelectorAll('.star-empty');

    // Test changed values
    expect(starsFilled.length).toBe(component.starsFilled.length);
    expect(starsEmpty.length).toBe(component.starsEmpty.length);
    expect(starsHalf.length).toBe(1);
  });

  it('should display text based on review content', () => {
    const compiled = fixture.nativeElement;
    const textElement = compiled.querySelectorAll('p');
    
    expect(textElement[0].textContent).toContain(component.review!.text);
  });

});
