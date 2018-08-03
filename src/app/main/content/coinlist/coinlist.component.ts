import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRangeSliderComponent } from "ng2-ion-range-slider";
import { Http } from '@angular/http';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CompDataSharingService } from "../../../comp-data-sharing.service";
import { debug } from 'util';
import { CommonServiceService } from '../../../common-service.service'
@Component({
  selector: 'app-coinlist',
  templateUrl: './coinlist.component.html',
  styleUrls: ['./coinlist.component.css']
})
export class CoinlistComponent implements OnInit {
  public maxPrice;
  public advFilter: Array<any>;
  public isThere;
  public userDetails;
  public currencyValue;
  public maxVolume;
  public marketCapVal;
  public hideInMobileView;
  public parameterPrice;
  public parameterVol;
  public parameterMarkCap;
  @ViewChild("component1") component1;
  @ViewChild('priceVal') priceVal: IonRangeSliderComponent;
  @ViewChild('dayChange') dayChange: IonRangeSliderComponent;
  @ViewChild('weeklyChange') weeklyChange: IonRangeSliderComponent;
  @ViewChild('volume24H') volume24H: IonRangeSliderComponent;
  @ViewChild('marketCap') marketCap: IonRangeSliderComponent;
  constructor(private commonService: CommonServiceService, private changeGraphTheme: CompDataSharingService, private http: Http, private location: Location, private aroute: ActivatedRoute) {
    this.changeGraphTheme.currencyConverter_listener().subscribe((value: any) => {
      this.currencyValue = parseFloat(value);
      this.maxPrice = (this.maxPrice * this.currencyValue).toFixed(2) + 100;
    })
  }

  // special params:
  ngOnInit() {
    
    if (window.screen.width > 990) {
      this.hideInMobileView = true;
  }
  else {
    this.hideInMobileView = false;
  }
    this.currencyValue = 1;
    if (!(localStorage.getItem('userToken'))) {
      this.aroute.params.subscribe(params => {
        this.userDetails = params;
      });
    }
    this.location.replaceState('/coinlist');
    this.advFilter = [];
    this.http.get('http://54.165.36.80:5687/exchange/getMax').map(response => response.json()).subscribe(data => {
      this.maxPrice = ((data[0].maxPrice +  data[0].maxPrice * 20 / 100) * this.currencyValue).toFixed(2)
      this.maxPrice = this.makeNumber(this.maxPrice,'price');
      this.maxVolume = ((data[0].maxVolume +  data[0].maxVolume * 20 / 100) * this.currencyValue).toFixed(2)
      this.maxVolume = this.makeNumber(this.maxVolume,'volume');
      this.marketCapVal = ((data[0].marketCapValue +  data[0].marketCapValue * 20 / 100) * this.currencyValue).toFixed(2)
      alert(this.marketCapVal)
      this.marketCapVal = this.makeNumber(this.marketCapVal,'marketCap');
    })
  }
  sortTable(key) {
    this.component1.sort(key);
  }
  priceFilter(event) {
    let toVal = parseFloat((event.to / this.currencyValue).toFixed(2));
    let getfilterdData = {
      "price": {
        "from": event.from,
        "to": toVal
      }
    }

    this.isThere = false;
    for (let i = 0; i < this.advFilter.length; i++) {
      if (this.advFilter[i].price) {
        this.isThere = true;
        this.advFilter.splice(i, 1);
        this.advFilter.push(getfilterdData)
      }
    }
    if (!this.isThere) {
      this.advFilter.push(getfilterdData)
    }


  }
  dayfilter(event) {
    let getfilterdData = {
      "dayPricePercent": {
        "from": event.from,
        "to": event.to
      }
    }

    this.isThere = false;
    for (let i = 0; i < this.advFilter.length; i++) {
      if (this.advFilter[i].dayPricePercent) {
        this.isThere = true;
        this.advFilter.splice(i, 1);
        this.advFilter.push(getfilterdData)
      }
    }
    if (!this.isThere) {
      this.advFilter.push(getfilterdData)
    }
  }
  weeklyFilter(event) {
    let getfilterdData = {
      "weeklyChangePercent": {
        "from": event.from,
        "to": event.to
      }
    }
    this.isThere = false;
    for (let i = 0; i < this.advFilter.length; i++) {
      if (this.advFilter[i].weeklyChangePercent) {
        this.isThere = true;
        this.advFilter.splice(i, 1);
        this.advFilter.push(getfilterdData)
      }
    }
    if (!this.isThere) {
      this.advFilter.push(getfilterdData);
    }

  }
  dayVolumeFilter(event) {
    let getfilterdData = {
      "dayVolume": {
        "from": event.from,
        "to": event.to
      }
    }
    this.isThere = false;
    for (let i = 0; i < this.advFilter.length; i++) {
      if (this.advFilter[i].dayVolume) {
        this.isThere = true;
        this.advFilter.splice(i, 1);
        this.advFilter.push(getfilterdData)
      }
    }
    if (!this.isThere) {
      this.advFilter.push(getfilterdData);
    }
  }
  marketCapFilter(event) {
    let getfilterdData = {
      "marketCapValue": {
        "from": event.from,
        "to": event.to
      }
    }
    this.isThere = false;
    for (let i = 0; i < this.advFilter.length; i++) {
      if (this.advFilter[i].marketCapValue) {
        this.isThere = true;
        this.advFilter.splice(i, 1);
        this.advFilter.push(getfilterdData)
      }
    }
    if (!this.isThere) {
      this.advFilter.push(getfilterdData);
    }
  }
  resetAdvFilter() {
    if (this.advFilter.length > 0) {
      if (localStorage.getItem('userToken')) {
        this.component1.userWithFavCoins();
      } else {
        this.component1.userNormalData();
      }
      this.priceVal.update({ from: 0, to: this.maxPrice });
      this.dayChange.update({ from: -100, to: 100 });
      this.weeklyChange.update({ from: -100, to: 100 });
      this.volume24H.update({ from: 0, to: this.maxVolume });
    }
  }
  advancedSearchFilter() {
    if (this.advFilter.length > 0) {
      this.changeGraphTheme.clear_interval_filter();
      this.http.post('http://54.165.36.80:5687/exchange/getusd', { filter: this.advFilter ,from : 0,to:1500 }).map(response => response.json()).
        subscribe(
        data => {
          console.log(data)
          this.component1.advancedTableFilter(data);
        },
        err => {
          console.log(err)
          let array = [];
          this.component1.advancedTableFilter(array);
        })
    }
  }
  makeNumber(labelValue,type) {debugger
    if(Math.abs(Number(labelValue)) >= 1.0e+9){
          if(type == 'price'){
              this.parameterPrice = 'M'
          }
          else if(type == 'volume'){
              this.parameterVol = 'M'
          }
          else if(type == 'marketCap'){
              this.parameterMarkCap = 'M'
          }
          return Math.abs(Number(labelValue)) / 1.0e+9 
    }
    else if(Math.abs(Number(labelValue)) >= 1.0e+6){
      if(type == 'price'){
        this.parameterPrice = 'B'
    }
    else if(type == 'volume'){
        this.parameterVol = 'B'
    }
    else if(type == 'marketCap'){
        this.parameterMarkCap = 'B'
    }
          return Math.abs(Number(labelValue)) / 1.0e+6 
    }
    else if(Math.abs(Number(labelValue)) >= 1.0e+3){
      if(type == 'price'){
        this.parameterPrice = 'K'
    }
    else if(type == 'volume'){
        this.parameterVol = 'K'
    }
    else if(type == 'marketCap'){
        this.parameterMarkCap = 'K'
    }
          return Math.abs(Number(labelValue)) / 1.0e+3 
    }
    else {
      return Math.abs(Number(labelValue)).toFixed(2);
    }
    // Nine Zeroes for Billions
   

}
}
