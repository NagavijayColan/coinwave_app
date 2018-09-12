import { Component, OnInit,ViewChild } from '@angular/core';
import { Http } from '@angular/http'
import { CompDataSharingService } from "../../../comp-data-sharing.service";
import { Subscription, Subject } from 'rxjs/Rx';
import { document } from 'angular-bootstrap-md/utils/facade/browser';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  @ViewChild('addCoin') public addCoin;
  gridSelected: boolean;
  listSelected: boolean;
  public addclass;
  public searchText;
  public portfoliogrid;
  public listData;
  public coinList;
  public noData;
  public getLoggedIn;
  public showLoadSpinner:Boolean;
  public userName;
  public runningInterval : Subscription;
  public clearInterval;
  public addCoinModel;
  public isLoggedin;
  public accordionData;
  public currencyList;
  public coinDetails;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(private http: Http, private changeGraphTheme: CompDataSharingService) {
  this.gridSelected = false; this.listSelected = true;
    this.changeGraphTheme.searchCoinExchange().subscribe((searchT: any) => {
      // clearInterval(this.runningInterval);
      this.clearInterval = false;
      this.coinList = [];
      this.coinList = searchT;
    })
    this.changeGraphTheme.clear_portfolio_Data_listener().subscribe(() => {
      this.isLoggedin = false;
      // this.isLoggedin = true;
     

  })
  this.changeGraphTheme.portfolio_Data_listener().subscribe(() => {
      this.clearInterval = true;
      this.isLoggedin = true;
      // this.getLoggedIn = true;
      // this.isLoggedin = true;
      this.coinList = [];
  
  })
   
  }
  changeGridView(ev) {
    if (ev == 'list_view') {
      this.gridSelected = false;
      this.listSelected = true;
      document.getElementById('list_view').classList.add('active');
      document.getElementById('grid_view').classList.remove('active');
    }
    else if (ev == 'grid_view') {
      this.gridSelected = true;
      this.listSelected = false;
      document.getElementById('list_view').classList.remove('active');
      document.getElementById('grid_view').classList.add('active');
    }
  }
  key: string = 'name';
  reverse: boolean = false;
 
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  ngOnInit() {
    this.accordionData = [];
    this.addCoinModel = {}
    this.coinList = [];
    this.clearInterval = true;
    // this.showLoadSpinner = false;
    if(localStorage.getItem('userToken')){
      //  this.showLoadSpinner = true;
       this.userName = localStorage.getItem('userName');
       this.isLoggedin =true;
    }
    else{
      this.isLoggedin =false;
    }
    
    this.http.post('http://54.165.36.80:5687/exchange/coinNames','').map(response => response.json()).subscribe(data => {
            this.currencyList = data
    })
    
  }


  // getPortfolioList() {
  //   if (localStorage.getItem('userToken') && this.clearInterval) {
  //     let tokenV = localStorage.getItem('userToken');
  //     this.runningInterval =  this.http.post('http://54.165.36.80:5687/api/coins/getPortfolio', { token: tokenV }).map(
  //       response => response.json()).subscribe(
  //       data => {
  //         console.log(JSON.stringify(data))
  //         if(data.length == 0){
  //           this.noData = true;
  //         }
  //         if( this.coinList.length > 0){
  //             this.updatePortfolio(data)
  //         }
  //         else{
  //            this.showLoadSpinner = false;
  //         this.coinList = data;
  //         this.portfoliogrid = data;
  //         }
         
  //       },
  //       err => {
  //         this.showLoadSpinner = false;
  //         this.noData = true;
  //       })
  //   }
  //   else{
  //     this.showLoadSpinner = false;
  //     this.getLoggedIn = true;
  //   }
  // }
  
  
  getCurrencyDetails(value){
    this.http.get("http://54.165.36.80:5687/exchange/getusd/"+value).map(
      response => response.json()).subscribe(
      data => {
        this.coinDetails = data;
         console.log(data)
      },
  );
  }
  AddCoinIntoPortfolio(model){
    let objects = {};
    objects['name'] = this.coinDetails[0].name;
    objects['pair'] = this.coinDetails[0].pair;
    objects['price_paid'] =model['price_paid'] 
    objects['total_coins'] = model['total_coins'] 
    objects['trade_date'] = model['trade_date'] 
    objects['price'] = this.coinDetails[0].price;
    objects['dayPriceStatus'] = this.coinDetails[0].dayPriceStatus;

    console.log(objects);
    let tokenV = localStorage.getItem('userToken');
    this.http.put('http://54.165.36.80:5687/api/userSetting/addPortfolio',{token : tokenV , portfolioList : objects }).map(response => response.json()).subscribe(data => {
      
    this.coinList.push(objects);
      this.addCoin.hide();
      // this.showLoadSpinner = false;
      this.addCoinModel = {}
      document.getElementById('selectDropDown').value = 'name';
    })
    
  }
  ngOnDestroy(): void {
    // this.runningInterval.unsubscribe()
    // this.ngUnsubscribe.next();
    // this.ngUnsubscribe.complete();
  }
}
