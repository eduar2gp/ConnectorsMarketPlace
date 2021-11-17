import { AfterContentChecked, Component, OnInit, Renderer2 } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
  productsSorted: IProduct[] = [];

  // Used for review star *ngFors
  starIndexArray: number[] = [1, 2, 3, 4, 5];

  // Hover timer vars
  elevationMaxValue: number = 10;
  elevationMinValue: number = 2;
  elevationTimerMaxTicks: number = 30;
  elevationRate: number = 7.5;
  hoverTarget: HTMLElement | null = null;

  constructor(
    private ProductService: ProductService, 
    private reviewService: ReviewService,
    private renderer: Renderer2) 
    { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.ProductService.getProducts().subscribe(
      products => {
        this.products = Array.from(products);
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
        // For each product's reviews (skip review[0], that is for testing)
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
        this.productsSorted = this.products;
        this.productsSorted.sort((a, b) => (a.stars > b.stars) ? -1 : 1);
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

  /**
   * Starts a timer to gradually elevate the target in response to mouse.
   * @param event The mouse event
   */
  hoverOn(event: MouseEvent) {
    if (!this.hoverTarget) {
      this.hoverTarget = event.target as HTMLElement;

      const eTimer = timer(0,this.elevationRate);
      let eTimerRun = eTimer.subscribe(val => {
        
        let interpolatedTime = this.elevationMaxValue * (val / this.elevationTimerMaxTicks);
        interpolatedTime = Math.floor(interpolatedTime);

        if (this.hoverTarget) {
          // Remove elevation classes
          let classesToRemove = Array.from(this.hoverTarget!.classList).filter(c => c.startsWith('mat-elevation-z'));
          classesToRemove.forEach((c) => {
              this.renderer.removeClass(this.hoverTarget, c);
            }
          );
          // Add new elevation class
          this.renderer.addClass(this.hoverTarget, `mat-elevation-z${Math.floor(interpolatedTime)+this.elevationMinValue}`);
        }

        if (val >= this.elevationTimerMaxTicks)
          eTimerRun.unsubscribe();
      });

    }
  }

  /**
   * Resets any elevation that happened while target was moused over.
   * @param event The mouse event
   */
  hoverOff(event: MouseEvent) {
    this.hoverTarget = event.target as HTMLElement;

    // Remove elevation classes
    let classesToRemove = Array.from(this.hoverTarget!.classList).filter(c => c.startsWith('mat-elevation-z'));
    classesToRemove.forEach((c) => {
      this.renderer.removeClass(this.hoverTarget, c);
    }
    );
    this.renderer.addClass(this.hoverTarget, `mat-elevation-z${this.elevationMinValue}`);

    this.hoverTarget = null;
  }
}
