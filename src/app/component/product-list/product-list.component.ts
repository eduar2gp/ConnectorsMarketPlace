import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/model/product';

import { ProductService } from 'src/app/service/product.service';
import { ReviewService } from 'src/app/service/review.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {



  searchText: string ="";

  products: IProduct[] = [];

  // Used for review star *ngFors
  starIndexArray: number[] = [1, 2, 3, 4, 5];

  constructor(private ProductService: ProductService, private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.ProductService.getProducts().subscribe(
      products => {
        this.products = products;
        this.getReviewScore();

      });
  }

  /**
   * Locates reviews tied to each product and fills an array with the average scores.
   */
  getReviewScore() {
    // Get reviews
    this.reviewService.getAllReviews().subscribe(
      (reviewsForAllProducts) => {
        // For each product's review (skip review[0], that is for testing)
        for (let i = 1; i < reviewsForAllProducts.length; i++) {
          let reviewsForOneProduct = reviewsForAllProducts[i];

          // Calculate avg
          let reviewAvg = 0;
          reviewsForOneProduct.forEach(
            (review) => {
              reviewAvg += review.stars;
            }
          );
          reviewAvg /= reviewsForOneProduct.length;
          this.products[i-1].stars = reviewAvg;
        }

        // Sort products by reviews
        this.products.sort((a, b) => (a.stars > b.stars) ? -1 : 1);
      }
    );
  }

  /**
   * Returns correct svg icon name based on star's index and product rating.
   *
   * @param starIndex Which star we are checking range: (1,5)
   * @param rating    The rating for a product range: (1,5)
   * @return          'star', 'star_outline', or 'star_half'
   */
  getStarValue(starIndex: number, rating: number): string {
    let ratingCeiled = Math.ceil(rating);

    // The leftmost filled star can either be full or half
    if (starIndex === ratingCeiled) {
      // Checking if rating is not a whole number
      if (ratingCeiled !== rating) {
        return 'star_half';
      }
      else
        return 'star';
    }
    // Stars within rating are filled
    else if (starIndex < ratingCeiled)
      return 'star';
    // Stars beyond rating are empty
    else
      return 'star_outline'
  }
}
