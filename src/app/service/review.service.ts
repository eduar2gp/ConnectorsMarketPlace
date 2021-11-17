import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { REVIEWS } from '../database/mock-reviews';
import { IReview } from '../model/review';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  
  constructor(private userService: UserService) { }

  /**
   * Retrieves array of reviews for a product from our "database".
   * @param productId API product's id
   * @returns Array of reviews associated with given product
   */
  getReviewsByProductId(productId: number): Observable<IReview[]> {

    // If there are no reviews for a product, return an empty list
    if (productId >= REVIEWS.length) {
      return of([]);
    }

    // Get our faux review list instead of sending an http request
    const reviews = of(REVIEWS[productId]);
    return reviews;
  }

  /**
   * Sends new review to be stored in our "database".
   * @param productId   API product's id
   * @param reviewForm  The form containing properties of the new review
   * @returns           The posted review
   */
  postReviewForProduct(productId: number, reviewForm: FormData): Observable<IReview> {

    // If there are no reviews for a product, create an empty array
    if (productId >= REVIEWS.length) {
      REVIEWS[productId] = [];
    }

    let newReview: IReview = {
      id: REVIEWS[productId].length,
      authorId: Number.parseInt(reviewForm.get('authorId')!.toString()),
      stars: Number.parseFloat(reviewForm.get('stars')!.toString()),
      text: reviewForm.get('reviewText')!.toString(),
      submitted: new Date(reviewForm.get('submitted')!.toString())
    };

    // Add review to "database"
    REVIEWS[productId].push(newReview);

    return of(newReview);
  }

  /**
   * Updates existing review in our "database".
   * @param productId   API product's id
   * @param review      The review to be updated
   * @returns           The updated review
   */
   updateReviewForProduct(productId: number, review: IReview): Observable<IReview> {

    // Update review to "database"
    REVIEWS[productId][review.id] = review;

    return of(review);
  }

    /**
   * Retrieves reviews for each product in our "database".
   * @returns Array containing an array of reviews for each product
   */
     getAllReviews(): Observable<IReview[][]> {
      return of(REVIEWS);
    }

}
