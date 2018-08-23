import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRangeSliderComponent } from "ng2-ion-range-slider";
import { Http } from '@angular/http';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CompDataSharingService } from "../../../comp-data-sharing.service";
import { debug } from 'util';
import { CommonServiceService } from '../../../common-service.service'
import { setTimeout } from 'timers';
import { NouisliderComponent } from 'ng2-nouislider';
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
  public someRange2config;
  public marketCapConfig;
  public marketRange;
  public volumeRange;
  public someRange:Array<any>;
  public volumeConfig;
  @ViewChild("component1") component1;
  @ViewChild('priceVal') priceVal: IonRangeSliderComponent;
  @ViewChild('dayChange') dayChange: IonRangeSliderComponent;
  @ViewChild('weeklyChange') weeklyChange: IonRangeSliderComponent;
  @ViewChild('volume24H') volume24H: IonRangeSliderComponent;
  @ViewChild('marketCap') marketCap: IonRangeSliderComponent;
  @ViewChild('priceSliderRef') priceSliderRef: NouisliderComponent;
  constructor(private commonService: CommonServiceService, private changeGraphTheme: CompDataSharingService, private http: Http, private location: Location, private aroute: ActivatedRoute) {
    this.changeGraphTheme.currencyConverter_listener().subscribe((value: any) => {
      this.currencyValue = parseFloat(value);
      this.maxPrice = (this.maxPrice * this.currencyValue).toFixed(2) + 100;
    })
  }

  // special params:
  ngOnInit() {
    // this.someRange = [0, 499];
    // this.marketRange= 0;
    this.someRange2config = {
      behaviour: 'drag',
      connect: true,
      start: [0, 499],
      keyboard: true,  // same as [keyboard]="true"
      step: 0.1,
      pageSteps: 10,  // number of page steps, defaults to 10
      range: {
        'min': 0,
        '25%': 0.5,
        '50%': 1,
        '75%': 100,
        'max': 500,
      },
      pips: {
        mode: 'count',
        density: 2,
        values: 5,
        stepped: true
      }
    }
    this.volumeConfig = {
      behaviour: 'drag',
      connect: true,
      start: [0, 499],
      keyboard: true,  // same as [keyboard]="true"
      step: 0.1,
      pageSteps: 10,  // number of page steps, defaults to 10
      range: {
        'min': 0,
        '25%': 1,
        '50%': 5,
        '75%': 100,
        'max': 500,
      },
      pips: {
        mode: 'count',
        density: 2,
        values: 5,
        stepped: true
      }
    }
    this.marketCapConfig = {
      behaviour: 'drag',
      connect: true,
      start: [0, 499],
      keyboard: true,  // same as [keyboard]="true"
      step: 0.1,
      pageSteps: 10,  // number of page steps, defaults to 10
      range: {
        'min': 0,
        '25%': 25,
        '50%': 50,
        '75%': 100,
        'max': 500,
      },
      pips: {
        mode: 'count',
        density: 2,
        values: 5,
        stepped: true
      }
    }
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
      // this.maxPrice = this.makeNumber(this.maxPrice,'price');
      this.maxVolume = ((data[0].maxVolume +  data[0].maxVolume * 20 / 100) * this.currencyValue).toFixed(2)
      this.maxVolume = this.makeNumber(this.maxVolume,'volume');
      this.marketCapVal = ((data[0].marketCapValue +  data[0].marketCapValue * 20 / 100) * this.currencyValue).toFixed(2)
      // this.marketCapVal = this.makeNumber(this.marketCapVal,'marketCap');
    })
    setTimeout(() => {
      let valueArray = ['0', '$.50', '$1', '$100','>$500'];
      let elemen = document.getElementById('priceNoUiSlider');
      let arrayL = elemen.getElementsByClassName('noUi-value');
      for (let m = 0; m < valueArray.length; m++) {
        arrayL[m].textContent = valueArray[m]
      }
      
      let valueArray1 = ['0', '25M', '50M', '100M','>500M'];
      let elemen1 = document.getElementById('marketCapNoUiSlider');
      let arrayL1 = elemen1.getElementsByClassName('noUi-value');
      
      for (let m = 0; m < valueArray1.length; m++) {
        arrayL1[m].textContent = valueArray1[m]
      }
      let valueArray2 = ['$0', '$1M', '$5M', '$100M','>$500M'];
      let elemen2 = document.getElementById('volumeNoUiSlider');
      let arrayL2 = elemen2.getElementsByClassName('noUi-value');
      
      for (let m = 0; m < valueArray2.length; m++) {
        arrayL2[m].textContent = valueArray2[m]
      }
    }, 1000)
    // setTimeout(() => {
     
    // }, 1000)
  }
  sortTable(key) {
    this.component1.sort(key);
  }
  priceFilter(event) {
    let elemen = document.getElementById('priceNoUiSlider');
    let arrayL = elemen.getElementsByClassName('noUi-value');
    let getfilterdData = {}
    if(event[0] < 500 && event[1] < 500){
       getfilterdData = {
      "price": {
        "from": event[0],
        "to": event[1]
      }
    }
    setTimeout(()=>{
         let elemen = document.getElementById('priceNoUiSlider');
         elemen.getElementsByClassName('noUi-tooltip')[0].innerHTML = '$'+event[0]
         elemen.getElementsByClassName('noUi-tooltip')[1].innerHTML = '$'+event[1]
      
    },200)
    }
    else {
      getfilterdData = {
        "price": {
          "from": event[0]
        }
      }
      setTimeout(()=>{
        
          // this.priceSliderRef.slider.set([ 500,500 ]);
          let elemen = document.getElementById('priceNoUiSlider');
          elemen.getElementsByClassName('noUi-tooltip')[0].innerHTML = '$'+event[0];
          elemen.getElementsByClassName('noUi-tooltip')[1].innerHTML = '$500+'
      },200)
    }
    let toVal = parseFloat((event.to / this.currencyValue).toFixed(2));
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
    // setTimeout(()=>{
    //   if(event[0] < 500 && event[1] < 500){
    //     debugger
    //      let elemen = document.getElementById('priceNoUiSlider');
    //      elemen.getElementsByClassName('noUi-tooltip')[0].innerHTML = '$'+event[0]
    //      elemen.getElementsByClassName('noUi-tooltip')[1].innerHTML = '$'+event[1]
    //   }
    //   else if(event[0] == 500 || event[1] == 500){
    //     let elemen = document.getElementById('priceNoUiSlider');
    //     let arrayL1 = elemen.getElementsByClassName('noUi-tooltip')[0].innerHTML = '$500+'
    //     elemen.getElementsByClassName('noUi-tooltip')[1].innerHTML = '$500+'
    //   }
    //   //  this.priceSliderRef.slider.set([1,100 ]);
    // },200)

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
    
    let events = []
    events[0] = event[0] * 1000000
    events[1] = event[1] * 1000000
    let getfilterdData = {}
    if(event[0] < 500 && event[1] < 500){
      getfilterdData = {
     "dayVolume": {
       "from": events[0],
       "to": events[1]
     }
   }
   setTimeout(()=>{
     
      let elemen1 = document.getElementById('volumeNoUiSlider');
      elemen1.getElementsByClassName('noUi-tooltip')[0].innerHTML = '$'+event[0]+'M'
      elemen1.getElementsByClassName('noUi-tooltip')[1].innerHTML = '$'+event[1]+'M'
   },200)
   }
   else{
     getfilterdData = {
       "dayVolume": {
         "from": events[0]
       }
     }
     setTimeout(()=>{
        let elemen1 = document.getElementById('volumeNoUiSlider');
       elemen1.getElementsByClassName('noUi-tooltip')[0].innerHTML = '$'+event[0]+' M'
       elemen1.getElementsByClassName('noUi-tooltip')[1].innerHTML = '$500M+'
    
     
    },200)
   }
    // let getfilterdData = {
    //   "dayVolume": {
    //     "from": event.from,
    //     "to": event.to
    //   }
    // }
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
    
    let events = []
    events[0] = event[0] * 1000000
    events[1] = event[1] * 1000000
    let getfilterdData = {}
    if(event[0] < 500 && event[1] < 500){
      getfilterdData = {
     "marketCapValue": {
       "from": events[0],
       "to": events[1]
     }
   }
   setTimeout(()=>{
      let elemen1 = document.getElementById('marketCapNoUiSlider');
      elemen1.getElementsByClassName('noUi-tooltip')[0].innerHTML = event[0]+'M'
      elemen1.getElementsByClassName('noUi-tooltip')[1].innerHTML = event[1]+'M'
   },200)
   }
   else{
     getfilterdData = {
       "marketCapValue": {
         "from": events[0]
        
       }
     }
     setTimeout(()=>{
        let elemen1 = document.getElementById('marketCapNoUiSlider');
       elemen1.getElementsByClassName('noUi-tooltip')[0].innerHTML =event[0]+'M'
       elemen1.getElementsByClassName('noUi-tooltip')[1].innerHTML = 500+'M+'
    
     
    },200)
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
      // document.getElementsByClassName('noUi-tooltip')[0].innerHTML = this.changeRefreshRate;
      this.advFilter.push(getfilterdData);
    }
   
  }
  resetAdvFilter() {
    if (this.advFilter.length > 0) {
      this.changeGraphTheme.reset_advancedFilter_filter()
      if (localStorage.getItem('userToken')) {
        
        this.component1.userWithFavCoins();
      } else {
        
        this.component1.userNormalData();
      }
      this.someRange = [0,499];
      this.marketRange= [0,499];
      this.volumeRange= [0,499];
      // this.priceSliderRef.slider.set([0,499 ]);
    //this.priceVal.update({ from: 0, to: this.maxPrice });
      this.dayChange.update({ from: -100, to: 100 });
      this.weeklyChange.update({ from: -100, to: 100 });
      this.volume24H.update({ from: 0, to: this.maxVolume });
    }
  }
  advancedSearchFilter() {
    if( this.advFilter.length > 0){
            this.changeGraphTheme.advancedFilter_filter( this.advFilter )
    }
   
  }
  makeNumber(labelValue,type) {
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
refreshRateChange(){
    
}
}
