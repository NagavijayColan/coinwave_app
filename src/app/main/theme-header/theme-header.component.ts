import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-header',
  templateUrl: './theme-header.component.html',
  styleUrls: ['./theme-header.component.css']
})
export class ThemeHeaderComponent implements OnInit {
 public hideThemesection:Boolean;
 public hideOptionsection:Boolean;
 public hideLanguageSection:Boolean;
 public currencyText;
 public currencyIcon;
 public currencyImg;
 public languageText;
 public languageImg;
 desktoplists:Array<any>;
 mobilelists:Array<any>;
  constructor() { }
 

  ngOnInit() {
    this.currencyText = 'USD';
    //this.currencyIcon = 'fa-font-awesome';
    this.currencyImg = '/assets/images/usd.png';
    this.languageText = 'ENG';
    this.languageImg = '/assets/images/united-kingdom.png';
    this.hideThemesection = true;
    this.hideOptionsection = false;
    this.hideLanguageSection = false;
    this.desktoplists = [
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
        { label:'Market Cap', ischecked:true },
        { label:'24 HR High', ischecked:true },
        { label:'24 HR Low', ischecked:true },
       ];

       this.mobilelists = [
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
        { label:'Market Cap', ischecked:true },
        { label:'24 HR High', ischecked:true },
        { label:'24 HR Low', ischecked:true },
       ];
  }



  siteColor() {

    let body = document.getElementsByTagName('body')[0];
    var currentList = body.classList.contains('black-theme');
    
    if (currentList)
    {
      body.classList.remove('black-theme');
      body.classList.add('white-theme');
    }
    else
    {
      body.classList.add('black-theme');
      body.classList.remove('white-theme');
    }
    // body.classList.remove("black-theme");
    // body.classList.add("white-theme");
    
  }

  themeSectionHide()
  {
    this.hideThemesection = !this.hideThemesection
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
