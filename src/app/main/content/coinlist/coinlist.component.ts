import { Component,OnInit, ViewChild } from '@angular/core';
import {IonRangeSliderComponent} from "ng2-ion-range-slider";
import {Http} from '@angular/http';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-coinlist',
  templateUrl: './coinlist.component.html',
  styleUrls: ['./coinlist.component.css']
})
export class CoinlistComponent implements OnInit {
  public maxPrice;
  public advFilter:Array<any>;
  public isThere;
  public userDetails;
  @ViewChild("component1") component1;
  @ViewChild('priceVal') priceVal: IonRangeSliderComponent;
  @ViewChild('dayChange') dayChange: IonRangeSliderComponent;
  @ViewChild('weeklyChange') weeklyChange: IonRangeSliderComponent;
  @ViewChild('volume24H') volume24H : IonRangeSliderComponent;
  @ViewChild('marketCap') marketCap: IonRangeSliderComponent;
  constructor(private http : Http,private location : Location,private aroute : ActivatedRoute) {   }

// special params:
  ngOnInit() {
    if(!(sessionStorage.getItem('userToken'))){
      this.aroute.params.subscribe(params => {
        this.userDetails = params; 
     });
    }
    this.location.replaceState('/coinlist');
    this.advFilter  =[];
      this.http.get('http://coinwave.service.colanonline.net/exchange/getMax').map(
        response => response.json()
      ).subscribe(data => {
        
        
        this.maxPrice = data[0].maxPrice + 100;
        
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
   
    this.isThere = false;
    for(let i =0;i < this.advFilter.length; i++){
      if(this.advFilter[i].price){
        this.isThere = true;
        this.advFilter.splice(i,1);
        this.advFilter.push(getfilterdData)
      }
    }
    if(!this.isThere){
      this.advFilter.push(getfilterdData)
    }
    
   
  }
  dayfilter(event){
    let getfilterdData = {
      "dayPricePercent" : {
        "from" : event.from,
        "to" : event.to
      }
    }
    this.isThere = false;
    for(let i =0;i < this.advFilter.length; i++){
      if(this.advFilter[i].dayPricePercent){
        this.isThere = true;
        this.advFilter.splice(i,1);
        this.advFilter.push(getfilterdData)
      }
    }
    if(!this.isThere){
      this.advFilter.push(getfilterdData)
    }
   
  }
  weeklyFilter(event){
    let getfilterdData = {
      "weeklyChangePercent" : {
        "from" : event.from,
        "to" : event.to
      }
    }
    this.isThere = false;
    for(let i =0;i < this.advFilter.length; i++){
      if(this.advFilter[i].weeklyChangePercent){
        this.isThere = true;
        this.advFilter.splice(i,1);
        this.advFilter.push(getfilterdData)
      }
    }
    if(!this.isThere){
      this.advFilter.push(getfilterdData);
    }
    
  }
  dayVolumeFilter(event){
    
  }
  marketCapFilter(event){
    
  }
  advancedSearchFilter(){debugger
    this.http.post('http://coinwave.service.colanonline.net/exchange/getusd',{filter:this.advFilter}).map(response => response.json()).subscribe(data => {
      this.component1.advancedTableFilter(data);
      
    })
  }
}
