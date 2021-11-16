import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter, AfterViewChecked, AfterContentChecked } from '@angular/core';
import { IReview } from 'src/app/model/review';
import { IUser } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

/**
 * Displays a single review.
 */
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit, AfterContentChecked {

  /** Review to be displayed */
  @Input()
  review?: IReview;

  // Date and author from review object must be modified before it is displayed
  submittedDate: string | null = null;
  author: IUser | null = null;

  // We need two arrays for our *ngFors
  starsFilled: number[] = [];
  starsEmpty: number[] = [];

  /** Is our review X.0 or X.5? */
  reviewIsWholeNumber: boolean = true;

  constructor(private userService: UserService, private datePipe: DatePipe) { }

  ngOnInit(): void {

    // Make sure we were sent a valid Review object from our feed component
    if (!this.review) {
      console.error("Review was null");
      return;
    }

    this.setupDisplay();

    // Get user reference by id
    this.userService.getUserById(this.review.authorId).subscribe(
      (author) => { this.author = author; }
    );
  }

  ngAfterContentChecked() {
    this.setupDisplay();
  }

  /**
   * Performs logic necessary for stars and date to be viewed by user.
   */
  private setupDisplay() {
    if (!this.review) {
      console.error("Review was null");
      return;
    }

    this.reviewStarsSetup();

    // Our formatted date for when review was submitted
    this.submittedDate = this.datePipe.transform(this.review.submitted, 'd MMMM, y, h:mm a');

  }

  /**
   * Sets up everything needed to display the review stars in HTML.
   */
  reviewStarsSetup() {
    if (this.review) {

      // Floor rating
      let starNum = Math.floor(this.review.stars);
      let numEmpty = Math.floor(5 - this.review.stars);

      // Is our review a whole number? (is it the same even after being floored?)
      this.reviewIsWholeNumber = (this.review.stars) === starNum;

      // Create an array with size = starNum. The contents of the array is irrelevant
      this.starsFilled = Array.from(new Array(starNum).keys());

      // Create an array with size = numEmpty. 
      this.starsEmpty = Array.from(new Array(numEmpty).keys());
    }
  }

}
