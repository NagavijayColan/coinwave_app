import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http'
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
public coinList
  constructor(private http : Http,private changeGraphTheme : CompDataSharingService) { this.gridSelected = false; this.listSelected = true;
    this.changeGraphTheme.searchCoinExchange().subscribe((searchT:any) => {
      this.searchText =searchT;
  })
  }
  changeGridView(ev) {
    if(ev == 'list_view'){
      this.gridSelected = false;
      this.listSelected = true;
      document.getElementById('list_view').classList.add('active');
      document.getElementById('grid_view').classList.remove('active');
    }
    else if(ev == 'grid_view'){
      this.gridSelected = true;
      this.listSelected = false;
      document.getElementById('list_view').classList.remove('active');
      document.getElementById('grid_view').classList.add('active');
    }
    
 }
 key: string = 'name'; 
 reverse: boolean = false;
 sort(key){
 this.key = key;
 this.reverse = !this.reverse;
 } 
  ngOnInit() {
  this.portfoliogrid=   [ {"title":"Bitcoin" , "name": "Price", "price": "$10222.00↓" ,
                              "name1": "24 HR Change","price1": "11.20%" ,
                              "name2": "7 Day Change", "price2": "2.40%",
                              "name3": "24 HR volume", "price3": "$16,288,423,566" ,
                              "name4": "Coin Supply", "price4": "$55,476,198,311",
                              "name5": "Market Cap",  "price5": "$55,476,198,311" ,
                              "name6": "24 HR High",   "price6": "$16,784" ,
                              "name7": "24 HR Low","price7": "$16,784" 
                            },

                            {"title":"Ripple" , "name": "Price", "price": "$10222.00↓" ,
                            "name1": "24 HR Change","price1": "11.20%" ,
                            "name2": "7 Day Change", "price2": "2.40%",
                            "name3": "24 HR volume", "price3": "$16,288,423,566" ,
                            "name4": "Coin Supply", "price4": "$55,476,198,311",
                            "name5": "Market Cap",  "price5": "$55,476,198,311" ,
                            "name6": "24 HR High",   "price6": "$16,784" ,
                            "name7": "24 HR Low","price7": "$16,784" 
                          },
                     
                          {"title":"Ethereum" , "name": "Price", "price": "$10222.00↓" ,
                          "name1": "24 HR Change","price1": "11.20%" ,
                          "name2": "7 Day Change", "price2": "2.40%",
                          "name3": "24 HR volume", "price3": "$16,288,423,566" ,
                          "name4": "Coin Supply", "price4": "$55,476,198,311",
                          "name5": "Market Cap",  "price5": "$55,476,198,311" ,
                          "name6": "24 HR High",   "price6": "$16,784" ,
                          "name7": "24 HR Low","price7": "$16,784" 
                        },

                        {"title":"Bitcoin Cash" , "name": "Price", "price": "$10222.00↓" ,
                        "name1": "24 HR Change","price1": "11.20%" ,
                        "name2": "7 Day Change", "price2": "2.40%",
                        "name3": "24 HR volume", "price3": "$16,288,423,566" ,
                        "name4": "Coin Supply", "price4": "$55,476,198,311",
                        "name5": "Market Cap",  "price5": "$55,476,198,311" ,
                        "name6": "24 HR High",   "price6": "$16,784" ,
                        "name7": "24 HR Low","price7": "$16,784" 
                      },

                      {"title":"Litecoin" , "name": "Price", "price": "$10222.00↓" ,
                      "name1": "24 HR Change","price1": "11.20%" ,
                      "name2": "7 Day Change", "price2": "2.40%",
                      "name3": "24 HR volume", "price3": "$16,288,423,566" ,
                      "name4": "Coin Supply", "price4": "$55,476,198,311",
                      "name5": "Market Cap",  "price5": "$55,476,198,311" ,
                      "name6": "24 HR High",   "price6": "$16,784" ,
                      "name7": "24 HR Low","price7": "$16,784" 
                    },
                        
                    {"title":"Siacoin" , "name": "Price", "price": "$10222.00↓" ,
                    "name1": "24 HR Change","price1": "11.20%" ,
                    "name2": "7 Day Change", "price2": "2.40%",
                    "name3": "24 HR volume", "price3": "$16,288,423,566" ,
                    "name4": "Coin Supply", "price4": "$55,476,198,311",
                    "name5": "Market Cap",  "price5": "$55,476,198,311" ,
                    "name6": "24 HR High",   "price6": "$16,784" ,
                    "name7": "24 HR Low","price7": "$16,784" 
                  }

                    
  ];
  this.listData = [
       {Sno:'1',  coin: 'Bitcoin(BTC)',  price: '$10222.00↓',  HRchange: '11.20%',  dayChange: '2.20%',
        Hrvolume:'$16,288,423,566', marketCap:'$16,288,423,566', hrhigh:'$16,784',  hrlow:'$16,784', },
       {Sno:'2',  coin: 'Ripple',  price: '$10222.00↓',  HRchange: '11.20%',  dayChange: '2.20%',
        Hrvolume:'$16,288,423,566', marketCap:'$16,288,423,566', hrhigh:'$16,784',  hrlow:'$16,784', },
       {Sno:'3',  coin: 'Bitcoin(BTC)',  price: '$10222.00↓',  HRchange: '11.20%',  dayChange: '2.20%',
        Hrvolume:'$16,288,423,566', marketCap:'$16,288,423,566', hrhigh:'$16,784',  hrlow:'$16,784', },
       {Sno:'4',  coin: 'Ripple',  price: '$10222.00↓',  HRchange: '11.20%',  dayChange: '2.20%',
        Hrvolume:'$16,288,423,566', marketCap:'$16,288,423,566', hrhigh:'$16,784',  hrlow:'$16,784', },
       {Sno:'5',  coin: 'Bitcoin(BTC)',  price: '$10222.00↓',  HRchange: '11.20%',  dayChange: '2.20%',
        Hrvolume:'$16,288,423,566', marketCap:'$16,288,423,566', hrhigh:'$16,784',  hrlow:'$16,784', },
       {Sno:'6',  coin: 'Ripple',  price: '$10222.00↓',  HRchange: '11.20%',  dayChange: '2.20%',
        Hrvolume:'$16,288,423,566', marketCap:'$16,288,423,566', hrhigh:'$16,784',  hrlow:'$16,784', },
       {Sno:'7',  coin: 'Bitcoin(BTC)',  price: '$10222.00↓',  HRchange: '11.20%',  dayChange: '2.20%',
        Hrvolume:'$16,288,423,566', marketCap:'$16,288,423,566', hrhigh:'$16,784',  hrlow:'$16,784', },
       {Sno:'8',  coin: 'Ripple',  price: '$10222.00↓',  HRchange: '11.20%',  dayChange: '2.20%',
        Hrvolume:'$16,288,423,566', marketCap:'$16,288,423,566', hrhigh:'$16,784',  hrlow:'$16,784', },
       {Sno:'9',  coin: 'Bitcoin(BTC)',  price: '$10222.00↓',  HRchange: '11.20%',  dayChange: '2.20%',
        Hrvolume:'$16,288,423,566', marketCap:'$16,288,423,566', hrhigh:'$16,784',  hrlow:'$16,784', },
       {Sno:'10',  coin: 'Ripple',  price: '$10222.00↓',  HRchange: '11.20%',  dayChange: '2.20%',
        Hrvolume:'$16,288,423,566', marketCap:'$16,288,423,566', hrhigh:'$16,784',  hrlow:'$16,784', },

  ];
  this. getCoinList();
  // setInterval(() => {
  //   this. getCoinList()
  // },3000)
  
  }

  
  getCoinList(){
    if(localStorage.getItem('userToken')){
      let tokenV = localStorage.getItem('userToken');
      this.http.get('http://coinwave.service.colanonline.net/api/exchange/getPortfolio',tokenV).map(
        response => response.json()).subscribe(
            data => {
                this.coinList = data;
                this.portfoliogrid = data;
            })
    }
   
} 
}
