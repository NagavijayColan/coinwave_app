import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import { OrderPipe } from 'ngx-order-pipe';
import { CompDataSharingService } from "../../comp-data-sharing.service";
import { document } from 'angular-bootstrap-md/utils/facade/browser';
// import { setTimeout } from 'timers';
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
     {languagename: 'ENG', languageimage:'assets/images/united-kingdom.png'}, 
     {languagename: 'FRE', languageimage:'assets/images/france.png'}

  ];
  collection1: any[] = [
   
     {currencyname: 'USD', currencyimage:'assets/images/dollar.png'}, 
    {currencyname: 'INR', currencyimage:'assets/images/inr.png'},
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
 public changeRefreshRate;
 graphThemeColor:any;
 customizeCol:any;
 themeBlack : any;
 themeWhite : any;
 desktoplists:Array<any>;
 mobilelists:Array<any>;
 public someRange2config;
 public someRange2;
 public volume_white;
 public volume_black;
 public passData2Comp:any;
 
 key: string = ''; 
  reverse: boolean = false;
 constructor(private orderPipe: OrderPipe, private changeGraphTheme : CompDataSharingService) { 
  this.someRange2 = 10;
 }

ngOnInit() {
  this.changeRefreshRate = '1 Sec';
  this.passData2Comp ={
    theme : '',
    refreshrate : ''
  }
 this.sort('currencyname');
 this.sort('languagename');
  this.someRange2config = {
      snap :true,
      animate: true,
      range: {
        'min': 1,
        '25%': 5,
        '50%': 30,
        '75%': 60,
        'max': 300
      },
      pips: {
        mode: 'steps',
        density: 5
      }
  }
    this.themeBlack = {
      'volumePaneSize': "large",
      'editorFontsList': ['Verdana', 'Courier New', 'Times New Roman', 'Arial'],

      'paneProperties.background': "#000",
      'paneProperties.vertGridProperties.color': "#000",
     ' paneProperties.vertGridProperties.style': 0,
      'paneProperties.horzGridProperties.color': "#000",
      'paneProperties.horzGridProperties.style': 0,
      'paneProperties.crossHairProperties.color': "#989898",
      'paneProperties.crossHairProperties.width': 1,
      'paneProperties.crossHairProperties.style': 2,

      'paneProperties.topMargin': 5,
      'paneProperties.bottomMargin': 5,

      'paneProperties.leftAxisProperties.autoScale':true                    ,
      'paneProperties.leftAxisProperties.autoScaleDisabled':false           ,
      'paneProperties.leftAxisProperties.percentage':false,
      'paneProperties.leftAxisProperties.percentageDisabled':false,
      'paneProperties.leftAxisProperties.log':false,
      'paneProperties.leftAxisProperties.logDisabled':false,
      'paneProperties.leftAxisProperties.alignLabels':true,

      'scalesProperties.showLeftScale ': false,
      'scalesProperties.showRightScale ': true,
      'scalesProperties.backgroundColor ': "#ffffff",
      'scalesProperties.fontSize': 11,
      'scalesProperties.lineColor ': "#555",
      'scalesProperties.textColor ': "#555",
      'scalesProperties.scaleSeriesOnly ': false,
      'scalesProperties.showSeriesLastValue': true,
      'scalesProperties.showSeriesPrevCloseValue': false,
      'scalesProperties.showStudyLastValue': false,
      'scalesProperties.showStudyPlotLabels': false,
      'scalesProperties.showSymbolLabels': false,

      'timeScale.rightOffset': 5,

      'timezone': "Itc/UTC",


      'mainSeriesProperties.style': 1,

      'mainSeriesProperties.showCountdown': true,
      'mainSeriesProperties.visible':true,
      'mainSeriesProperties.showPriceLine': true,
      'mainSeriesProperties.priceLineWidth': 1,
      'mainSeriesProperties.lockScale': false,
      'mainSeriesProperties.minTick': "default",

      'mainSeriesProperties.priceAxisProperties.autoScale':true             ,
      'mainSeriesProperties.priceAxisProperties.autoScaleDisabled':false    ,
      'mainSeriesProperties.priceAxisProperties.percentage':false,
      'mainSeriesProperties.priceAxisProperties.percentageDisabled':false,
      'mainSeriesProperties.priceAxisProperties.log':false,
      'mainSeriesProperties.priceAxisProperties.logDisabled':false,

      'symbolWatermarkProperties.color ': "rgba(0, 0, 0, 0.00)",

      'mainSeriesProperties.candleStyle.upColor': "#ff6939",
      'mainSeriesProperties.candleStyle.downColor': "#000",
      'mainSeriesProperties.candleStyle.drawWick': true,
      'mainSeriesProperties.candleStyle.drawBorder': true,
      'mainSeriesProperties.candleStyle.borderColor': "#378658",
      'mainSeriesProperties.candleStyle.borderUpColor': "green",
      'mainSeriesProperties.candleStyle.borderDownColor': "green",
      'mainSeriesProperties.candleStyle.wickUpColor': 'rgba( 115, 115, 117, 1)',
      'mainSeriesProperties.candleStyle.wickDownColor': 'rgba( 115, 115, 117, 1)',
      'mainSeriesProperties.candleStyle.barColorsOnPrevClose': false,

      'mainSeriesProperties.hollowCandleStyle.upColor': "green",
      'mainSeriesProperties.hollowCandleStyle.downColor': "#000",
      'mainSeriesProperties.hollowCandleStyle.drawWick': true,
      'mainSeriesProperties.hollowCandleStyle.drawBorder': true,
      'mainSeriesProperties.hollowCandleStyle.borderColor': "#378658",
      'mainSeriesProperties.hollowCandleStyle.borderUpColor': "#000",
      'mainSeriesProperties.hollowCandleStyle.borderDownColor': "green",
      'mainSeriesProperties.hollowCandleStyle.wickColor': "#737375",
      "symbolWatermarkProperties.transparency": 100,

      "mainSeriesProperties.lineStyle.color": "yellow",
      "mainSeriesProperties.lineStyle.linestyle": 0,
      "mainSeriesProperties.lineStyle.linewidth": 1,
      "mainSeriesProperties.lineStyle.priceSource": "close",

    "mainSeriesProperties.barStyle.upColor": "#6ba583",
    "mainSeriesProperties.barStyle.downColor": "#d75442",
    "mainSeriesProperties.barStyle.barColorsOnPrevClose": false,
    "mainSeriesProperties.barStyle.dontDrawOpen": false,
}

    this.themeWhite  = {
      'volumePaneSize': "large",
      'editorFontsList': ['Verdana', 'Courier New', 'Times New Roman', 'Arial'],

      'paneProperties.background': "#fff",
      'paneProperties.vertGridProperties.color': "#E6E6E6",
     ' paneProperties.vertGridProperties.style': 0,
      'paneProperties.horzGridProperties.color': "#E6E6E6",
      'paneProperties.horzGridProperties.style': 0,
      'paneProperties.crossHairProperties.color': "#989898",
      'paneProperties.crossHairProperties.width': 1,
      'paneProperties.crossHairProperties.style': 2,

      'paneProperties.topMargin': 5,
      'paneProperties.bottomMargin': 5,

      'paneProperties.leftAxisProperties.autoScale':true                    ,
      'paneProperties.leftAxisProperties.autoScaleDisabled':false           ,
      'paneProperties.leftAxisProperties.percentage':false,
      'paneProperties.leftAxisProperties.percentageDisabled':false,
      'paneProperties.leftAxisProperties.log':false,
      'paneProperties.leftAxisProperties.logDisabled':false,
      'paneProperties.leftAxisProperties.alignLabels':true,

      'scalesProperties.showLeftScale ': false,
      'scalesProperties.showRightScale ': true,
      'scalesProperties.backgroundColor ': "#ffffff",
      'scalesProperties.fontSize': 11,
      'scalesProperties.lineColor ': "#555",
      'scalesProperties.textColor ': "#555",
      'scalesProperties.scaleSeriesOnly ': false,
      'scalesProperties.showSeriesLastValue': true,
      'scalesProperties.showSeriesPrevCloseValue': false,
      'scalesProperties.showStudyLastValue': false,
      'scalesProperties.showStudyPlotLabels': false,
      'scalesProperties.showSymbolLabels': false,

      'timeScale.rightOffset': 5,

      'timezone': "Etc/UTC",


      'mainSeriesProperties.style': 1,

      'mainSeriesProperties.showCountdown': true,
      'mainSeriesProperties.visible':true,
      'mainSeriesProperties.showPriceLine': true,
      'mainSeriesProperties.priceLineWidth': 1,
      'mainSeriesProperties.lockScale': false,
      'mainSeriesProperties.minTick': "default",

      'mainSeriesProperties.priceAxisProperties.autoScale':true             ,
      'mainSeriesProperties.priceAxisProperties.autoScaleDisabled':false    ,
      'mainSeriesProperties.priceAxisProperties.percentage':false,
      'mainSeriesProperties.priceAxisProperties.percentageDisabled':false,
      'mainSeriesProperties.priceAxisProperties.log':false,
      'mainSeriesProperties.priceAxisProperties.logDisabled':false,

      'symbolWatermarkProperties.color ': "rgba(0, 0, 0, 0.00)",

      'mainSeriesProperties.candleStyle.upColor': "#53b987",
      'mainSeriesProperties.candleStyle.downColor': "#eb4d5c",
      'mainSeriesProperties.candleStyle.drawWick': true,
      'mainSeriesProperties.candleStyle.drawBorder': true,
      'mainSeriesProperties.candleStyle.borderColor': "#378658",
      'mainSeriesProperties.candleStyle.borderUpColor': "#225437",
      'mainSeriesProperties.candleStyle.borderDownColor': "#5b1a13",
      'mainSeriesProperties.candleStyle.wickUpColor': 'rgba( 115, 115, 117, 1)',
      'mainSeriesProperties.candleStyle.wickDownColor': 'rgba( 115, 115, 117, 1)',
      'mainSeriesProperties.candleStyle.barColorsOnPrevClose': false,

      'mainSeriesProperties.hollowCandleStyle.upColor': "#6ba583",
      'mainSeriesProperties.hollowCandleStyle.downColor': "#d75442",
      'mainSeriesProperties.hollowCandleStyle.drawWick': true,
      'mainSeriesProperties.hollowCandleStyle.drawBorder': true,
      'mainSeriesProperties.hollowCandleStyle.borderColor': "#378658",
      'mainSeriesProperties.hollowCandleStyle.borderUpColor': "#225437",
      'mainSeriesProperties.hollowCandleStyle.borderDownColor': "#5b1a13",
      'mainSeriesProperties.hollowCandleStyle.wickColor': "#737375",
      
      "mainSeriesProperties.lineStyle.color": "rgb(60, 120, 216)",
      "mainSeriesProperties.lineStyle.linestyle": 0,
      "mainSeriesProperties.lineStyle.linewidth": 1,
      "mainSeriesProperties.lineStyle.priceSource": "close",

    "mainSeriesProperties.barStyle.upColor": "#6ba583",
    "mainSeriesProperties.barStyle.downColor": "#d75442",
    "mainSeriesProperties.barStyle.barColorsOnPrevClose": false,
    "mainSeriesProperties.barStyle.dontDrawOpen": false,
  }
  this.volume_white = {
    "volume.volume.color.0": "#6bfffe",
    "volume.volume.color.1": "#00cac8",
    "volume.volume.transparency": 70,
    "volume.volume ma.color": "#FF0000",
    "volume.volume ma.transparency": 30,
    "volume.volume ma.linewidth": 5,
    "volume.show ma": true,
    "bollinger bands.median.color": "#33FF88",
    "bollinger bands.upper.linewidth": 7
}
this.volume_black ={
  "volume.volume.color.0": "#fff",
  "volume.volume.color.1": "#cccccc",
  "volume.volume.transparency": 100,
  "volume.volume ma.color": "#FF0000",
  "volume.volume ma.transparency": 100,
  "volume.volume ma.linewidth": 5,
  "volume.show ma": true,
  "bollinger bands.median.color": "#33FF88",
  "bollinger bands.upper.linewidth": 7
}
    this.changeGraphTheme.currentMessage.subscribe(message => this.graphThemeColor = message);
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
        { label:'24 HR (%)', ischecked:true },
        { label:'7 Day (%)', ischecked:true },
        { label:'Volume (24 H)', ischecked:true },
        { label:'Market Cap', ischecked:true },
        { label:'24 HR High/Low', ischecked:true },
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
        { label:'24 HR (%) ', ischecked:true },
        { label:'7 Day (%)', ischecked:true },
        { label:'Volume (24H)', ischecked:false },
        { label:'Market Cap', ischecked:false },
        { label:'24 HR High/Low', ischecked:false },
        { label:'24 HR Volume', ischecked:false },
        { label:'Circulation Supply ', ischecked:false },
        { label:'Total Supply', ischecked:false },
        { label:'Exchanges ', ischecked:false },
       ];
       
       this.passData2Comp.theme = this.themeBlack
       this.passData2Comp.refreshrate = '1';
       this.passData2Comp.volumeTheme = this.volume_black;
       this.passData2Comp.toolsBg = '#000'
       this.changeGraphTheme.changeMessage(this.passData2Comp);
       setTimeout(()=>{
        let valueArray = ['1 Sec','5 Sec','30 Sec ','1 Min','5 Min'];
        let arrayL = document.getElementsByClassName('noUi-value');
        for(let m = 0; m < valueArray.length;m++){
          arrayL[m].textContent = valueArray[m]
         }
       },1000)
       this.changeGraphTheme.customizeFilter(this.desktoplists )
      }
  siteColor() {
    let body = document.getElementsByTagName('body')[0];
    var currentList = body.classList.contains('black-theme');
    if (currentList)
    {
      this.passData2Comp.theme = this.themeWhite
      this.passData2Comp.volumeTheme = this.volume_white;
      this.passData2Comp.toolsBg = '#fff'
      this.changeGraphTheme.changeMessage(this.passData2Comp);
     
      body.classList.remove('black-theme');
      body.classList.add('white-theme');
    }
    else
    {
      this.passData2Comp.theme = this.themeBlack
      this.passData2Comp.volumeTheme = this.volume_black;
      this.passData2Comp.toolsBg = '#000'
      this.changeGraphTheme.changeMessage(this.themeBlack)
      body.classList.add('black-theme');
      body.classList.remove('white-theme');
    }
  }

  themeSectionHide()
  {
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
  refreshRateChange(){
    
    this.changeRefreshRate = document.getElementsByClassName('noUi-handle')[0].getAttribute('aria-valuetext').toString();
    
    if(this.changeRefreshRate > 59 ){
      this.changeRefreshRate = (this.changeRefreshRate / 60) + ' Min';
    }
    else{
      this.changeRefreshRate = this.changeRefreshRate + ' Sec';
    }
    document.getElementsByClassName('noUi-tooltip')[0].innerHTML = this.changeRefreshRate 
    this.changeGraphTheme.refreshRateFilter( document.getElementsByClassName('noUi-handle')[0].getAttribute('aria-valuetext'));

  }
  noRefresh(){
    this.changeGraphTheme.refreshRateFilter('false');
  }
  sort(key){
  this.key = key;
  this.reverse = !this.reverse;
  }
  coulumnCustomization(k,l){
    this.changeGraphTheme.customizeFilter(k)
  }
  
}


