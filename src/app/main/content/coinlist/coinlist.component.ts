import { Component,OnInit, ViewChild } from '@angular/core';
import {IonRangeSliderComponent} from "ng2-ion-range-slider";
@Component({
  selector: 'app-coinlist',
  templateUrl: './coinlist.component.html',
  styleUrls: ['./coinlist.component.css']
})
export class CoinlistComponent implements OnInit {
  @ViewChild("component1") component1;
  @ViewChild('priceVal') priceVal: IonRangeSliderComponent;
  @ViewChild('dayChange') dayChange: IonRangeSliderComponent;
  @ViewChild('weeklyChange') weeklyChange: IonRangeSliderComponent;
  @ViewChild('volume24H') volume24H : IonRangeSliderComponent;
  @ViewChild('marketCap') marketCap: IonRangeSliderComponent;
  constructor() {   }

// special params:


  ngOnInit() {
 
 
  }
  sortTable(key){
    this.component1.sort(key);
  }
  priceFilter(event){
    console.log(event);
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
