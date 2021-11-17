import { IReview } from "../model/review";

export const REVIEWS: IReview[][] = [
  // /Reviews faux page
    [{
        id: 0,
        authorId: 4,
        stars: 3.5,
        text: "example review",
        submitted: randomDate()
      },
    {
      id: 1,
      authorId: 6,
      stars: 1,
      text: "example review TWO",
      submitted: randomDate()
    }],

    // Account Verification
    [
      {
        id: 0,
        authorId: 3,
        stars: 4,
        text: "Mauris efficitur ligula eu tellus hendrerit, at ultricies lorem volutpat.",
        submitted: randomDate()
      },
      {
        id: 1,
        authorId: 8,
        stars: 5,
        text: "Morbi sollicitudin porttitor augue, eget egestas diam laoreet at.",
        submitted: randomDate()
      },
      {
        id: 2,
        authorId: 3,
        stars: 3,
        text: "In ut lorem eu risus feugiat gravida.",
        submitted: randomDate()
      },
    ],

    // Alternative Employment and Income Data
    [
      {
        id: 0,
        authorId: 4,
        stars: 4.5,
        text: "Nam vitae arcu facilisis, mollis urna condimentum, cursus quam.",
        submitted: randomDate()
      },
      {
        id: 1,
        authorId: 8,
        stars: 5,
        text: "Aenean semper ex nec consectetur placerat. Donec volutpat mollis diam at lacinia. In hac habitasse platea dictumst.",
        submitted: randomDate()
      },
    ],

    // Automated Data View
    [
      {
        id: 0,
        authorId: 5,
        stars: 3,
        text: "Donec metus nisi, tincidunt ut tempus ut, tincidunt ut lacus.",
        submitted: randomDate()
      },
      {
        id: 1,
        authorId: 7,
        stars: 4.5,
        text: "Pellentesque dui ex, facilisis sed maximus at, elementum ut tellus.",
        submitted: randomDate()
      },
    ],

    // Bank Transaction Data
    [
      {
        id: 0,
        authorId: 9,
        stars: 4,
        text: "Maecenas laoreet ex a sapien consequat varius. Aenean eget mauris eget nulla consequat commodo.",
        submitted: randomDate()
      },
      {
        id: 1,
        authorId: 5,
        stars: 4.5,
        text: "Morbi tincidunt erat eleifend lorem aliquam, eget sollicitudin enim tristique.",
        submitted: randomDate()
      },
      {
        id: 2,
        authorId: 4,
        stars: 5,
        text: "Nunc tempor aliquet auctor. Integer tincidunt aliquam sapien.",
        submitted: randomDate()
      },
    ],

    // Consumer Credit Report
    [
      {
        id: 0,
        authorId: 3,
        stars: 2,
        text: "Sed ullamcorper nec enim vitae egestas.",
        submitted: randomDate()
      },
      {
        id: 1,
        authorId: 9,
        stars: 4.5,
        text: "Donec iaculis vel elit ac facilisis. Nunc pretium sit amet ipsum eget dignissim.",
        submitted: randomDate()
      },
    ],

    // Digital Identity Trust
    [
      {
        id: 0,
        authorId: 5,
        stars: 5,
        text: "Praesent dictum neque leo, sed dapibus tellus tincidunt et.",
        submitted: randomDate()
      },
      
    ],
    
    // Document Verification
    [
      {
        id: 0,
        authorId: 3,
        stars: 4,
        text: "Duis ut nisl eget diam molestie feugiat ac et est.",
        submitted: randomDate()
      },
    ],
    
    // FraudIQ® Identity Scan Alert
    [
      {
        id: 0,
        authorId: 6,
        stars: 4,
        text: "Suspendisse aliquam sapien quis mauris ullamcorper imperdiet.",
        submitted: randomDate()
      },
      {
        id: 1,
        authorId: 3,
        stars: 5,
        text: "Phasellus eleifend placerat porttitor.",
        submitted: randomDate()
      },
    ],

    // ID Report
    [
      {
        id: 0,
        authorId: 4,
        stars: 4,
        text: "Nulla bibendum vel libero ut auctor.",
        submitted: randomDate()
      },
      {
        id: 1,
        authorId: 5,
        stars: 3.5,
        text: "hasellus enim tortor, pretium vitae pharetra eget, fermentum at tellus.",
        submitted: randomDate()
      },
    ],

    // Luminate
    [
      {
        id: 0,
        authorId: 7,
        stars: 3,
        text: "Fusce eu quam eget elit mattis bibendum finibus a massa.",
        submitted: randomDate()
      },
      {
        id: 1,
        authorId: 8,
        stars: 4.5,
        text: "Sed tristique lacus in vestibulum dapibus.",
        submitted: randomDate()
      },
    ],
];

// Returns a random date for a review's submitted time
function randomDate() {
  let start: Date = new Date(2012,0,1);
  let end: Date = new Date(2021,11,15);
  
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

