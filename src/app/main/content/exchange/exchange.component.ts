import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { CompDataSharingService } from "../../../comp-data-sharing.service";
@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {
  public exchangeData;
  public showLoadSpinner;
  public searchText;
  public noData;
  constructor(private http : Http,private changeGraphTheme: CompDataSharingService) { 
    this.changeGraphTheme.searchCoinExchange().subscribe((searchT: any) => {
      this.searchText = searchT;
    })
  }

  ngOnInit() {
    this.noData = true;
    this.showLoadSpinner = true; 
    this.http.get("http://18.191.202.171:5687/exchange/exchangeSummary").map(
    response => response.json()).subscribe(
      data => {
        if(data.length > 0 ){
          this.noData = false;
        }
        console.log(data)
        this.exchangeData = data;
        this.showLoadSpinner = false;
      },
    );
//     this.exchangeData = [
//       {Sno:'1',  exchange: 'Binance',  nocoins: '293',  volume: '$2,077,982,435',  volumeper: '$16,784',
//       trade:'Sign up', },
//       {Sno:'2',  exchange: 'Okex',  nocoins: '413',  volume: '$1,077,982,435',  volumeper: '$16,724',
//       trade:'Sign up', },
//       {Sno:'3',  exchange: 'Binance',  nocoins: '293',  volume: '$2,077,982,435',  volumeper: '$16,784',
//       trade:'Sign up', },
//       {Sno:'4',  exchange: 'Okex',  nocoins: '413',  volume: '$1,077,982,435',  volumeper: '$16,724',
//       trade:'Sign up', },
//       {Sno:'5',  exchange: 'Binance',  nocoins: '293',  volume: '$2,077,982,435',  volumeper: '$16,784',
//       trade:'Sign up', },
//       {Sno:'6',  exchange: 'Okex',  nocoins: '413',  volume: '$1,077,982,435',  volumeper: '$16,724',
//       trade:'Sign up', },
//       {Sno:'7',  exchange: 'Binance',  nocoins: '293',  volume: '$2,077,982,435',  volumeper: '$16,784',
//       trade:'Sign up', },
//       {Sno:'8',  exchange: 'Okex',  nocoins: '413',  volume: '$1,077,982,435',  volumeper: '$16,724',
//       trade:'Sign up', },
//  ];
 }
  
 key: string = 'name'; 
 reverse: boolean = false;
 sort(key){
   this.key = key;
   this.reverse = !this.reverse;
 }
 
}
