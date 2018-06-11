import { Component,OnInit, ViewChild } from '@angular/core';
import {IonRangeSliderComponent} from "ng2-ion-range-slider";
import {Http} from '@angular/http';
@Component({
  selector: 'app-coinlist',
  templateUrl: './coinlist.component.html',
  styleUrls: ['./coinlist.component.css']
})
export class CoinlistComponent implements OnInit {
  public maxPrice;
  @ViewChild("component1") component1;
  @ViewChild('priceVal') priceVal: IonRangeSliderComponent;
  @ViewChild('dayChange') dayChange: IonRangeSliderComponent;
  @ViewChild('weeklyChange') weeklyChange: IonRangeSliderComponent;
  @ViewChild('volume24H') volume24H : IonRangeSliderComponent;
  @ViewChild('marketCap') marketCap: IonRangeSliderComponent;
  constructor(private http : Http) {   }

// special params:
  ngOnInit() {
      this.http.get('http://coinwave.service.colanonline.net/exchange/getMax').map(
        response => response.json()
      ).subscribe(data => {
        console.log(data)
        
        this.maxPrice = data[0].maxPrice + 100;
        console.log(this.maxPrice)
      })
 
  }
  sortTable(key){
    this.component1.sort(key);
  }
  priceFilter(event){
    let getfilterdData = {
      "price" : {
        "from" : event.from,
        "to" : event.to
      }
    }
    
    this.http.post('http://coinwave.service.colanonline.net/exchange/getusd',{filter:getfilterdData}).map(response => response.json()).subscribe(data => {
      this.component1.advancedTableFilter(data);
      console.log("App Data",data)
    })
  }
  dayfilter(event){
    console.log(event);
  }
  weeklyFilter(event){
    console.log(event);
  }
  dayVolumeFilter(event){
    console.log(event);
  }
  coinSupplyFilter(event){
    console.log(event);
  }
  marketCapFilter(event){
    console.log(event);
  }
}
