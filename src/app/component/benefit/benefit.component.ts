import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { IBenefit } from 'src/app/model/benefit';
import { IProduct } from 'src/app/model/product';

@Component({
  selector: 'app-benefit',
  templateUrl: './benefit.component.html',
  styleUrls: ['./benefit.component.css']
})
export class BenefitComponent implements OnInit {

  @Input() product? : IProduct;
  benefits  = {
    "overView": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure \n " +
      "dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "benefits": [
      {
        "benefitId": "1",
        "benefitTitle": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim",
        "benefitDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure \n " +
          "dolor in reprehenderit",
        "benefitLogoUrl": "/assets/AcctManagement.png"
      },
      {
        "benefitId": "2",
        "benefitTitle": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim",
        "benefitDescription": "Mi bibendum neque egestas congue quisque. Diam sit amet nisl suscipit adipiscing bibendum. Ligula ullamcorper malesuada proin libero nunc consequat interdum varius sit. Lorem donec massa sapien faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure \n " +
          "dolor in reprehenderit sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
        "benefitLogoUrl": "/assets/Insight.png"
      },
      {
        "benefitId": "3",
        "benefitTitle": "Id aliquet risus feugiat in ante. Pellentesque elit ullamcorper dignissim cras tincidunt. Leo integer malesuada nunc vel risus commodo viverra.",
        "benefitDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure \n " +
          "dolor in reprehenderit",
        "benefitLogoUrl": "/assets/Secure_Check.png"
      },
      {
        "benefitId": "4",
        "benefitTitle": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim",
        "benefitDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure \n " +
          "dolor in reprehenderit. Dui id ornare arcu odio ut. Elit eget gravida cum sociis natoque penatibus et. Id donec ultrices tincidunt arcu non sodales neque. Egestas integer eget aliquet nibh praesent.",
        "benefitLogoUrl": "/assets/AcctManagement.png"
      },
    ]
  }

  constructor() { }

  ngOnInit(): void {
  }

}