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
  public runningInterval;
  public clearInterval;
  constructor(private http : Http,private changeGraphTheme: CompDataSharingService) { 
    this.changeGraphTheme.searchCoinExchange().subscribe((searchT: any) => {
     
      this.searchText = searchT;
    })
    this.changeGraphTheme.exchange_data_listener().subscribe(() => {
          this.exchangeData=[];
          this.exchangeDatas();
    })
  }

  ngOnInit() {
    this.clearInterval = true;
    this.noData = true;
    this.showLoadSpinner = true; 
    this.exchangeDatas();

 }
  
 key: string = 'name'; 
 reverse: boolean = false;
 sort(key){
   this.key = key;
   this.reverse = !this.reverse;
 }
 exchangeDatas(){
  this.http.get("http://54.165.36.80:5687/exchange/exchangeSummary").map(
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
 }
}
