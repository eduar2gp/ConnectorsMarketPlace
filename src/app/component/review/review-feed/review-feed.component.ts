import { AfterViewInit, Component, Input, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { IReview } from 'src/app/model/review';
import { ReviewService } from 'src/app/service/review.service';
import { UserService } from 'src/app/service/user.service';

/**
 * Displays a list of reviews for a product and allows the user to submit a review.
 */
@Component({
  selector: 'app-review-feed',
  templateUrl: './review-feed.component.html',
  styleUrls: ['./review-feed.component.css']
})
export class ReviewFeedComponent implements OnInit, AfterViewInit {

  /** Product Id passed by the parent component */
  @Input()
  parentProductId: number = 0;

  /** Array containing reviews for this product */
  reviews: IReview[] = [];

  /** Form for creating a review */
  reviewForm: FormGroup = new FormGroup({
    reviewText: new FormControl('', [Validators.required, Validators.minLength(3)]),
    stars: new FormControl('0', [Validators.required, Validators.min(0.5)])
  });
  /** Array for submittable review stars ngFor */
  starArray: number[] = [1, 2, 3, 4, 5];

  /** Has this user already made a review? */
  hasAlreadyReviewed: boolean = false;

  constructor(private reviewService: ReviewService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.getReviews();
  }

  ngAfterViewInit(): void {
    // Set review form stars to match initial score
    this.setStarsFromRating(this.reviewForm.get('stars')?.value);
  }

  /**
   * Retrieves reviews for this product from our "database".
   */
  getReviews() {
    this.reviewService.getReviewsByProductId(this.parentProductId).subscribe(
      (reviews) => { 
        this.reviews = reviews; 
        this.checkUserHasReviewed();
      }
    );
  }

  /**
   * Checks if a review by this user already exists. If it does, set the 
   * review form to match the old review.
   */
  checkUserHasReviewed() {
    for(let review of this.reviews) {
      // If there is already a review by this user
      if (review.authorId.toString() === localStorage.getItem("userId")) {
        // Set review form with previous review's data
        this.reviewForm.setValue({
          reviewText: review.text,
          stars: review.stars
        });

        this.hasAlreadyReviewed = true;
      }
    }
  }

  /**
   * Submits review form.
   */
  onReviewSubmit() {
    // Build a FormData object
    const formData = new FormData();
    formData.append('reviewText', this.reviewForm.get('reviewText')?.value);
    formData.append('stars', this.reviewForm.get('stars')?.value.toString());
    formData.append('submitted', new Date().toString());

    // For testing purposes, ensure review can be posted even when not logged in
    let id: string | null = localStorage.getItem('userId');
    if (!id)
      console.log("id not found, using 'id: 0' instead");
    formData.append('authorId', (id) ? id : "0");

    // Send form to "database"
    if (!this.hasAlreadyReviewed) {
      this.reviewService.postReviewForProduct(this.parentProductId, formData).subscribe(
        (response) => {
          // Update reviews
          this.getReviews();
        }
      );
    }
    // Update existing form
    else {
      let updatedReview: IReview;
      // Find the review to be updated
      for (let review of this.reviews) {
        if (review.authorId.toString() === localStorage.getItem('userId')) {
          // Update review before database response to eliminate delay
          review.text = this.reviewForm.get('reviewText')?.value;
          review.stars = this.reviewForm.get('stars')?.value;
          review.submitted = new Date();
          updatedReview = review;
        }
      }

      // Update in "database"
      this.reviewService.updateReviewForProduct(this.parentProductId, updatedReview!).subscribe(
        (response) => {
          // Update reviews
          this.getReviews();
        }
      );
    }
  }

  /**
   * Updates rating based on which star was clicked.
   * @param starIndex The index of the star that was clicked
   * @param event     Infomation about the event
   */
  onStarClick(starIndex: number, event: MouseEvent) {
    let starRating = starIndex;

    // Check if rating is X.5 or X.0
    if (this.checkHalfRating(event))
      starRating -= 0.5;

    // Remember this rating
    this.reviewForm.patchValue({
      stars: starRating
    });
  }

  onStarMouseOut() {
    this.setStarsFromRating(this.reviewForm.get('stars')?.value);
  }

  /**
   * Change review stars' appearance to indicate to user what their review score will be when they submit.
   * @param starIndex value of star that was moused over (1-5)
   */
  onStarMouseMove(starIndex: number, event: MouseEvent) {
    // Get the div containing our star elements
    let starContainer = document.getElementById("starContainer");

    // Rating is equal to the selected star's index
    let starRating = starIndex;

    // Check for half rating
    if (starContainer) {
    // starIndex-1 because starIndex range is 1-5 while index is 0-4
      let star: HTMLElement = starContainer.childNodes[starIndex-1] as HTMLElement;
      if (star && this.checkHalfRating(event, star)) {
        starRating -= 0.5;
      }
    }

    // Update the stars visually
    this.setStarsFromRating(starRating);

  }

  /**
   * Determines if user mouse position is within half the given element's width. This indicates whether a 
   * review is X.5 or X.0.
   * @param event MouseEvent
   * @param targetStar targeted element. If none is provided, event.target will be used instead.
   * @returns true if rating is X.5 false if X.0
   */
  checkHalfRating(event: MouseEvent, targetStar: HTMLElement | null = null): boolean {
    // Get the target element
    let star: HTMLElement;
    // It is either the given HTML element...
    if (targetStar)
      star = targetStar;
    // Or the event's target
    else
      star = event.target as HTMLElement;

    // Check mouse position versus star's position
    let rect = (event.target as HTMLElement).getBoundingClientRect();
    let xRel = Math.floor(event.clientX - rect.x);

    // Rating is X.5 if mouse X is less than half star's width
    return (xRel < star.clientWidth / 2);
  }

  /**
   * Visually updates the rating stars in our review form
   * @param starRating The given rating
   */
  setStarsFromRating(starRating: number) {
    // Get the div containing our star elements
    let starContainer = document.getElementById("starContainer");

    // Ceil the rating and check if we have X.5 or X.0 rating
    let ratingCeiled = Math.ceil(starRating);
    let isHalf: Boolean = !(starRating === ratingCeiled);

    if (starContainer) {
      for (let i = 0; i < 5; i++) {
        // Get the star mat-icon
        let star: HTMLElement = starContainer.childNodes[i] as HTMLElement;

        // Set stars as either filled, half, or empty
        // i+1 because rating has a range of 1-5 and index 0-4
        if (i+1 == ratingCeiled) {
          star.innerHTML = (isHalf) ? "star_half" : "star";
        }
        else
          star.innerHTML = (i+1 < ratingCeiled) ? "star" : "star_outline";
      }
    }


  }


}
