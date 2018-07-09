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
  public hideInMobileView;
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

    this.http.get('http://18.191.202.171:5687/exchange/getMax').map(response => response.json()).subscribe(data => {

      this.maxPrice = (data[0].maxPrice * this.currencyValue).toFixed(2) + 100;
      this.maxVolume = (data[0].maxVolume * this.currencyValue).toFixed(2) + 100;
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

  }
  resetAdvFilter() {
    if (this.advFilter.length > 0) {
      if (localStorage.getItem('userToken')) {
        this.component1.userWithFavCoins();
      } else {
        this.component1.userNormalData();
      }
      this.priceVal.update({ from: 0, to: this.maxPrice });
      this.dayChange.update({ from: 0, to: 100 });
      this.weeklyChange.update({ from: 0, to: 100 });
      this.volume24H.update({ from: 0, to: this.maxVolume });
    }
  }
  advancedSearchFilter() {
    if (this.advFilter.length > 0) {
      this.changeGraphTheme.clear_interval_filter();
      this.http.post('http://18.191.202.171:5687/exchange/getusd', { filter: this.advFilter }).map(response => response.json()).
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
}
