import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent implements OnInit { 

  features = [
    {
      "featureId": "1",
      "featureDescription" : "Matches credit card or bank account information with a consumer’s verified PII in real-time which may result in higher conversion rates to purchase goods and services"
    },
    {
      "featureId": "2",
      "featureDescription" : "Validates the authenticity of payment details by cross-referencing the credit card or bank account entered by the consumer."
    },
    {
      "featureId": "3",
      "featureDescription" : "Offers real-time match of the consumer identity and credit card or bank account provided by the consumer."
    },
  ]

  constructor() {
    
   }

  ngOnInit(): void {
  }

}