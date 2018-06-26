import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
import { CompDataSharingService } from "../../../comp-data-sharing.service";
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  
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
  constructor(private http: Http, private changeGraphTheme: CompDataSharingService) {
  this.gridSelected = false; this.listSelected = true;
    this.changeGraphTheme.searchCoinExchange().subscribe((searchT: any) => {
      this.searchText = searchT;
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
    if(localStorage.getItem('userToken')){
       this.showLoadSpinner = true;
    }
    this.listData = [
      {
        Sno: '1', coin: 'Bitcoin(BTC)', price: '$10222.00↓', HRchange: '11.20%', dayChange: '2.20%',
        Hrvolume: '$16,288,423,566', marketCap: '$16,288,423,566', hrhigh: '$16,784', hrlow: '$16,784',
      },
      {
        Sno: '2', coin: 'Ripple', price: '$10222.00↓', HRchange: '11.20%', dayChange: '2.20%',
        Hrvolume: '$16,288,423,566', marketCap: '$16,288,423,566', hrhigh: '$16,784', hrlow: '$16,784',
      },
      {
        Sno: '3', coin: 'Bitcoin(BTC)', price: '$10222.00↓', HRchange: '11.20%', dayChange: '2.20%',
        Hrvolume: '$16,288,423,566', marketCap: '$16,288,423,566', hrhigh: '$16,784', hrlow: '$16,784',
      },
      {
        Sno: '4', coin: 'Ripple', price: '$10222.00↓', HRchange: '11.20%', dayChange: '2.20%',
        Hrvolume: '$16,288,423,566', marketCap: '$16,288,423,566', hrhigh: '$16,784', hrlow: '$16,784',
      },
      {
        Sno: '5', coin: 'Bitcoin(BTC)', price: '$10222.00↓', HRchange: '11.20%', dayChange: '2.20%',
        Hrvolume: '$16,288,423,566', marketCap: '$16,288,423,566', hrhigh: '$16,784', hrlow: '$16,784',
      },
      {
        Sno: '6', coin: 'Ripple', price: '$10222.00↓', HRchange: '11.20%', dayChange: '2.20%',
        Hrvolume: '$16,288,423,566', marketCap: '$16,288,423,566', hrhigh: '$16,784', hrlow: '$16,784',
      },
      {
        Sno: '7', coin: 'Bitcoin(BTC)', price: '$10222.00↓', HRchange: '11.20%', dayChange: '2.20%',
        Hrvolume: '$16,288,423,566', marketCap: '$16,288,423,566', hrhigh: '$16,784', hrlow: '$16,784',
      },
      {
        Sno: '8', coin: 'Ripple', price: '$10222.00↓', HRchange: '11.20%', dayChange: '2.20%',
        Hrvolume: '$16,288,423,566', marketCap: '$16,288,423,566', hrhigh: '$16,784', hrlow: '$16,784',
      },
      {
        Sno: '9', coin: 'Bitcoin(BTC)', price: '$10222.00↓', HRchange: '11.20%', dayChange: '2.20%',
        Hrvolume: '$16,288,423,566', marketCap: '$16,288,423,566', hrhigh: '$16,784', hrlow: '$16,784',
      },
      {
        Sno: '10', coin: 'Ripple', price: '$10222.00↓', HRchange: '11.20%', dayChange: '2.20%',
        Hrvolume: '$16,288,423,566', marketCap: '$16,288,423,566', hrhigh: '$16,784', hrlow: '$16,784',
      },

    ];
    this.getCoinList();
    // setInterval(() => {
    //   this. getCoinList()
    // },3000)

  }


  getCoinList() {
    if (localStorage.getItem('userToken')) {
      let tokenV = localStorage.getItem('userToken');
      this.http.post('http://coinwave.service.colanonline.net/api/coins/getPortfolio', { token: tokenV }).map(
        response => response.json()).subscribe(
        data => {
          if(data.length == 0){
            this.noData = true;
          }
          this.showLoadSpinner = false;
          this.coinList = data;
          this.portfoliogrid = data;
        })
    }
    else{
      this.getLoggedIn = true;
    }

  }
}
