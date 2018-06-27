import { Component, Input, OnInit, OnDestroy,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CompDataSharingService } from "../../comp-data-sharing.service";
import { Http } from '@angular/http';
import { Subscription, Subject } from 'rxjs/Rx';
import {CommonServiceService} from '../../common-service.service'
import {
    widget,
    onready,
    ChartingLibraryWidgetOptions,
    LanguageCode,
} from '../../../assets/charting_library/charting_library.min';
import { window, document, location } from 'angular-bootstrap-md/utils/facade/browser';
import { error } from 'util';
import { element } from 'protractor';
import { setTimeout } from 'timers';
// import { setInterval } from 'timers';

@Component({
    selector: 'app-tv-chart-container',
    templateUrl: './tv-chart-container.component.html',
    styleUrls: ['./tv-chart-container.component.css']
})
export class TvChartContainerComponent implements OnInit {
    @ViewChild('loginform') public loginModal;
    @ViewChild('registerform') public signUpModal;
    @ViewChild('successMessage') public successModal;
    @ViewChild('errorMessage') public errorModal;
    protected ngUnsubscribe: Subject<void> = new Subject<void>();
    private _symbol: ChartingLibraryWidgetOptions['symbol'] = 'AAPL';
    private _interval: ChartingLibraryWidgetOptions['interval'] = 'D';
    // BEWARE: no trailing slash is expected in feed URL
    private _datafeedUrl = 'https://demo_feed.tradingview.com';
    private _libraryPath: ChartingLibraryWidgetOptions['library_path'] = '/assets/charting_library/';
    private _chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url'] = 'https://saveload.tradingview.com';
    private _chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version'] = '1.1';
    private _clientId: ChartingLibraryWidgetOptions['client_id'] = 'tradingview.com';
    private _userId: ChartingLibraryWidgetOptions['user_id'] = 'public_user_id';
    private _fullscreen: ChartingLibraryWidgetOptions['fullscreen'] = false;
    private _autosize: ChartingLibraryWidgetOptions['autosize'] = true;
    private _containerId: ChartingLibraryWidgetOptions['container_id'] = 'tv_chart_container';
    public films;
    public overrides_obj;
    public graphThemeColor: any;
    public udf_datafeed;
    public coinList;
    public barsData;
    public getallCoins;
    public setIntervalTime;
    public runningInterval;
    public favCoinsList;
    variable: any;
    public currencyValue;
    public toolsBg;
    public searchText;
    public column = {};
    public resolutionColumn = {};
    public columnsList;
    public subscriptionOfHttp;
    public successMessagePopup;
    public showLoadSpinner:boolean;
    public noData;
    userLogin: any = {};
    userReg: any = {};
    @Input()
    set symbol(symbol: ChartingLibraryWidgetOptions['symbol']) {
        this._symbol = symbol || this._symbol;
    }

    @Input()
    set interval(interval: ChartingLibraryWidgetOptions['interval']) {
        this._interval = interval || this._interval;
    }

    @Input()
    set datafeedUrl(datafeedUrl: string) {
        this._datafeedUrl = datafeedUrl || this._datafeedUrl;
    }

    @Input()
    set libraryPath(libraryPath: ChartingLibraryWidgetOptions['library_path']) {
        this._libraryPath = libraryPath || this._libraryPath;
    }

    @Input()
    set chartsStorageUrl(chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url']) {
        this._chartsStorageUrl = chartsStorageUrl || this._chartsStorageUrl;
    }

    @Input()
    set chartsStorageApiVersion(chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version']) {
        this._chartsStorageApiVersion = chartsStorageApiVersion || this._chartsStorageApiVersion;
    }

    @Input()
    set clientId(clientId: ChartingLibraryWidgetOptions['client_id']) {
        this._clientId = clientId || this._clientId;
    }

    @Input()
    set userId(userId: ChartingLibraryWidgetOptions['user_id']) {
        this._userId = userId || this._userId;
    }

    @Input()
    set fullscreen(fullscreen: ChartingLibraryWidgetOptions['fullscreen']) {
        this._fullscreen = fullscreen || this._fullscreen;
    }

    @Input()
    set autosize(autosize: ChartingLibraryWidgetOptions['autosize']) {
        this._autosize = autosize || this._autosize;
    }

    @Input()
    set containerId(containerId: ChartingLibraryWidgetOptions['container_id']) {
        this._containerId = containerId || this._containerId;
    }
    @Input() graphId: string;

    constructor(private commonService : CommonServiceService,private http: Http, private router: Router, private changeGraphTheme: CompDataSharingService) {
        this.changeGraphTheme.refreshRateListen().subscribe((m: any) => {

            this.refreshRateIntervalChange(m);
        })
        this.changeGraphTheme.searchCoinExchange().subscribe((searchT: any) => {
            this.searchText = searchT;
        })
        this.changeGraphTheme.currencyConverter_listener().subscribe((value: any) => {
            this.currencyValue = value;
        })
        this.changeGraphTheme.customizeColumns_listener().subscribe((value: Object) => {
            this.customizeColUpdate(value);
        })
        this.changeGraphTheme.get_all_coins_listener().subscribe(() => {
            this.getCoinList();
            this.favCoinsList = [];
        })
    }

    ngOnInit() {
       
        this.showLoadSpinner = true;
        this.coinList = [];
        this.favCoinsList = [];
        this.currencyValue = localStorage.getItem('currencyRate');
        
        this.changeGraphTheme.currentMessage.subscribe(message => this.graphThemeColor = message);
        this.setIntervalTime = parseInt(this.graphThemeColor.refreshrate + '000');
        this.overrides_obj = this.graphThemeColor.theme;
        this.toolsBg = this.graphThemeColor.toolsBg;
        if (localStorage.getItem('userToken')) {
            let tokenV = localStorage.getItem('userToken');
            this.http.post('http://18.191.202.171:5687/api/userSetting/getUserData', { token: tokenV }).map(response => response.json()).subscribe(data => {
                this.changeGraphTheme.customizeColumns_filter(data.customizeColumns);
                this.customizeColUpdate(data.customizeColumns);
            })
            this.getAlongFavCoins();
            // if (parseInt(this.setIntervalTime) >= 1000) {
            //     this.runningInterval = setInterval(() => {
            //         this.getAlongFavCoins();
            //     }, this.setIntervalTime);
            // }
        }
        else {
            let cols = localStorage.getItem('customizeColumns')
            this.customizeColUpdate(JSON.parse(cols));
            this.getCoinList();
        }
        // this.generateGraph('','','');
       
    }
    getAlongFavCoins(){
            let tokenV = localStorage.getItem('userToken');
            this.subscriptionOfHttp = this.http.post('http://18.191.202.171:5687/api/coins/getFavourites', { token: tokenV }).map(response => response.json()).subscribe(data => {

               
                if (this.favCoinsList.length > 0) {
                    this.updateAllCoinsData(data);
                }
                else {
                    this.showLoadSpinner = false;
                    this.favCoinsList = data;
                    if (parseInt(this.setIntervalTime) >= 1000) {
                        this.runningInterval = setInterval(() => {
                            this.getAlongFavCoins();
                        }, this.setIntervalTime);
                    }
                }
            })
            this.subscriptionOfHttp =  this.http.post('http://18.191.202.171:5687/api/coins/getCoins', { token: tokenV }).map(response => response.json()).subscribe(data => {
                
                if (this.coinList.length > 0) {
                    this.updateAllCoinsData(data);
                }
                else {
                    this.showLoadSpinner = false;
                    this.coinList = data;
                    if (parseInt(this.setIntervalTime) >= 1000) {
                        this.runningInterval = setInterval(() => {
                            this.getAlongFavCoins();
                        }, this.setIntervalTime);
                    }
                }
            })
           
            // this.subscriptionOfHttp.add(getNormalCoinscall)
            // this.subscriptionOfHttp.add(getFavcall)
    }
    getCoinList() {
        const getUsdCall = this.http.post('http://18.191.202.171:5687/exchange/getusd', {}).map(
            response => response.json()).takeUntil(this.ngUnsubscribe).subscribe(
            data => {
                this.getallCoins = data;
                if(data.length == 0){
                    this.noData = true
                }
                if (this.coinList.length > 0) {
                    this.updateAllCoinsData(this.getallCoins);
                }
                else {
                    this.showLoadSpinner = false;
                    this.coinList = this.getallCoins;
                    if (parseInt(this.setIntervalTime) >= 1000) {
                        this.runningInterval = setInterval(() => {
                            this.getCoinList();
                        }, this.setIntervalTime);
                    }
                }
            })
            //  this.subscriptionOfHttp.add(getUsdCall)
    }
    updateAllCoinsData(allCoins) {
        for (let i = 0; i < allCoins.length; i++) {
            let checkIsThere = true;
            let obj = this.coinList.findIndex(coin => allCoins[i].pair === coin.pair);
            if (obj != -1) {
                this.coinList[obj].price = allCoins[i].price;
                this.coinList[obj].priceStatus = allCoins[i].priceStatus;
                this.coinList[obj].dayPricePercent = allCoins[i].dayPricePercent;
                this.coinList[obj].dayPrice = allCoins[i].dayPrice;
                this.coinList[obj].dayPriceStatus = allCoins[i].dayPriceStatus;
                this.coinList[obj].weeklyChangeStatus = allCoins[i].weeklyChangeStatus;
                this.coinList[obj].weeklyChange = allCoins[i].weeklyChange;
                this.coinList[obj].weeklyChangePercent = allCoins[i].weeklyChangePercent;

                this.coinList[obj].dayVolume = allCoins[i].dayVolume;
                this.coinList[obj].highestPrice = allCoins[i].highestPrice;
                this.coinList[obj].lowestPrice = allCoins[i].lowestPrice;
            }
            else {
                this.coinList.push(allCoins[i]);
            }
        }
    }
    updateFavCoinsData(allCoins){
        for (let i = 0; i < allCoins.length; i++) {
            let checkIsThere = true;
            let obj = this.coinList.findIndex(coin => allCoins[i].pair === coin.pair);
            if (obj != -1) {
                this.favCoinsList[obj].price = allCoins[i].price;
                this.favCoinsList[obj].priceStatus = allCoins[i].priceStatus;
                this.favCoinsList[obj].dayPricePercent = allCoins[i].dayPricePercent;
                this.favCoinsList[obj].dayPrice = allCoins[i].dayPrice;
                this.favCoinsList[obj].dayPriceStatus = allCoins[i].dayPriceStatus;
                this.favCoinsList[obj].weeklyChangeStatus = allCoins[i].weeklyChangeStatus;
                this.favCoinsList[obj].weeklyChange = allCoins[i].weeklyChange;
                this.favCoinsList[obj].weeklyChangePercent = allCoins[i].weeklyChangePercent;

                this.favCoinsList[obj].dayVolume = allCoins[i].dayVolume;
                this.favCoinsList[obj].highestPrice = allCoins[i].highestPrice;
                this.favCoinsList[obj].lowestPrice = allCoins[i].lowestPrice;
            }
            else {
                this.favCoinsList.push(allCoins[i]);
            }
        }
    }
    updateNormalCoinsData(allCoins){
        for (let i = 0; i < allCoins.length; i++) {
            let checkIsThere = true;
            let obj = this.coinList.findIndex(coin => allCoins[i].pair === coin.pair);
            if (obj != -1) {
                this.favCoinsList[obj].price = allCoins[i].price;
                this.favCoinsList[obj].priceStatus = allCoins[i].priceStatus;
                this.favCoinsList[obj].dayPricePercent = allCoins[i].dayPricePercent;
                this.favCoinsList[obj].dayPrice = allCoins[i].dayPrice;
                this.favCoinsList[obj].dayPriceStatus = allCoins[i].dayPriceStatus;
                this.favCoinsList[obj].weeklyChangeStatus = allCoins[i].weeklyChangeStatus;
                this.favCoinsList[obj].weeklyChange = allCoins[i].weeklyChange;
                this.favCoinsList[obj].weeklyChangePercent = allCoins[i].weeklyChangePercent;

                this.favCoinsList[obj].dayVolume = allCoins[i].dayVolume;
                this.favCoinsList[obj].highestPrice = allCoins[i].highestPrice;
                this.favCoinsList[obj].lowestPrice = allCoins[i].lowestPrice;
            }
            else {
                this.favCoinsList.push(allCoins[i]);
            }
        }
    }
    customizeColUpdate(value) {
        if (window.screen.width > 990) {
            this.columnsList = value['desktop'];
        }
        else {
            this.columnsList = value['mobile'];
        }

        for (let i = 0; i < this.columnsList.length; i++) {
            this.resolutionColumn[this.columnsList[i].key] = this.columnsList[i].ischecked;
        }

        
    }
    expandGraph(ev, i, coinToken, coinName,chartId,rowId) {
        
        if (document.getElementById(rowId+i).classList.contains('showingNow')) {
            document.getElementById(rowId+i).classList.remove('showingNow');
            document.getElementById(rowId+i).classList.add('hidingNow');
            let parentElementPath  = document.getElementById(rowId+i).parentElement.children[0]
            let elementPath =  parentElementPath.getElementsByTagName('td');
            let HtmlColl = Array.prototype.slice.call(elementPath);
            let eleInd = HtmlColl.indexOf(document.getElementsByClassName('graphTabledata')[i]);
            
            let elementExp =parentElementPath.children[eleInd].children[0].classList
            if (elementExp.contains('fa-arrows')) {
                elementExp.add('fa-arrows-alt')
                elementExp.remove('fa-arrows')
            }
        }
        else {
            document.getElementById(rowId+i).classList.add('showingNow');
            document.getElementById(rowId+i).classList.remove('hidingNow');
            let parentElementPath  = document.getElementById(rowId+i).parentElement.children[0]
            let elementPath =  parentElementPath.getElementsByTagName('td');
            let HtmlColl = Array.prototype.slice.call(elementPath);
            let eleInd = HtmlColl.indexOf(document.getElementsByClassName('graphTabledata')[i]);
            let elementExp =parentElementPath.children[eleInd].children[0].classList;
            
            if (elementExp.contains('fa-arrows-alt')) {
                elementExp.add('fa-arrows');
                elementExp.remove('fa-arrows-alt');
                this.generateGraph(chartId+i, coinToken, coinName);
            }
        }

    }
    key: string = 'name';
    reverse: boolean = false;
    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }
    generateGraph(id, coinToken, coinName) {
        this.udf_datafeed = {
            onReady(callback) {
                var config = {
                    configurationData: {
                        supports_search: true,
                        supports_group_request: false,
                        supported_resolutions: ['1', '60', '1D', '1W', '1M', '3M', '6M', '1Y'],
                        supports_marks: false,
                        supports_timescale_marks: false,
                        exchanges: []
                    }
                };
                callback(parseJSONorNot(config));
            },
            resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {

                var config2 = {
                    "name": coinToken.toUpperCase(),
                    "timezone": "Asia/Kolkata",
                    "pricescale": 1000000,
                    "minmov": 1,
                    "minmov2": 0,
                    "ticker": "TEST:TEST",
                    // "description": "test description",
                    "session": "24x7",
                    "type": "bitcoin",
                    "exchange-traded": "",
                    "exchange-listed": "",
                    "has_intraday": true,
                    "intraday_multipliers": ['1', '60'],
                    "has_weekly_and_monthly": false,
                    "has_no_volume": false,
                    "regular_session": "24x7"
                    // "data_status":"streaming"
                };
                onSymbolResolvedCallback(parseJSONorNot(config2))
            },
            getBars(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
                jQuery.ajax({
                    method: 'POST',
                    async: true,
                    url: 'http://18.191.202.171:5687/exchange/getChart',
                    data: { pair: coinToken },
                    success: function (response) {
                        onHistoryCallback(response, { noData: true })
                    },
                    error: function (res) {
                        return 'F'
                    }
                })
                // this.subscriptionOfHttp.add(getBars)
            },
            subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
                var configData;
                console.log('subscribe ' + symbolInfo);
                setInterval(() => {
                     jQuery.ajax({
                        method: 'POST',
                        async: true,
                        url: 'http://18.191.202.171:5687/exchange/getLastSecData',
                        data: { pair: coinToken },
                        success: function (response) {
                            onRealtimeCallback(parseJSONorNot(response[0]));
                        },
                        error: function (res) {
                            return 'F'
                        }
                    })
                }, 30000)
            }
        };
        function parseJSONorNot(mayBeJSON) {
            if (typeof mayBeJSON === 'string') {
                return JSON.parse(mayBeJSON)
            }
            else {
                return mayBeJSON;
            }
        }
        function chartDataUpdate() {
            jQuery.ajax({
                method: 'POST',
                async: true,
                url: 'http://18.191.202.171:5687/exchange/getChart',
                data: { pair: coinToken },
                success: function (response) {

                    return response;
                },
                error: function (res) {
                    return 'F'
                }
            })
        }
        function getLanguageFromURL(): LanguageCode | null {
            const regex = new RegExp('[\\?&]lang=([^&#]*)');
            const results = regex.exec(location.search);

            return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' ')) as LanguageCode;
        }
        this.overrides_obj = this.graphThemeColor.theme;
        this.toolsBg = this.graphThemeColor.toolsBg;

        const widgetOptions: ChartingLibraryWidgetOptions = {
            symbol: this._symbol,
            loading_screen: { backgroundColor: this.toolsBg },
            datafeed: this.udf_datafeed,
            interval: this._interval,
            container_id: id,
            library_path: this._libraryPath,
            locale: getLanguageFromURL() || 'en',
            disabled_features: [
                'header_saveload',
                'header_indicators',
                'timeframes_toolbar',
                'header_settings',
                'header_symbol_search',
                'compare_symbol',
                'header_compare',
                'use_localstorage_for_settings',
                'save_chart_properties_to_local_storage',
            ],
            enabled_features: ['study_templates', 'header_chart_type', 'header_settings', 'header_indicators'],
            charts_storage_url: this._chartsStorageUrl,
            charts_storage_api_version: this._chartsStorageApiVersion,
            client_id: this._clientId,
            user_id: this._userId,
            toolbar_bg: this.toolsBg,
            // debug: true,
            studies_overrides: this.graphThemeColor.volumeTheme,
            fullscreen: this._fullscreen,
            autosize: this._autosize,
            overrides: this.overrides_obj
        };
        const tvWidget = new widget(widgetOptions);
        tvWidget.onChartReady(() => {
            tvWidget.chart().setChartType(2);
        });
    }
    coinDetails(id) {
        this.router.navigate(['coinpage/', id]);
    }

    advancedTableFilter(data) {
        clearInterval(this.runningInterval)
        
        this.coinList = data;
    }

    refreshRateIntervalChange(m) {
        
        if (m != 'false') {
            clearInterval(this.runningInterval)
            this.setIntervalTime = m + '000';
            this.runningInterval = setInterval(() => {
                this.getCoinList()
            }, this.setIntervalTime);
        }
        else {
            clearInterval(this.runningInterval)
        }
    }
    favCoinFunctionality(pair, type) {
        if(localStorage.getItem('userToken')){
            let tokenV = localStorage.getItem('userToken');
            this.http.put('http://18.191.202.171:5687/api/userSetting/update', { favourites: pair, token: tokenV }).map(response => response.json()).
            subscribe(data => {
                let message;
                if(type == 'normal'){
                     message = 'Added to Favourites list Successfully';
                }
                else if(type == 'fav'){
                     message = 'Removed from Favourites list Successfully';
                }
                this.changeGraphTheme.trigger_successMessagePopUp_filter(message);
                let tokenV = localStorage.getItem('userToken');
               
                      this.subscriptionOfHttp = this.http.post('http://18.191.202.171:5687/api/coins/getFavourites', { token: tokenV }).map(response => response.json()).subscribe(data => {
                        this.favCoinsList = data;
                },
                err => {
                    this.favCoinsList = [];
                })
                this.subscriptionOfHttp =  this.http.post('http://18.191.202.171:5687/api/coins/getCoins', { token: tokenV }).map(response => response.json()).subscribe(data => {
                        this.coinList = data
                },
                err => {
                    this.coinList = [];
                })
               
              
               
            },
            error => {
            this.changeGraphTheme.trigger_errorMessagePopUp_filter(error.error);
        }
    )
        }
        else{
            
            this.changeGraphTheme.trigger_loginPopUp_filter();
        }
        // for(let k = 0; k < this.sample.length; k++){
        //    if(this.sample[k].pair == pair){
        //         if(rr){

        //             this.coinList.push(this.sample[k]);
        //             delete this.sample[k];
        //         }
        //     }
        // }
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
    ngOnDestroy() {
        // this.subscriptionOfHttp.unsubscribe();
        clearInterval(this.runningInterval);
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
        
    }
}