import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { REVIEWS } from '../model/mock-reviews';
import { IReview } from '../model/review';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  
  constructor(private userService: UserService) { }

  /**
   * Retrieves array of reviews for a product from our "database"
   * @param productId API product's id
   * @returns array of reviews associated with given product
   */
  getReviewsByProductId(productId: number): Observable<IReview[]> {

    // Get our faux review list instead of sending an http request
    const reviews = of(REVIEWS[productId]);
    return reviews;
  }

  postReviewForProduct(productId: number, reviewForm: FormData): Observable<string> {

    let newReview: IReview = {
      authorId: Number.parseInt(reviewForm.get('authorId')!.toString()),
      stars: Number.parseFloat(reviewForm.get('stars')!.toString()),
      text: reviewForm.get('reviewText')!.toString(),
      submitted: new Date(reviewForm.get('submitted')!.toString())
    };

    // Add review to "database"
    REVIEWS[productId].push(newReview);

    return of("Review posted successfully");
  }


}
