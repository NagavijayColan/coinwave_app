import { Component, OnInit } from '@angular/core';
import { OrderPipe } from 'ngx-order-pipe';
import { CompDataSharingService } from "../../comp-data-sharing.service";
@Component({
  selector: 'app-theme-header',
  templateUrl: './theme-header.component.html',
  styleUrls: ['./theme-header.component.css']
})
export class ThemeHeaderComponent implements OnInit {
   
  order: string = 'info.languagename';
  currencyorder: string = 'info.currencyname';

  // reverse: boolean = false;
  collection: any[] = [
    { info: {languagename: 'ENG', languageimage:'assets/images/united-kingdom.png'} }, 
    { info: {languagename: 'FRE', languageimage:'assets/images/france.png'} },

  ];

  collection1: any[] = [
   
    { info: {currencyname: 'USD', currencyimage:'assets/images/dollar.png'} }, 
    { info: {currencyname: 'INR', currencyimage:'assets/images/inr.png'} },
  ];

  
  sortedCollection: any[];
  sortedCollection1: any[];

 public hideThemesection:Boolean;
 public hideOptionsection:Boolean;
 public hideLanguageSection:Boolean;
 public currencyText;
 public currencyIcon;
 public currencyImg;
 public languageText;
 public languageImg;
 graphThemeColor:any;
 themeBlack : any;
 themeWhite : any;
 desktoplists:Array<any>;
 mobilelists:Array<any>;
 constructor(private orderPipe: OrderPipe, private changeGraphTheme : CompDataSharingService) { }




//  setOrder(value: string) {
//   if (this.order === value) {debugger
//     this.reverse = !this.reverse;
//   }
//   this.order = value;

// }
key: string = 'name'; 
reverse: boolean = false;
sort(key){
  this.key = key;
  this.reverse = !this.reverse;
}
// setCurrencyOrder(value: string) {
//   if (this.currencyorder === value) {
//     this.reverse = !this.reverse;
//   }
//   this.currencyorder = value;
// }
ngOnInit() {
    this.themeBlack = {
      bgCOlor : '#000',
      theme:"dark"
    }
    this.themeWhite = {
      bgCOlor : '#fff',
      theme:"light"
    }
    this.changeGraphTheme.currentMessage.subscribe(message => this.graphThemeColor = message)
    this.sortedCollection = this.orderPipe.transform(this.collection, 'info.languagename');
    this.sortedCollection1 = this.orderPipe.transform(this.collection1, 'info.currencyname');
    this.currencyText = 'USD';
    //this.currencyIcon = 'fa-font-awesome';
    this.currencyImg = '/assets/images/dollar.png';
    this.languageText = 'ENG';
    this.languageImg = '/assets/images/united-kingdom.png';
    // this.hideThemesection = true;
    this.hideOptionsection = false;
    this.hideLanguageSection = false;
    if(sessionStorage.getItem('hideThemesection')){
      this.hideThemesection = JSON.parse(sessionStorage.getItem('hideThemesection'));
    }
    else{
      this.hideThemesection = true;
      sessionStorage.setItem('hideThemesection','true')
     
    }
    
   
    this.desktoplists = [
        { label:'Expand', ischecked:true },
        { label:'Favourite', ischecked:true },
        { label:'Coin', ischecked:true },
        { label:'Price', ischecked:true },
        { label:'24 HR Change', ischecked:true },
        { label:'7 Day Change', ischecked:true },
        { label:'24 HR Volume', ischecked:true },
        { label:'Market Cap', ischecked:true },
        { label:'24 HR High', ischecked:true },
        { label:'24 HR Low', ischecked:true },
        { label:'24 HR Volume', ischecked:true },
        { label:'Circulation Supply ', ischecked:false },
        { label:'Total Supply', ischecked:false },
        { label:'Exchanges ', ischecked:false },
       ];

       this.mobilelists = [
        { label:'Expand', ischecked:true },
        { label:'Favourite', ischecked:true },
        { label:'Coin', ischecked:true },
        { label:'Price', ischecked:true },
        { label:'24 HR Change', ischecked:true },
        { label:'7 Day Change', ischecked:true },
        { label:'24 HR Volume', ischecked:false },
        { label:'Market Cap', ischecked:false },
        { label:'24 HR High', ischecked:false },
        { label:'24 HR Low', ischecked:false },
        { label:'24 HR Volume', ischecked:false },
        { label:'Circulation Supply ', ischecked:false },
        { label:'Total Supply', ischecked:false },
        { label:'Exchanges ', ischecked:false },
       ];
       this.changeGraphTheme.changeMessage( this.themeBlack);
      }



  siteColor() {
    let body = document.getElementsByTagName('body')[0];
    var currentList = body.classList.contains('black-theme');
    if (currentList)
    {
      this.changeGraphTheme.changeMessage(this.themeWhite)
      body.classList.remove('black-theme');
      body.classList.add('white-theme');
    }
    else
    {
      this.changeGraphTheme.changeMessage(this.themeBlack)
      body.classList.add('black-theme');
      body.classList.remove('white-theme');
    }
  }

  themeSectionHide()
  {debugger
    sessionStorage.setItem('hideThemesection','false');
    this.hideThemesection = JSON.parse(sessionStorage.getItem('hideThemesection'));
  }


  CurrencySelect()
  {
    this.hideOptionsection = !this.hideOptionsection
  }

  LanguageSelect()
  {
    this.hideLanguageSection = !this.hideLanguageSection
  }
  

  nightmode()
  {
    let body = document.getElementsByTagName('body')[0];
    
    if ( !(body.classList.contains('night_mode')))
    {
      body.classList.add('night_mode');
    }
    else
    {
      body.classList.remove('night_mode');
    }
  }
  selectCurrency(text,image){
    this.currencyText = text;
    //this.currencyIcon = icon;
    this.currencyImg = image;
    this.hideOptionsection = !this.hideOptionsection;
  }


  selectLanguage(text,image){
    this.languageText = text;
    //this.currencyIcon = icon;
    this.languageImg = image;
    this.hideLanguageSection = !this.hideLanguageSection;
  }



}


