import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {
  public exchangeData;
  constructor(private http : Http) { }

  ngOnInit() {
   
    this.http.get("http://coinwave.service.colanonline.net/exchange/exchangeSummary").map(
    response => response.json()).subscribe(
      data => {   this.exchangeData = data;
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
