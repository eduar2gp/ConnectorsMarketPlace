import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-use-case',
  templateUrl: './use-case.component.html',
  styleUrls: ['./use-case.component.css']
})
export class UseCaseComponent implements OnInit {

  useCases = [
    {
      "useCaseName": "Account Verification is for businesses that want to:",
      "useCaseDetails": [
        {
          "description": "Address three driving questions:"
        },
        {
          "description": "Verify the account number presented by a consumer and that the consumer is an authorized user."
        },
        {
          "description": "Help mitigate chargebacks for card-not-present fraud (CNP)."
        },
      ]
    },
    {
      "useCaseName": "Account Verification is used for:",
      "useCaseDetails": [
        {
          "description": "Financial Services: Mitigate risk for payments associated with new account openings or loans."
        },
        {
          "description": "Auto Dealers & Lenders: Accept a credit card and/or bank account with confidence for vehicle down payments."
        },
        {
          "description": "Rental/Property Management: Make deposit and monthly rent payments through bank account and accept credit cards."
        },
      ]
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}