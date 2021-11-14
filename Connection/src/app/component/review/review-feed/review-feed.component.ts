import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { IReview } from 'src/app/model/review';
import { ReviewService } from 'src/app/service/review.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-review-feed',
  templateUrl: './review-feed.component.html',
  styleUrls: ['./review-feed.component.css']
})
export class ReviewFeedComponent implements OnInit {

  parentProductId: number = 0;
  reviews: IReview[] = [];

  reviewForm: FormGroup = new FormGroup({
    reviewText: new FormControl('', [Validators.required, Validators.minLength(3)]),
    reviewStars: new FormControl()
  });
  starArray: number[] = [0, 1, 2, 3, 4];
  savedStarRating: number = 5;

  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.getReviews();
  }

  /**
   * Retrieve reviews for this product from our "database"
   */
  getReviews() {
    this.reviewService.getReviewsByProductId(this.parentProductId).subscribe(
      (reviews) => { this.reviews = reviews; }
    );
  }

  onReviewSubmit() {
    console.log("review submitted");

    // Build a FormData object
    const formData = new FormData();
    formData.append('reviewText', this.reviewForm.get('reviewText')?.value);
    formData.append('stars', this.savedStarRating.toString());
    formData.append('submitted', new Date().toString());
    let id: string | null = localStorage.getItem('authorId');
    if (!id)
      id = "0";
    formData.append('authorId', id!);

    // Send form to "database"
    this.reviewService.postReviewForProduct(this.parentProductId, formData).subscribe(
      (response) => {
        // Update reviews
        this.getReviews();
      }
    );
  }

  onStarClick(starIndex: number, event: MouseEvent) {
    // index is 0-4, rating is 1-5
    let starRating = starIndex + 1;

    // Check if rating is X.5 or X.0
    if (this.checkHalfRating(event))
      starRating -= 0.5;

    // Remember this rating
    this.savedStarRating = starRating;
  }

  onStarMouseOut() {
    // Subtract 1 because rating is 1-5 while the index is 0-4
    this.setStarsFromRating(this.savedStarRating - 1);
  }

  /**
   * Change review stars' appearance to indicate to user what their review score will be when they submit.
   * @param starIndex value of star that was moused over (0-4)
   */
  onStarMouseMove(starIndex: number, event: MouseEvent) {
    // Get the div containing our star elements
    let starContainer = document.getElementById("starContainer");

    // Rating is equal to the selected star's index
    let starRating = starIndex;

    // Check for half rating
    if (starContainer) {
      let star: HTMLElement = starContainer.childNodes[starIndex] as HTMLElement;
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
   * @param starRating 
   */
  setStarsFromRating(starRating: number) {
    // Get the div containing our star elements
    let starContainer = document.getElementById("starContainer");

    // ceil the rating and check if we have X.5 or X.0 rating
    let ratingCeiled = Math.ceil(starRating);
    let isHalf: Boolean = !(starRating === ratingCeiled);

    if (starContainer) {
      for (let i = 0; i < 5; i++) {
        // Get the star mat-icon
        let star: HTMLElement = starContainer.childNodes[i] as HTMLElement;

        // Set stars as either filled, half, or empty
        if (i == ratingCeiled) {
          star.innerHTML = (isHalf) ? "star_half" : "star";
        }
        else
          star.innerHTML = (i < ratingCeiled) ? "star" : "star_outline";
      }
    }


  }


}
