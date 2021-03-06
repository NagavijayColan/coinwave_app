import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { OrderPipe } from 'ngx-order-pipe';
import { CompDataSharingService } from "../../comp-data-sharing.service";
import { document } from 'angular-bootstrap-md/utils/facade/browser';
import { Http } from '@angular/http';
import { Router } from '@angular/router'
import { CommonServiceService } from '../../common-service.service';
import { CookieService } from 'ngx-cookie-service';
import { clearInterval } from 'timers';
@Component({
  selector: 'app-theme-header',
  templateUrl: './theme-header.component.html',
  styleUrls: ['./theme-header.component.css']
})
export class ThemeHeaderComponent implements OnInit {
  @ViewChild('loginform') public loginModal;
  @ViewChild('registerform') public signUpModal;
  @ViewChild('successMessage') public successMessageModal;
  // @ViewChild('registerform') public signUpModal;
  order: string = 'info.languagename';
  currencyorder: string = 'info.currencyname';

  // reverse: boolean = false;
  collection: any[] = [
    { languagename: 'ENG', languageimage: 'assets/images/united-kingdom.png' },
    { languagename: 'FRE', languageimage: 'assets/images/france.png' }

  ];
  collection1: any[] = [

    { currencyname: 'USD', currencyimage: 'assets/images/dollar.png' },
    { currencyname: 'INR', currencyimage: 'assets/images/inr.png' },
  ];


  sortedCollection: any[];
  sortedCollection1: any[];
  public appList;
  public currencyTypeList;
  public currencyvalue;
  public hideThemesection: Boolean;
  public hideOptionsection: Boolean;
  public hideLanguageSection: Boolean;
  public currencyText;
  public currencyIcon;
  public currencyImg;
  public languageText;
  public languageImg;
  public changeRefreshRate;
  graphThemeColor: any;
  customizeCol: any;
  themeBlack: any;
  themeWhite: any;
  desktoplists: Array<any>;
  mobilelists: Array<any>;
  public someRange2config;
  public someRange;
  public volume_white;
  public volume_black;
  public passData2Comp: any;
  public themeSettings = {}
  public refreshDefault;
  public successMessagePopup;
  public popUpEnabled;
  public desktopPlist;
  public mobilePlist;
  public appPList;
  // public coinlist_desktop;
  // public coinlist_mobile;
  // public coinlist_app;
  // public portfolio_desktop;
  // public portfolio_mobile;
  // public portfolio_app;
  userLogin: any = {};
  userReg: any = {};
  key: string = '';
  reverse: boolean = false;
  public colorOfSite;
  public enableRefreshBtn;
  constructor(private router : Router,private cookieService: CookieService, private commonService: CommonServiceService, private http: Http, private orderPipe: OrderPipe, private changeGraphTheme: CompDataSharingService) {
    this.changeGraphTheme.changeTo_default_theme_listener().subscribe(() => {
      this.defaultTheme();
    })
    this.changeGraphTheme.userProfile_listener().subscribe(() => {
      this.userTheme();
    })
    
   
    
  }
  ngOnInit() {
    // if(this.router.url === '/coinlist'){
    //   this.coinlist_desktop = true;
    //   this.coinlist_app = true;
    //   this.coinlist_mobile = true;
    //   this.portfolio_app = false;
    //   this.portfolio_desktop = false;
    //   this.portfolio_mobile = false;
    // }
    // else if(this.router.url === '/portfolio'){
    //   this.portfolio_app = true;
    //   this.portfolio_desktop = true;
    //   this.portfolio_mobile = true;
    //   this.coinlist_desktop = false;
    //   this.coinlist_app = false;
    //   this.coinlist_mobile = false;
    // }
    this.loadScript()
    this.popUpEnabled = true;
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

      'paneProperties.leftAxisProperties.autoScale': true,
      'paneProperties.leftAxisProperties.autoScaleDisabled': false,
      'paneProperties.leftAxisProperties.percentage': false,
      'paneProperties.leftAxisProperties.percentageDisabled': false,
      'paneProperties.leftAxisProperties.log': false,
      'paneProperties.leftAxisProperties.logDisabled': false,
      'paneProperties.leftAxisProperties.alignLabels': true,

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
      'mainSeriesProperties.visible': true,
      'mainSeriesProperties.showPriceLine': true,
      'mainSeriesProperties.priceLineWidth': 1,
      'mainSeriesProperties.lockScale': false,
      'mainSeriesProperties.minTick': "default",

      'mainSeriesProperties.priceAxisProperties.autoScale': true,
      'mainSeriesProperties.priceAxisProperties.autoScaleDisabled': false,
      'mainSeriesProperties.priceAxisProperties.percentage': false,
      'mainSeriesProperties.priceAxisProperties.percentageDisabled': false,
      'mainSeriesProperties.priceAxisProperties.log': false,
      'mainSeriesProperties.priceAxisProperties.logDisabled': false,

      'symbolWatermarkProperties.color ': "rgba(0, 0, 0, 0.00)",

      'mainSeriesProperties.candleStyle.upColor': "#1abc9c",
      'mainSeriesProperties.candleStyle.downColor': "#000",
      'mainSeriesProperties.candleStyle.drawWick': true,
      'mainSeriesProperties.candleStyle.drawBorder': true,
      'mainSeriesProperties.candleStyle.borderColor': "#1abc9c",
      'mainSeriesProperties.candleStyle.borderUpColor': "#9b59b6",
      'mainSeriesProperties.candleStyle.borderDownColor': "#9b59b6",
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

    this.themeWhite = {
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
      'paneProperties.leftAxisProperties.autoScale': true,
      'paneProperties.leftAxisProperties.autoScaleDisabled': false,
      'paneProperties.leftAxisProperties.percentage': false,
      'paneProperties.leftAxisProperties.percentageDisabled': false,
      'paneProperties.leftAxisProperties.log': false,
      'paneProperties.leftAxisProperties.logDisabled': false,
      'paneProperties.leftAxisProperties.alignLabels': true,

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
      'mainSeriesProperties.visible': true,
      'mainSeriesProperties.showPriceLine': true,
      'mainSeriesProperties.priceLineWidth': 1,
      'mainSeriesProperties.lockScale': false,
      'mainSeriesProperties.minTick': "default",

      'mainSeriesProperties.priceAxisProperties.autoScale': true,
      'mainSeriesProperties.priceAxisProperties.autoScaleDisabled': false,
      'mainSeriesProperties.priceAxisProperties.percentage': false,
      'mainSeriesProperties.priceAxisProperties.percentageDisabled': false,
      'mainSeriesProperties.priceAxisProperties.log': false,
      'mainSeriesProperties.priceAxisProperties.logDisabled': false,

      'symbolWatermarkProperties.color ': "rgba(0, 0, 0, 0.00)",

      'mainSeriesProperties.candleStyle.upColor': "#53b987",
      'mainSeriesProperties.candleStyle.downColor': "#eb4d5c",
      'mainSeriesProperties.candleStyle.drawWick': true,
      'mainSeriesProperties.candleStyle.drawBorder': true,
      'mainSeriesProperties.candleStyle.borderColor': "#53b987",
      'mainSeriesProperties.candleStyle.borderUpColor': "#53b987",
      'mainSeriesProperties.candleStyle.borderDownColor': "#eb4d5c",
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
      "volume.volume.color.0": "#cbeadb",
      "volume.volume.color.1": "#f9c9ce",
      "volume.volume.transparency": 70,
      "volume.volume ma.color": "#FF0000",
      "volume.volume ma.transparency": 30,
      "volume.volume ma.linewidth": 5,
      "volume.show ma": true,
      "bollinger bands.median.color": "#33FF88",
      "bollinger bands.upper.linewidth": 7
    }
    this.volume_black = {
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
    this.currencyText = 'USD'
    this.enableRefreshBtn = false;
    this.passData2Comp = {};
    this.someRange = 1;
    if (localStorage.getItem('userToken')) {
      this.userTheme();
    }
    else {
      this.defaultTheme();
    }
    this.http.get('http://54.165.36.80:5687/getCurrencies').map(response => response.json()).subscribe(data => {
      console.log(data)
      this.currencyTypeList = data;
    })
    this.sort('currencyname');
    this.sort('languagename');
    this.someRange2config = {
      snap: true,
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
    
    this.changeGraphTheme.currentMessage.subscribe(message => this.graphThemeColor = message);
    this.currencyImg = '/assets/images/dollar.png';
    this.languageText = 'ENG';
    this.languageImg = '/assets/images/united-kingdom.png';
    // this.hideThemesection = true;
    this.hideOptionsection = false;
    this.hideLanguageSection = false;

    if (sessionStorage.getItem('hideThemesection')) {
      this.hideThemesection = JSON.parse(sessionStorage.getItem('hideThemesection'));
    }
    else {
      this.hideThemesection = true;
      sessionStorage.setItem('hideThemesection', 'true');
    }
    setTimeout(() => {
      let valueArray = ['1 Sec', '5 Sec', '30 Sec ', '1 Min', '5 Min'];
      let arrayL = document.getElementsByClassName('noUi-value');
      for (let m = 0; m < valueArray.length; m++) {
        arrayL[m].textContent = valueArray[m]
      }
    }, 1000)
    // this.changeGraphTheme.customizeColumns_filter(this.desktoplists);
    setTimeout(() => {
      let langDropDown = document.getElementsByClassName("goog-te-combo")[0];

      langDropDown.addEventListener("change", this.changeSiteLanguage());
    }, 3000);
  }
  loadScript() {
    console.log(document.getElementById('google_translate_element'))
    if(document.getElementById('google_translate_element')){
        alert()
    }
    else{
       let body = <HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.defer = true;
    body.appendChild(script);
    let scriptLoad = document.createElement('script');
    scriptLoad.innerHTML =  "function googleTranslateElementInit() {new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');}"
    body.appendChild(scriptLoad);
    }
}
  siteColor() {
    let siteColor;
    let body = document.getElementsByTagName('body')[0];
    var currentList = body.classList.contains('black-theme');
    if (currentList) {
      this.passData2Comp.theme = this.themeWhite
      this.passData2Comp.volumeTheme = this.volume_white;
      this.passData2Comp.toolsBg = '#fff'
      this.changeGraphTheme.changeMessage(this.passData2Comp);
      this.changeGraphTheme.chnageTheme_of_amchart_filter('white');
      body.classList.remove('black-theme');
      body.classList.add('white-theme');
      siteColor = 'white-theme'
    }
    else {
      this.passData2Comp.theme = this.themeBlack
      this.passData2Comp.volumeTheme = this.volume_black;
      this.passData2Comp.toolsBg = '#000'
      this.changeGraphTheme.changeMessage(this.passData2Comp);
      this.changeGraphTheme.chnageTheme_of_amchart_filter('black');
      body.classList.add('black-theme');
      body.classList.remove('white-theme');
      siteColor = 'black-theme';
    }
    this.themeSettings['siteColor'] = siteColor;
  }

  themeSectionHide() {
    sessionStorage.setItem('hideThemesection', 'false');
    this.hideThemesection = JSON.parse(sessionStorage.getItem('hideThemesection'));
  }


  CurrencySelect() {
    this.hideOptionsection = !this.hideOptionsection
  }

  LanguageSelect() {
    this.hideLanguageSection = !this.hideLanguageSection
  }

  nightmode() {
    let body = document.getElementsByTagName('body')[0];
    let night_mode;
    if (!(body.classList.contains('night_mode'))) {
      body.classList.add('night_mode');
      night_mode = 'night_mode';
    }
    else {
      body.classList.remove('night_mode');
      night_mode = 'day_mode'
    }
    this.themeSettings['nightMode'] = night_mode;
    this.forceLogin();
  }

  selectCurrency(text, image) {
    
    this.http.post('http://54.165.36.80:5687/currencyConverter', { converter: text }).map(response => response.json()).subscribe(data => {
      this.currencyvalue = data.rate.toFixed(2);
      localStorage.setItem('currencyRate', this.currencyvalue);

      this.changeGraphTheme.currencyConverter_filter(this.currencyvalue)
    })
    this.currencyText = '';
    this.currencyText = text;
    this.currencyImg = image;
    this.hideOptionsection = !this.hideOptionsection;
    this.themeSettings['currencyType'] = text;
    this.forceLogin();
  }


  selectLanguage(text, image) {
    this.languageText = text;
    //this.currencyIcon = icon;
    this.languageImg = image;
    this.hideLanguageSection = !this.hideLanguageSection;
  }

  refreshRateChange() {
    this.enableRefreshBtn = false;
    this.changeRefreshRate = document.getElementsByClassName('noUi-handle')[0].getAttribute('aria-valuetext').toString();
    this.themeSettings['refreshRate'] = this.changeRefreshRate;
    this.forceLogin();
    if (this.changeRefreshRate > 59) {
      this.changeRefreshRate = (this.changeRefreshRate / 60) + ' Min';
    }
    else {
      this.changeRefreshRate = this.changeRefreshRate + ' Sec';
    }
    document.getElementsByClassName('noUi-tooltip')[0].innerHTML = this.changeRefreshRate;
    this.changeGraphTheme.refreshRateFilter(document.getElementsByClassName('noUi-handle')[0].getAttribute('aria-valuetext'));
  }

  noRefresh() {
    this.changeGraphTheme.refreshRateFilter('false');
    this.enableRefreshBtn = true;
  }
  doRefresh() {
    this.enableRefreshBtn = false;
    this.changeGraphTheme.refreshRateFilter(this.changeRefreshRate);
  }
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  coulumnCustomization(colList, list) {
    this.changeGraphTheme.customizeColumns_filter(colList);
    this.themeSettings['customizeColumns'] = colList;
    this.forceLogin();
  }
  saveThemeStructure() {
    if (localStorage.getItem('userToken')) {
      if (this.themeSettings['customizeColumns']) {
        let list = JSON.stringify(this.themeSettings['customizeColumns'])
        localStorage.setItem('customizeColumns', list);
      }
      if (this.themeSettings['night_mode']) {
        let nightM = this.themeSettings['night_mode'];
        localStorage.setItem('nightM', nightM);
      }
      if (this.themeSettings['siteColor']) {
        let siteC = this.themeSettings['siteColor'];
        localStorage.setItem('siteC', siteC);
      }
      this.themeSettings['token'] = localStorage.getItem('userToken');
      let siteLang = document.getElementsByClassName("goog-te-combo")[0].value;
      this.themeSettings['siteLanguage'] = siteLang;
      this.http.put('http://54.165.36.80:5687/api/userSetting/update', this.themeSettings).map(response => response.json()).subscribe(data => {
        this.changeGraphTheme.trigger_successMessagePopUp_filter('Your Theme Updated Successfully !')
      },
        error => {
          this.changeGraphTheme.trigger_errorMessagePopUp_filter(error.error)
        }
      )
    }
    else {
      this.changeGraphTheme.trigger_loginPopUp_filter();
    }
  }
  changeSiteLanguage() {
    
  }
  signUpWithMail(userReg) {

    this.commonService.userRegistration(userReg);
    this.loginModal.hide();
    this.signUpModal.hide();
  }
  loginWithMail(userLogin) {
    this.commonService.userLogin(userLogin);
    this.loginModal.hide();
    this.signUpModal.hide();

  }
  userTheme() {
    console.log('User Theme')
    let tokenV = localStorage.getItem('userToken');
    this.http.post('http://54.165.36.80:5687/api/userSetting/getUserData', { token: tokenV }).map(response => response.json()).subscribe(data => {
      
      this.desktoplists = data.customizeColumns.desktop.coinlist;
      this.desktopPlist = data.customizeColumns.desktop.portfolio;
      this.mobilelists = data.customizeColumns.mobile.coinlist;
      this.mobilePlist = data.customizeColumns.mobile.portfolio;
      this.appList = data.customizeColumns.app.coinlist;
      this.appPList = data.customizeColumns.app.portfolio;
      this.colorOfSite = data.siteColor;
      this.changeRefreshRate = data.refreshRate;
      this.someRange = data.refreshRate;
      this.currencyText = data.currencyType;
      this.currencyvalue = data.currency;
      localStorage.setItem('currencyRate' , data.currency);
      localStorage.setItem('customizeColumns', data.customizeColumns);
      let body = document.getElementsByTagName('body')[0];
      body.classList.remove('black-theme');
     
      let a = document.querySelector("#google_translate_element select");
     console.log(a)
      let options = a.getElementsByTagName('option');
        for(let i = 0;i <options.length; i++){
          if(data.siteLanguage == options[i].value){
                a.selectedIndex=i;
                a.dispatchEvent(new Event('change'));
          }
        }
      body.classList.add(data.siteColor);
      if (data.siteColor == 'white-theme') {
        
        this.passData2Comp['theme'] = this.themeWhite
        this.passData2Comp['refreshrate'] = this.refreshDefault;
        this.passData2Comp['volumeTheme'] = this.volume_white;
        this.passData2Comp['toolsBg'] = '#fff';
        this.changeGraphTheme.user_theme_filter(this.passData2Comp);
        this.changeGraphTheme.changeMessage(this.passData2Comp);
      }
      else {
        
        this.passData2Comp['theme'] = this.themeBlack;
        this.passData2Comp['refreshrate'] = this.refreshDefault;
        this.passData2Comp['volumeTheme'] = this.volume_black;
        this.passData2Comp['toolsBg'] = '#000';
        this.changeGraphTheme.user_theme_filter(this.passData2Comp)
        this.changeGraphTheme.changeMessage(this.passData2Comp);
      }
      this.changeGraphTheme.get_favAndNormal_coins_filter();
      this.currencyText = data.currencyType;
      localStorage.setItem('currencyRate', this.currencyvalue);
      this.changeGraphTheme.customizeColumns_filter(data.customizeColumns);
      let userSiteLang = "/en/" + data['siteLangugae'];
      this.cookieService.set('googtrans', userSiteLang);
      if(data.nightMode != ''){
         body.classList.add(data.nightMode);
      }
     
    })
  }
  defaultTheme() {
    this.cookieService.set('googtrans', "/en/en");
    let body = document.getElementsByTagName('body')[0];
    var currentList = body.classList.add('black-theme');
    var currentList = body.classList.remove('night_mode');
    var currentList = body.classList.remove('white-theme');
    this.someRange = 1;
    this.colorOfSite = 'black-theme';
    this.currencyvalue = 1;
    this.currencyText = 'USD';
    localStorage.setItem('currencyRate', this.currencyvalue);
    this.refreshDefault = '1';
    let data = {"desktop":{"coinlist":[{"label":"Graph","ischecked":true,"key":"expand"},{"label":"Favourite","ischecked":true,"key":"favourite"},{"label":"Coin","ischecked":true,"key":"coin"},{"label":"Price","ischecked":true,"key":"price"},{"label":"24 HR (%)","ischecked":true,"key":"dayChange"},{"label":"7 Day (%)","ischecked":true,"key":"weaklyChange"},{"label":"Volume (24 H)","ischecked":true,"key":"dayVolume"},{"label":"Market Cap","ischecked":true,"key":"marketCap"},{"label":"24 HR High/Low","ischecked":true,"key":"dayHighLow"},{"label":"Circulation Supply ","ischecked":false,"key":"circulationSupply"},{"label":"Total Supply","ischecked":false,"key":"totalSupply"},{"label":"Exchanges ","ischecked":false,"key":"exchanges"}],"portfolio":[{"label":"Coins","ischecked":true,"key":"coins"},{"label":"Totals","ischecked":true,"key":"total_coins"},{"label":"Price Paid","ischecked":true,"key":"price_paid"},{"label":"Current Price","ischecked":true,"key":"current_price"},{"label":"Total Gain/Loss","ischecked":true,"key":"gain_loss"},{"label":"Graph","ischecked":true,"key":"graph"},{"label":"Trade","ischecked":true,"key":"trade"}]},"mobile":{"coinlist":[{"label":"Graph","ischecked":true,"key":"expand"},{"label":"Favourite","ischecked":true,"key":"favourite"},{"label":"Coin","ischecked":true,"key":"coin"},{"label":"Price","ischecked":true,"key":"price"},{"label":"24 HR (%)","ischecked":false,"key":"dayChange"},{"label":"7 Day (%)","ischecked":false,"key":"weaklyChange"},{"label":"Volume (24 H)","ischecked":false,"key":"dayVolume"},{"label":"Market Cap","ischecked":false,"key":"marketCap"},{"label":"24 HR High/Low","ischecked":false,"key":"dayHighLow"},{"label":"Circulation Supply ","ischecked":false,"key":"circulationSupply"},{"label":"Total Supply","ischecked":false,"key":"totalSupply"},{"label":"Exchanges ","ischecked":false,"key":"exchanges"}],"portfolio":[{"label":"Coins","ischecked":true,"key":"coins"},{"label":"Totals","ischecked":true,"key":"total_coins"},{"label":"Price Paid","ischecked":true,"key":"price_paid"},{"label":"Current Price","ischecked":true,"key":"current_price"},{"label":"Total Gain/Loss","ischecked":true,"key":"gain_loss"},{"label":"Graph","ischecked":true,"key":"graph"},{"label":"Trade","ischecked":true,"key":"trade"}]},"app":{"coinlist":[{"label":"Graph","ischecked":true,"key":"expand"},{"label":"Favourite","ischecked":true,"key":"favourite"},{"label":"Coin","ischecked":true,"key":"coin"},{"label":"Price","ischecked":true,"key":"price"},{"label":"24 HR (%)","ischecked":false,"key":"dayChange"},{"label":"7 Day (%)","ischecked":false,"key":"weaklyChange"},{"label":"Volume (24 H)","ischecked":false,"key":"dayVolume"},{"label":"Market Cap","ischecked":false,"key":"marketCap"},{"label":"24 HR High/Low","ischecked":false,"key":"dayHighLow"},{"label":"Circulation Supply ","ischecked":false,"key":"circulationSupply"},{"label":"Total Supply","ischecked":false,"key":"totalSupply"},{"label":"Exchanges ","ischecked":false,"key":"exchanges"}],"portfolio":[{"label":"Coins","ischecked":true,"key":"coins"},{"label":"Totals","ischecked":true,"key":"total_coins"},{"label":"Price Paid","ischecked":true,"key":"price_paid"},{"label":"Current Price","ischecked":true,"key":"current_price"},{"label":"Total Gain/Loss","ischecked":true,"key":"gain_loss"},{"label":"Graph","ischecked":true,"key":"graph"},{"label":"Trade","ischecked":true,"key":"trade"}]}}
    let dataS = JSON.stringify(data);
    localStorage.setItem('customizeColumns', dataS);
    this.changeGraphTheme.customizeColumns_filter(data);
    this.desktoplists = data.desktop.coinlist;
    this.desktopPlist = data.desktop.portfolio;
    this.mobilelists = data.mobile.coinlist;
    this.mobilePlist = data.mobile.portfolio;
    this.appList = data.app.coinlist;
    this.appPList = data.app.portfolio;
    this.passData2Comp['theme'] = this.themeBlack;
    this.passData2Comp['refreshrate'] = this.refreshDefault;
    this.passData2Comp['volumeTheme'] = this.volume_black;
    this.passData2Comp['toolsBg'] = '#000';
    this.changeGraphTheme.user_theme_filter(this.passData2Comp)
    this.changeGraphTheme.changeMessage(this.passData2Comp);

  }
  forceLogin(){
    if(Object.keys(this.themeSettings).length == 2){
      if(this.popUpEnabled){
        this.popUpEnabled = false;
        setTimeout(()=> {
          this.changeGraphTheme.trigger_loginPopUp_filter();
        },30000)
      }
    }
  }
}


