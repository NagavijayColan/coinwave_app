import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coinpage',
  templateUrl: './coinpage.component.html',
  styleUrls: ['./coinpage.component.css']
})
export class CoinpageComponent implements OnInit {
 public jsonData;

 constructor() {
 }

  ngOnInit() {
    this.jsonData = [
      {
        "cp_24four_change": "14.2%",
        "cp_7day_change": "5.6%",
        "cp_30day_change": "7.6%",
        "cp_24hr_volume": "$56,549,987",
        "cp_24hr_high": "$9,2765",
        "cp_24hr_low": "$7,943.2",
        "cp_market_cap": "$99,549,987",
        "cp_circulating_supply": "$15,000,000",
        "cp_total_supply": "$16,000,000"
      }
     
    ]
  }

}
