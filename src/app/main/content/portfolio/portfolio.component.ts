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
  public userName;
  constructor(private http: Http, private changeGraphTheme: CompDataSharingService) {
  this.gridSelected = false; this.listSelected = true;
    this.changeGraphTheme.searchCoinExchange().subscribe((searchT: any) => {
      this.searchText = searchT;
    })
    this.changeGraphTheme.portfolio_Data_listener().subscribe(()=>{
      this.getPortfolioList();
      this.getLoggedIn = false;
    })
    this.changeGraphTheme.clear_portfolio_Data_listener().subscribe(()=>{
      this.coinList = [];
      this.portfoliogrid = [];
      this.getLoggedIn = true;
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
       this.userName = localStorage.getItem('userName')
    }
    this.getPortfolioList();
    // setInterval(() => {
    //   this. getCoinList()
    // },3000)

  }


  getPortfolioList() {
    if (localStorage.getItem('userToken')) {
      let tokenV = localStorage.getItem('userToken');
      this.http.post('http://18.191.202.171:5687/api/coins/getPortfolio', { token: tokenV }).map(
        response => response.json()).subscribe(
        data => {
          if(data.length == 0){
            this.noData = true;
          }
          this.showLoadSpinner = false;
          this.coinList = data;
          this.portfoliogrid = data;
        },
        err => {
          this.showLoadSpinner = false;
          this.noData = true;
        }
      )
    }
    else{
      this.showLoadSpinner = false;
      this.getLoggedIn = true;
    }

  }
}
