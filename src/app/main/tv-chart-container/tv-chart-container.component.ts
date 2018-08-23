import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CompDataSharingService } from "../../comp-data-sharing.service";
import { Http } from '@angular/http';
import { HostListener } from "@angular/core";
import { Subscription, Subject } from 'rxjs/Rx';
import { CommonServiceService } from '../../common-service.service'
import { widget, onready, ChartingLibraryWidgetOptions, LanguageCode, } from '../../../assets/charting_library/charting_library.min';
import { window, document, location } from 'angular-bootstrap-md/utils/facade/browser';
import { error } from 'util';
import { element } from 'protractor';
import { setTimeout, setInterval } from 'timers';
import { forEach } from '@angular/router/src/utils/collection';

/*AmChart Func  */

import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
/*AmChart Func  */
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
    private _interval: ChartingLibraryWidgetOptions['interval'] = '60';
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
    public chartData1;
    public column = {};
    public resolutionColumn = {};
    public columnsList;
    public subscriptionOfHttp;
    public subscriptionOfHttp1;
    public successMessagePopup;
    public showLoadSpinner: boolean;
    public noData;
    public favCoinInterval;
    userLogin: any = {};
    userReg: any = {};
    private clearInterval;
    public forceLogin;
    public showScrollTop;
    public themeType;
    public backgroundColor;
    public chart;
    public greenColor;
    public redColor;
    public btnActive;
    public url;
    public weeklyData;
    public sortingKey;
    public reverseValue;
    public isBtnClicked;
    key: string;
    public advFilter;
    reverse: number;
    public isAdvFilter;
    public coinlist_table;
    public portfolio_table;
    public subscriptions = new Subscription();
    public portfolioList;
    public getLoggedIn;
    // public amchartVariable  = new  Array<any>(1000);
    public amchartVariable;
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

    constructor(private AmCharts: AmChartsService, private commonService: CommonServiceService, private http: Http, private router: Router, private changeGraphTheme: CompDataSharingService) {
        this.changeGraphTheme.clear_portfolio_Data_listener().subscribe(() => {
            this.getLoggedIn = true;
            this.portfolioList = [];

        })
        this.changeGraphTheme.portfolio_Data_listener().subscribe(() => {
            this.clearInterval = true;
            this.getLoggedIn = false;
            this.getLoggedIn = true;
            this.coinList = [];
            this.getPortfolioList();

        })
        this.changeGraphTheme.refreshRateListen().subscribe((m: any) => {
            this.refreshRateIntervalChange(m);
        });
        this.changeGraphTheme.searchCoinExchange().subscribe((searchT: any) => {
            // this.searchText = searchT;
            clearInterval(this.runningInterval);
            this.clearInterval = false;
            this.coinList = [];
            this.coinList = searchT;
        });
        this.changeGraphTheme.currencyConverter_listener().subscribe((value: any) => {
            this.updateCurrency(value);
        });
        this.changeGraphTheme.customizeColumns_listener().subscribe((value: Object) => {
            this.customizeColUpdate(value);
        });

        this.changeGraphTheme.get_all_coins_listener().subscribe(() => {
            this.coinList = [];
            this.favCoinsList = [];
            this.showLoadSpinner = true;
            this.clearInterval = true;
            this.getCoinList();
            this.favCoinsList = [];

        });
        this.changeGraphTheme.get_favAndNormal_coins_listener().subscribe(() => {
            this.coinList = [];
            this.favCoinsList = [];
            this.showLoadSpinner = true;
            this.clearInterval = true;
            this.getAlongFavCoins();
        });
        this.changeGraphTheme.clear_interval_listener().subscribe(() => {
            this.clearInterval = false;
            clearInterval(this.runningInterval);
        })
        this.changeGraphTheme.advancedFilter_listener().subscribe((data: any) => {
            this.advFilter = data;
            this.advancedSearchFilter(data);
        })
        this.changeGraphTheme.reset_advancedFilter_listener().subscribe(() => {
            this.advFilter = [];
        })
        this.changeGraphTheme.chnageTheme_of_amchart_listener().subscribe((theme: any) => {
            if (theme == 'black') {
                this.backgroundColor = '#000';
                this.themeType = 'dark';
                this.greenColor = '#00FE2A';
                this.redColor = '#DA0202';
            }
            else if (theme == 'white') {
                this.backgroundColor = '#fff';
                this.themeType = 'light';
                this.greenColor = '#00C300';
                this.redColor = '#E70000';
            }
        })


    }

    ngOnInit() {
        this.amchartVariable = {};
        this.subscriptionOfHttp1 = [];
        if (this.router.url == '/coinlist') {
            this.coinlist_table = true;
            this.portfolio_table = false;
            this.isBtnClicked = 'btnActive';
            this.subscriptionOfHttp1 = [];
            this.key = 'marketCapValue';
            this.sortingKey = this.key;
            this.reverse = -1;
            this.reverseValue = this.reverse == 1 ? true : false;
            this.weeklyData = []

            this.themeType = 'dark';
            this.backgroundColor = '#000';
            //this.chartData1 =[{"date":"2012-10-26T18:30:00.000Z","open":125,"close":134,"high":134,"low":123,"volume":316,"value":113},{"date":"2012-10-27T18:30:00.000Z","open":104,"close":105,"high":105,"low":100,"volume":1049,"value":117},{"date":"2012-10-28T18:30:00.000Z","open":118,"close":124,"high":125,"low":117,"volume":584,"value":118},{"date":"2012-10-29T18:30:00.000Z","open":103,"close":106,"high":107,"low":98,"volume":305,"value":117},{"date":"2012-10-30T18:30:00.000Z","open":113,"close":117,"high":119,"low":108,"volume":496,"value":126},{"date":"2012-10-31T18:30:00.000Z","open":115,"close":123,"high":124,"low":112,"volume":585,"value":125},{"date":"2012-11-01T18:30:00.000Z","open":105,"close":110,"high":111,"low":102,"volume":741,"value":127},{"date":"2012-11-02T18:30:00.000Z","open":116,"close":118,"high":119,"low":113,"volume":796,"value":110},{"date":"2012-11-03T18:30:00.000Z","open":122,"close":124,"high":126,"low":119,"volume":132,"value":118},{"date":"2012-11-04T18:30:00.000Z","open":113,"close":121,"high":121,"low":108,"volume":110,"value":130},{"date":"2012-11-05T18:30:00.000Z","open":110,"close":114,"high":118,"low":109,"volume":238,"value":116},{"date":"2012-11-06T18:30:00.000Z","open":115,"close":118,"high":120,"low":114,"volume":831,"value":108},{"date":"2012-11-07T18:30:00.000Z","open":109,"close":104,"high":113,"low":104,"volume":641,"value":113},{"date":"2012-11-08T18:30:00.000Z","open":118,"close":126,"high":129,"low":118,"volume":287,"value":116},{"date":"2012-11-09T18:30:00.000Z","open":122,"close":127,"high":132,"low":120,"volume":1095,"value":113},{"date":"2012-11-10T18:30:00.000Z","open":104,"close":101,"high":105,"low":99,"volume":435,"value":124},{"date":"2012-11-11T18:30:00.000Z","open":109,"close":123,"high":127,"low":108,"volume":886,"value":103},{"date":"2012-11-12T18:30:00.000Z","open":116,"close":128,"high":128,"low":114,"volume":470,"value":117},{"date":"2012-11-13T18:30:00.000Z","open":109,"close":110,"high":110,"low":108,"volume":267,"value":119},{"date":"2012-11-14T18:30:00.000Z","open":116,"close":125,"high":127,"low":112,"volume":508,"value":129},{"date":"2012-11-15T18:30:00.000Z","open":119,"close":132,"high":135,"low":116,"volume":1025,"value":121},{"date":"2012-11-16T18:30:00.000Z","open":100,"close":100,"high":101,"low":97,"volume":1092,"value":125},{"date":"2012-11-17T18:30:00.000Z","open":113,"close":119,"high":120,"low":112,"volume":303,"value":102},{"date":"2012-11-18T18:30:00.000Z","open":106,"close":109,"high":110,"low":102,"volume":716,"value":112},{"date":"2012-11-19T18:30:00.000Z","open":113,"close":114,"high":119,"low":113,"volume":860,"value":110}];
            // this.variable  =  [{"date":"2012-11-20T18:30:00.000Z","open":119,"close":125,"high":125,"low":119,"volume":206,"value":111},{"date":"2012-11-21T18:30:00.000Z","open":129,"close":127,"high":134,"low":125,"volume":975,"value":116},{"date":"2012-11-22T18:30:00.000Z","open":117,"close":119,"high":122,"low":114,"volume":184,"value":124},{"date":"2012-11-23T18:30:00.000Z","open":100,"close":108,"high":108,"low":99,"volume":502,"value":127},{"date":"2012-11-24T18:30:00.000Z","open":126,"close":135,"high":135,"low":122,"volume":1104,"value":102},{"date":"2012-11-25T18:30:00.000Z","open":128,"close":128,"high":130,"low":126,"volume":390,"value":122}]
            this.showScrollTop = false;
            window.addEventListener('scroll', this.getLimitedCoins())
            this.forceLogin = true;
            this.clearInterval = true;
            this.showLoadSpinner = true;
            this.coinList = [];
            this.favCoinsList = [];
            this.currencyValue = localStorage.getItem('currencyRate');

            this.changeGraphTheme.currentMessage.subscribe(message => this.graphThemeColor = message);
            this.setIntervalTime = parseInt(this.graphThemeColor.refreshrate + '000');
            this.overrides_obj = this.graphThemeColor.theme;
            this.toolsBg = this.graphThemeColor.toolsBg;
            if (localStorage.getItem('userToken')) {
                this.coinList = [];
                this.favCoinsList = [];
                let tokenV = localStorage.getItem('userToken');
                this.http.post('http://54.165.36.80:5687/api/userSetting/getUserData', { token: tokenV }).map(response => response.json()).subscribe(data => {
                    this.changeGraphTheme.customizeColumns_filter(data.customizeColumns);
                    this.customizeColUpdate(data.customizeColumns);
                    this.setIntervalTime = data.refreshRate + '000';
                    this.userWithFavCoins();
                })
            }
            else {

                this.coinList = [];
                this.favCoinsList = [];
                let cols = localStorage.getItem('customizeColumns')
                this.customizeColUpdate(JSON.parse(cols));
                this.getCoinList();
            }
        }
        else if (this.router.url == '/portfolio') {
            this.coinlist_table = false;
            this.portfolio_table = true;
            this.key = 'name';
            this.sortingKey = this.key;
            this.reverse = -1;
            this.reverseValue = this.reverse == 1 ? true : false;
            if (localStorage.getItem('userToken')) {
                this.coinList = [];
                let tokenV = localStorage.getItem('userToken');
                this.http.post('http://54.165.36.80:5687/api/userSetting/getUserData', { token: tokenV }).map(response => response.json()).subscribe(data => {
                    this.changeGraphTheme.customizeColumns_filter(data.customizeColumns);
                    debugger
                    this.customizeColUpdate(data.customizeColumns);
                    this.setIntervalTime = data.refreshRate + '000';
                    this.favCoinsList = [];
                    this.portfolioList = [];
                    this.getPortfolioList();
                    this.getLoggedIn = false;
                })

            }
            else {
                this.getLoggedIn = true;
                this.portfolioList = [];
                this.coinList = [];
                this.favCoinsList = [];
                let cols = localStorage.getItem('customizeColumns')
                this.customizeColUpdate(JSON.parse(cols));
                this.getCoinList();
            }
        }
    }
    getAlongFavCoins() {
        let tokenV = localStorage.getItem('userToken');
        if (tokenV && this.clearInterval) {

            let toL = this.favCoinsList.length + this.coinList.length > 0 ? this.favCoinsList.length + this.coinList.length : 20;
            console.log(this.sortingKey);
            console.log(toL)
            this.subscriptionOfHttp = this.http.post('http://54.165.36.80:5687/api/coins/getFavourites', { token: tokenV, from: 0, to: toL, sort: { key: this.sortingKey, value: this.reverse } }).map(response => response.json()).subscribe(data => {

                if (this.clearInterval && data.length <= 2) {
                    if (this.favCoinsList.length > 0 && this.coinList.length > 0) {
                        this.noData = false;

                        for (let n = 0; n < data.length; n++) {
                            if (data[n].favourite == true) {
                                this.updateFavCoinsData(data[n].data);
                            }
                            else if (data[n].favourite == false) {
                                this.updateAllCoinsData(data[n].data);
                            }

                        }
                    }
                    else {
                        this.noData = false;
                        this.showLoadSpinner = false;
                        for (let n = 0; n < data.length; n++) {
                            if (data[n].favourite == true) {
                                this.favCoinsList = data[n].data;
                            }
                            else if (data[n].favourite == false) {
                                this.coinList = data[n].data;
                            }
                        }
                        // this.favCoinsList = data[0].data;
                        // this.coinList = data[1].data;
                        // if (parseInt(this.setIntervalTime) >= 1000) {
                        //     this.runningInterval = setInterval(() => {
                        //         this.getAlongFavCoins();
                        //     }, this.setIntervalTime);
                        // }
                    }
                }
                else {
                    this.coinList = data;
                }
            })
            // let toL = this.coinList.length > 0 ? this.coinList.length : 20;
            // this.subscriptionOfHttp = this.http.post('http://54.165.36.80:5687/api/coins/getCoins', { from: 0, to: toL, token: tokenV }).map(response => response.json()).subscribe(data => {
            //     if (this.clearInterval) {
            //         if (this.coinList.length > 0 && this.clearInterval) {
            //             this.noData = false;
            //             this.updateAllCoinsData(data);
            //         }
            //         else {
            //             this.noData = false;
            //             this.showLoadSpinner = false;
            //             this.coinList = data;
            //             if (parseInt(this.setIntervalTime) >= 1000) {
            //                 this.runningInterval = setInterval(() => {
            //                     this.getAlongFavCoins();
            //                 }, this.setIntervalTime);
            //             }
            //         }
            //     }
            // })
        }
    }
    getCoinList() {
        if (!localStorage.getItem('userToken') && this.clearInterval) {
            let upData;
            let toL = this.coinList.length > 0 ? this.coinList.length : 20;
            console.log(this.sortingKey);
            upData = { from: 0, to: toL, sort: { key: this.sortingKey, value: this.reverse } }
            let request = this.http.post('http://54.165.36.80:5687/exchange/getusd', upData).map(
                response => response.json()).subscribe(
                data => {
                    if (this.clearInterval) {
                        this.getallCoins = data;
                        if (data.length == 0) {
                            this.noData = true
                        }
                        if (this.coinList.length > 0 && this.clearInterval) {
                            this.noData = false;
                            this.updateAllCoinsData(this.getallCoins);
                        }
                        else {
                            this.noData = false;
                            this.showLoadSpinner = false;
                            clearInterval(this.favCoinInterval)
                            this.coinList = this.getallCoins;
                            if (parseInt(this.setIntervalTime) >= 1000) {
                                console.log(this.setIntervalTime)
                                this.runningInterval = setInterval(() => {
                                    this.getCoinList();
                                }, this.setIntervalTime);
                            }
                        }
                    }
                })
            // this.subscriptions.add(request);
            this.subscriptionOfHttp1.push(request)
        }
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
            // else {
            //     this.coinList.push(allCoins[i]);
            // }
        }
    }
    updateFavCoinsData(allCoins) {
        for (let i = 0; i < allCoins.length; i++) {
            let checkIsThere = true;
            let obj = this.favCoinsList.findIndex(coin => allCoins[i].pair === coin.pair);
            if (obj != -1) {
                this.favCoinsList[obj].price = allCoins[i].price;
                console.log(this.favCoinsList[obj].price, allCoins[i].price)
                this.favCoinsList[obj].priceStatus = allCoins[i].priceStatus;
                console.log(this.favCoinsList[obj].priceStatus, allCoins[i].priceStatus)
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
            // else {
            //     this.favCoinsList.push(allCoins[i]);
            // }
        }
    }
    // updateNormalCoinsData(allCoins) {
    //     for (let i = 0; i < allCoins.length; i++) {
    //         let checkIsThere = true;
    //         let obj = this.coinList.findIndex(coin => allCoins[i].pair === coin.pair);
    //         if (obj != -1) {
    //             this.favCoinsList[obj].price = allCoins[i].price;
    //             this.favCoinsList[obj].priceStatus = allCoins[i].priceStatus;
    //             this.favCoinsList[obj].dayPricePercent = allCoins[i].dayPricePercent;
    //             this.favCoinsList[obj].dayPrice = allCoins[i].dayPrice;
    //             this.favCoinsList[obj].dayPriceStatus = allCoins[i].dayPriceStatus;
    //             this.favCoinsList[obj].weeklyChangeStatus = allCoins[i].weeklyChangeStatus;
    //             this.favCoinsList[obj].weeklyChange = allCoins[i].weeklyChange;
    //             this.favCoinsList[obj].weeklyChangePercent = allCoins[i].weeklyChangePercent;

    //             this.favCoinsList[obj].dayVolume = allCoins[i].dayVolume;
    //             this.favCoinsList[obj].highestPrice = allCoins[i].highestPrice;
    //             this.favCoinsList[obj].lowestPrice = allCoins[i].lowestPrice;
    //         }
    //         else {
    //             this.favCoinsList.push(allCoins[i]);
    //         }
    //     }
    // }
    customizeColUpdate(value) {

        if (this.router.url == '/coinlist') {
            if (window.screen.width > 990) {
                this.columnsList = value['desktop']['coinlist'];
            }
            else {
                this.columnsList = value['mobile']['coinlist'];
            }
            for (let i = 0; i < this.columnsList.length; i++) {
                this.resolutionColumn[this.columnsList[i].key] = this.columnsList[i].ischecked;
            }
        }

        if (this.router.url == '/portfolio') {
            if (window.screen.width > 990) {
                this.columnsList = value['desktop']['portfolio'];
            }
            else {
                this.columnsList = value['mobile']['portfolio'];
            }
            for (let i = 0; i < this.columnsList.length; i++) {
                this.resolutionColumn[this.columnsList[i].key] = this.columnsList[i].ischecked;
            }
        }
    }
    expandGraph(ev, i, coinToken, coinName, chartId, rowId) {
        debugger

        if (document.getElementById(rowId + i).classList.contains('showingNow')) {
            document.getElementById(rowId + i).classList.remove('showingNow');
            document.getElementById(rowId + i).classList.add('hidingNow');
            let parentElementPath = document.getElementById(rowId + i).parentElement.children[0]
            let elementPath = parentElementPath.getElementsByTagName('td');
            let HtmlColl = Array.prototype.slice.call(elementPath);
            let eleInd = HtmlColl.indexOf(document.getElementsByClassName('graphTabledata')[i]);

            let elementExp = parentElementPath.children[eleInd].children[0].classList
            if (elementExp.contains('fa-arrows')) {
                elementExp.add('fa-arrows-alt')
                elementExp.remove('fa-arrows')
            }
            console.log(Object.keys(this.amchartVariable).length);
            if (Object.keys(this.amchartVariable).length > 0) {
                delete this.amchartVariable[coinToken];
                console.log(Object.keys(this.amchartVariable).length)
            }
        }
        else {
            document.getElementById(rowId + i).classList.add('showingNow');
            document.getElementById(rowId + i).classList.remove('hidingNow');
            let parentElementPath = document.getElementById(rowId + i).parentElement.children[0]
            let elementPath = parentElementPath.getElementsByTagName('td');
            let HtmlColl = Array.prototype.slice.call(elementPath);
            let eleInd = HtmlColl.indexOf(document.getElementsByClassName('graphTabledata')[i]);
            let elementExp = parentElementPath.children[eleInd].children[0].classList;

            if (elementExp.contains('fa-arrows-alt')) {
                elementExp.add('fa-arrows');
                elementExp.remove('fa-arrows-alt');
                this.http.post('http://54.165.36.80:5687/exchange/getChart', { pair: coinToken, interval: 30, range: 300 }).map(response => response.json()).subscribe(data => {
                    console.log(data)
                    this.themeDo(i, data, coinToken);
                    this.barsData = data;
                    //this.generateData(30, 1, coinToken);
                })
                // this.generateGraph(chartId+i,coinToken,coinName)
            }
        }
    }

    sort(key) {
        debugger

        this.clearInterval = false;
        clearInterval(this.subscriptionOfHttp);
        // this.subscriptions.unsubscribe();

        if (this.subscriptionOfHttp1.length > 0) {
            for (let m = 0; m < this.subscriptionOfHttp1.length; m++) {
                if (!this.subscriptionOfHttp1[m].closed) {
                    this.subscriptionOfHttp1[m].unsubscribe();
                }
            }
        }

        this.sortingKey = key;
        this.key = key;
        this.reverse = this.reverse == -1 ? 1 : -1;
        this.reverseValue = this.reverse == -1 ? false : true;
        if (this.router.url == '/coinlist') {
            if (localStorage.getItem('userToken')) {
                let tokenV = localStorage.getItem('userToken')
                let toL = this.coinList.length > 0 ? this.coinList.length : 20;
                let request = this.http.post('http://54.165.36.80:5687/api/coins/getFavourites', { token: tokenV, filter: this.advFilter, from: 0, to: toL, sort: { key: this.sortingKey, value: this.reverse } }).map(
                    response => response.json()).subscribe(
                    data => {
                        debugger
                        if (data.length <= 2) {

                            this.noData = false;
                            this.showLoadSpinner = false;
                            for (let n = 0; n < data.length; n++) {
                                if (data[n].favourite == true) {
                                    this.favCoinsList = data[n].data;
                                }
                                else if (data[n].favourite == false) {
                                    this.coinList = data[n].data;
                                }
                            }
                            // this.favCoinsList = data[0].data;
                            // this.coinList = data[1].data;
                            if (parseInt(this.setIntervalTime) >= 1000) {
                                this.runningInterval = setInterval(() => {
                                    this.getAlongFavCoins();
                                }, this.setIntervalTime);
                            }
                        }

                        else {
                            this.coinList = data;
                        }
                    })
                this.subscriptionOfHttp1.push(request)
            } else {
                this.coinList = []
                let toL = this.coinList.length > 0 ? this.coinList.length : 20;
                let request = this.http.post('http://54.165.36.80:5687/exchange/getusd', { filter: this.advFilter, from: 0, to: toL, sort: { key: this.sortingKey, value: this.reverse } }).map(
                    response => response.json()).subscribe(
                    data => {
                        this.portfolioList = [];
                        this.portfolioList = data;
                        setInterval(() => {
                            this.clearInterval = true;
                            this.getCoinList()
                        }, this.setIntervalTime)
                    })
                this.subscriptionOfHttp1.push(request)
            }
        }
        else if (this.router.url == '/portfolio') {
            this.portfolioList = [];
            let toL = this.coinList.length > 0 ? this.coinList.length : 20;
            let token = localStorage.getItem('userToken')
            this.http.post('http://54.165.36.80:5687/api/coins/getPortfolio', { token: token, filter: this.advFilter, from: 0, to: toL, sort: { key: this.sortingKey, value: this.reverse } }).map(

                response => response.json()).subscribe(
                data => {
                    this.portfolioList = [];
                    this.portfolioList = data.portfolioList;
                    setInterval(() => {
                        this.clearInterval = true;
                        this.portfolioList()
                    }, this.setIntervalTime)
                })


        }
    }
    generateGraph(id, coinToken, coinName) {
        this.udf_datafeed = {
            onReady(callback) {
                var config = {
                    configurationData: {
                        supports_search: true,
                        supports_group_request: false,
                        supported_resolutions: [],
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
                    "pricescale": 100,
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
                    // "data_status":"streaming"
                };
                onSymbolResolvedCallback(parseJSONorNot(config2))
            },
            getBars(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
                jQuery.ajax({
                    method: 'POST',
                    async: true,
                    url: 'http://54.165.36.80:5687/exchange/getChart',
                    data: { pair: coinToken },
                    success: function (response) {
                        console.log(response)
                        onHistoryCallback(response, { noData: true, nextTime: 'unix time' })
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
                        url: 'http://54.165.36.80:5687/exchange/getLastSecData',
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
                url: 'http://54.165.36.80:5687/exchange/getChart',
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
        let k = this.graphThemeColor.volumeTheme;
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
                'header_settings',
                'header_resolutions',
                'pane_context_menu',
                'scales_context_menu',
                'legend_context_menu',
                'header_symbol_search',
                'compare_symbol',
                'header_compare',
                'study_buttons_in_legend',
                'hide_last_na_study_output',
                'show_interval_dialog_on_key_press',
                'header_undo_redo',
                'chart_property_page_style',
                'header_screenshot',
                'header_fullscreen_button',
                'timeframes_toolbar',
                'header_interval_dialog_button',
                'use_localstorage_for_settings',
                'header_chart_type',
                'control-bar',
                'edit_buttons_in_legend',
                'show_hide_button_in_legend',
                'format_button_in_legend',
                'delete_button_in_legend',
                'symbol_info',
                'save_chart_properties_to_local_storage'
            ],
            enabled_features: ['disable_resolution_rebuild', 'disable_resolution_rebuild', 'dont_show_boolean_study_arguments', 'hide_last_na_study_output', 'header_indicators'],
            charts_storage_url: this._chartsStorageUrl,
            charts_storage_api_version: this._chartsStorageApiVersion,
            client_id: this._clientId,
            user_id: this._userId,
            toolbar_bg: this.toolsBg,
            debug: true,
            studies_overrides: k,
            fullscreen: this._fullscreen,
            autosize: this._autosize,
            overrides: this.overrides_obj,

        };
        console.log("Created option Graph")

        const tvWidget = new widget(widgetOptions);
        tvWidget.onChartReady(() => {
            console.log("Ploting  Graph")

            tvWidget.createButton()
                .attr('title', "1 Hour")
                .on('click', function (e) {
                    tvWidget.chart().setResolution("1", function () {
                        console.log("set resolution callback");
                    });
                }).append($('<span>1 Hour</span>'));
            tvWidget.createButton()
                .attr('title', "6Hours")
                .on('click', function (e) {
                    tvWidget.chart().setResolution("360", function () {
                        console.log("set resolution callback");
                    });
                }).append($('<span>6 Hours</span>'));
            tvWidget.createButton()
                .attr('title', "1day")
                .on('click', function (e) {
                    tvWidget.chart().setResolution("1D", function () {
                        console.log("set resolution callback");
                    });
                }).append($('<span>1Day</span>'));
            tvWidget.createButton()
                .attr('title', "1week")
                .on('click', function (e) {
                    tvWidget.chart().setResolution("1W", function () {
                        console.log("set resolution callback");
                    });
                }).append($('<span>1Week</span>'));
            tvWidget.createButton()
                .attr('title', "1 Month")
                .on('click', function (e) {
                    tvWidget.chart().setResolution("1M", function () {
                        console.log("set resolution callback");
                    });
                }).append($('<span>1Month</span>'));
            tvWidget.createButton()
                .attr('title', "1 Year")
                .on('click', function (e) {
                    tvWidget.chart().setResolution("12M", function () {
                        console.log("set resolution callback");
                    });
                }).append($('<span>1Year</span>'));
            tvWidget.createButton()
                .attr('title', "1 Year")
                .on('click', function (e) {
                    tvWidget.chart().setResolution("60M", function () {
                        console.log("set resolution callback");
                    });
                }).append($('<span>MAX</span>'));
            tvWidget.createButton({ align: "right" })
                .attr('title', "Candle Stick")
                .addClass('customBtnGraph')
                .on('click', function (e) {
                    tvWidget.chart().setChartType(1);
                }).append($('<span>Candle Stick</span>'));
            tvWidget.createButton({ align: "right" })
                .attr('title', "Line")
                .on('click', function (e) {
                    tvWidget.chart().setChartType(2);
                    tvWidget.chart().setResolution('1D', function () { });
                }).append($('<span>Line</span>'));
            // let line = document.getElementById('lineChart'+i).addEventListener('click',function(){
            //     tvWidget.chart().setChartType(2);
            // })
            // let candle = document.getElementById('candleStick'+i).addEventListener('click',function(){
            //     tvWidget.chart().setChartType(2);
            // })
            tvWidget.chart().setChartType(1);
        });
    }
    coinDetails(id) {
        this.router.navigate(['coinpage/', id]);
    }

    advancedTableFilter(data) {
        if (data.length > 0) {
            this.noData = false;
            this.coinList = data;
        }
        else {
            clearInterval(this.runningInterval);
            this.coinList = [];
            this.noData = true;

        }
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
    decreaseTime(date, dec) {
        date = new Date(new Date().setMinutes(new Date().getMinutes() + dec)).toISOString()
        return date;
    }
    favCoinFunctionality(pair, type, coins) {
        if (localStorage.getItem('userToken')) {
            let tokenV = localStorage.getItem('userToken');
            this.http.put('http://54.165.36.80:5687/api/userSetting/update', { favourites: [pair], token: tokenV }).map(response => response.json()).
                subscribe(data => {
                    let message;
                    if (type == 'normal') {
                        message = 'Added to Favourites list Successfully';
                    }
                    else if (type == 'fav') {
                        message = 'Removed from Favourites list Successfully  ';
                    }
                    this.changeGraphTheme.trigger_successMessagePopUp_filter(message);
                    let tokenV = localStorage.getItem('userToken');
                    this.getUserCoins(tokenV)
                },
                error => {
                    this.changeGraphTheme.trigger_errorMessagePopUp_filter(error.error);
                }
                )
        }
        else {
            let favCoins = pair;
            localStorage.setItem('favcoins', 'pair');
            if (type == 'normal') {
                if (sessionStorage.getItem('favouriteCoins')) {
                    let k = JSON.parse(sessionStorage.getItem('favouriteCoins'));
                    k.push(pair);
                    sessionStorage.setItem('favouriteCoins', JSON.stringify(k))
                }
                else {
                    let k = [];
                    k.push(pair);
                    sessionStorage.setItem('favouriteCoins', JSON.stringify(k));
                }
                // sessionStorage.setItem('favouriteCoins',)
                let obj = this.coinList.findIndex(coin => coins.pair === coin.pair);
                this.coinList.splice(obj, 1);
                console.log(this.coinList.length)
                let coinList = this.coinList;
                this.favCoinsList.push(coins);
                this.favCoinsList = this.favCoinsList;
                this.coinList = [];
                coinList.forEach(element => {
                    this.coinList.push(element)
                });
                // this.coinList = this.coinList;
            }
            else if (type == 'fav') {
                if (sessionStorage.getItem('favouriteCoins')) {
                    let k = JSON.parse(sessionStorage.getItem('favouriteCoins'));
                    k.pop(pair);
                    sessionStorage.setItem('favouriteCoins', JSON.stringify(k))
                }
                else {
                    // let k = [];
                    // k.push(pair);
                    // sessionStorage.setItem('favouriteCoins',JSON.stringify(k));
                }
                let obj = this.favCoinsList.findIndex(coin => coins.pair === coin.pair);
                this.favCoinsList.splice(obj, 1);
                let coinList = this.favCoinsList
                this.coinList.push(coins);
                this.coinList = this.coinList;
                this.favCoinsList = [];
                coinList.forEach(element => {
                    this.favCoinsList.push(element);
                });
                this.favCoinsList = coinList;
            }
            if (this.forceLogin) {
                this.forceLogin = false;
                setTimeout(() => {
                    this.changeGraphTheme.trigger_loginPopUp_filter();
                }, 30000);
            }

        }
    }
    getUserCoins(tokenV) {
        let toL = this.coinList.length + this.favCoinsList.length > 0 ? this.coinList.length + this.favCoinsList.length : 20;
        console.log(this.sortingKey);
        this.subscriptionOfHttp = this.http.post('http://54.165.36.80:5687/api/coins/getFavourites', { token: tokenV, from: 0, to: toL, sort: { key: this.sortingKey, value: this.reverse } }).map(response => response.json()).subscribe(data => {
            this.noData = false;
            this.showLoadSpinner = false;
            for (let n = 0; n < data.length; n++) {
                if (data[n].favourite == true) {
                    this.favCoinsList = data[n].data;
                }
                else if (data[n].favourite == false) {
                    this.coinList = data[n].data;
                }
            }
        },
            err => {
                this.favCoinsList = [];
                this.coinList = [];
            })
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
    userWithFavCoins() {
        this.isAdvFilter = false;
        this.clearInterval = true;
        this.coinList = [];
        this.favCoinsList = [];
        this.getAlongFavCoins();
        // if (parseInt(this.setIntervalTime) >= 1000) {
        //     this.runningInterval = setInterval(() => {
        //         this.getAlongFavCoins();
        //     }, this.setIntervalTime);
        // }

    }
    userNormalData() {
        this.isAdvFilter = false;
        this.coinList = [];
        this.clearInterval = true;
        this.getCoinList();
    }
    updateCurrency(value) {
        this.currencyValue = value;
    }
    getLimitedCoins() {

    }
    ngOnDestroy() {

        if (this.subscriptionOfHttp1) {
            for (let m = 0; m < this.subscriptionOfHttp1.length; m++) {
                if (!this.subscriptionOfHttp1[m].closed) {
                    this.subscriptionOfHttp1[m].unsubscribe();
                }
            }
        }
        this.clearInterval = false;
        // this.subscriptions.unsubscribe();
        clearInterval(this.runningInterval);
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
    @HostListener("window:scroll", ['$event'])
    onWindowScroll(event) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            if (localStorage.getItem('userToken')) {
                this.url = 'http://54.165.36.80:5687/api/coins/getFavourites';
                let tokenv = localStorage.getItem('userToken');

                this.subscriptionOfHttp = this.http.post(this.url, { token: tokenv, from: this.coinList.length + this.favCoinsList.length, to: 20 }).map(
                    response => response.json()).subscribe(
                    data => {
                        if (this.clearInterval && data.length <= 2) {
                            for (let n = 0; n < data.length; n++) {
                                if (data[n].favourite == true) {
                                    data[n].data.forEach(element => {
                                        this.favCoinsList.push(element)
                                    });
                                }
                                else if (data[n].favourite == false) {
                                    data[n].data.forEach(element => {
                                        this.coinList.push(element)
                                    });
                                    //this.updateAllCoinsData(data[n].data);
                                }
                            }
                        }
                        else {
                            data.forEach(element => {
                                this.coinList.push(element)
                            });

                        }
                        this.showLoadSpinner = false;
                    },
                    err => {
                        console.log(err)
                    })
            }
            else {
                this.url = 'http://54.165.36.80:5687/exchange/getusd';

                this.subscriptionOfHttp = this.http.post(this.url, { from: this.coinList.length + 1, to: 21, token: localStorage.getItem('userToken') ? localStorage.getItem('userToken') : '' }).map(
                    response => response.json()).subscribe(
                    data => {
                        data.forEach(element => {
                            this.coinList.push(element)
                        });
                        this.showLoadSpinner = false;
                    },
                    err => {
                        console.log(err)
                    })
            }
            this.showLoadSpinner = true;

            this.showScrollTop = true;
        }
    }


    /*AmChart Implementation */
    themeDo(chartId, chartData, coinToken) {
        let isTheme = document.getElementsByTagName('body')[0].classList.contains('black-theme')
        if (isTheme) {
            this.greenColor = '#00FE2A';
            this.redColor = '#DA0202';
        }
        else {
            this.greenColor = '#00C300';
            this.redColor = '#E70000';
        }
        //   AmCharts.addMovingAverage(this.chartConfig.dataSets[0], this.chartConfig.panels[0], 'value', {
        //     useDataSetColors: false,
        //     color: "#ccffcc",
        //     title: "Moving average"
        // });
        this.amchartVariable[coinToken] = this.AmCharts.makeChart('candleStick' + chartId, {
            "type": "stock",
            "mouseWheelZoomEnabled": true,
            "theme": 'dark',
            "glueToTheEnd": true,
            "categoryAxesSettings": {
                "minPeriod": "mm",
                // "groupToPeriods": ["15mm"],
                "equalSpacing": true,
                "parseDates": false,
            },
            "dataSets": [{
                "fieldMappings": [{
                    "fromField": "open",
                    "toField": "open"
                }, {
                    "fromField": "close",
                    "toField": "close"
                }, {
                    "fromField": "high",
                    "toField": "high"
                }, {
                    "fromField": "low",
                    "toField": "low"
                }, {
                    "fromField": "volume",
                    "toField": "volume"
                }, {
                    "fromField": "value",
                    "toField": "value"
                }],
                "color": "#7f8da9",
                "dataProvider": chartData,
                "title": "West Stock",
                "categoryField": "date"
            },
            // , {
            //   "fieldMappings": [ {
            //     "fromField": "vwap",
            //     "toField": "vwap"
            //   },
            //   {
            //     "fromField": "date",
            //     "toField": "date"
            //   } ],
            //   "color": "#fac314",
            //   "dataProvider": this.vwaparray,
            //   "compared": true,
            //   "title": "East Stock",
            //   "categoryField": "date"
            // } 
            {
                "showCategoryAxis": true,
                "title": "VWAP",
                "fieldMappings": [{
                    "fromField": "vwap",
                    "toField": "vwap"
                }],
                //   dataProvider: this.vwaparray,
                "categoryField": "date",
                "compared": true
            }
            ],
            "zoomControl": {
                "maxZoomLevel": 64,
                "minZoomLevel": 1,
                "left": 1
            },

            "panels": [{
                "title": "Value",
                "showCategoryAxis": true,
                "marginRight": 0,
                "percentHeight": 70,
                "recalculateToPercents": "never",
                "valueAxes": [{
                    "id": "v1",
                    "dashLength": 5,
                    "gridThickness": 1,
                    "position": "right",
                    "ignoreAxisWidth": true,


                }],
                "categoryAxis": {
                    "minPeriod": 'ss',
                    "autoWrap": true,
                    "gridPosition": "start",
                    "labelRotation": 35,
                    "dashLength": 1,
                    "labelFrequency": 6,
                    "autoGridCount": false,
                    "gridThickness": 1,
                    "alwaysGroup": false,
                    "minHorizontalGap": 40,
                    "ignoreAxisWidth": true,
                    "labelsEnabled": true,
                    "startOnAxis": false,
                    "dateFormats": [{ period: 'fff', format: 'JJ:NN:SS' }, { period: 'ss', format: 'JJ:NN:SS' }, { period: 'mm', format: 'MMM DD JJ:NN' }, { period: 'hh', format: 'JJ:NN' }, { period: 'DD', format: 'MMM DD' }, { period: 'WW', format: 'MMM DD' }, { period: 'MM', format: 'MMM' }, { period: 'YYYY', format: 'YYYY' }]
                },
                "stockGraphs": [{
                    "type": "candlestick",
                    "id": "g1",
                    "balloonText": "Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b><br>",
                    "openField": "open",
                    "closeField": "close",
                    "highField": "high",
                    "lowField": "low",
                    "valueField": "close",
                    "lineColor": this.greenColor,
                    "fillColors": this.greenColor,
                    "negativeLineColor": this.redColor,
                    "negativeFillColors": this.redColor,
                    "lineAlpha": 0.7,
                    "fillAlphas": 1,
                    "useDataSetColors": false,
                    "comparable": true,
                    "compareField": "value",
                    "showBalloon": true,
                    "proCandlesticks": true
                }],

                "stockLegend": {
                    "valueTextRegular": undefined,
                    "periodValueTextComparing": "[[percents.value.close]]%"
                },
                "drawingIconsEnabled": true
            },

                // {
                //   "title": "Volume",
                //   "recalculateToPercents": "never",
                //   "marginTop": 1,
                //   "showCategoryAxis": true,
                //   "valueAxes": [ {
                //     "dashLength": 5,
                //     "gridThickness":0
                //   } ],

                //   "categoryAxis": {
                //     "dashLength": 5,
                //     "gridThickness":0
                //   },

                //   "stockGraphs": [ {
                //     "valueField": "volume",
                //     "lineThickness":2,
                //     "showBalloon": false,
                //   } ],

                //   "stockLegend": {
                //     "markerType": "none",
                //     "markerSize": 0,
                //     "labelText": "",
                //     "periodValueTextRegular": "[[value.close]]"
                //   },
                //   // "drawingIconsEnabled": true
                // },
            ],

            "chartScrollbarSettings": {
                "graph": "g1",
                "graphType": "line",
                "usePeriod": "mm",
                "height": 1,
            },
            "chartCursor": {
                "categoryBalloonDateFormat": "DD MMMM",
                "cursorPosition": "middle",

            },
            "valueAxesSettings": {
                "inside": false,
                "showLastLabel": true
            },
            "panelsSettings": {
                "marginRight": 50,
                "marginTop": 30,
                "marginBottom": 40
            },
            "chartCursorSettings": {
                "valueLineBalloonEnabled": true,
                "valueLineEnabled": true,
                "cursorColor": "#fff",
                "valueBalloonsEnabled": true,
                "dateFormats": [{ period: 'fff', format: 'JJ:NN:SS' }, { period: 'ss', format: 'JJ:NN:SS' }, { period: 'mm', format: 'MMM DD JJ:NN' }, { period: 'hh', format: 'JJ:NN' }, { period: 'DD', format: 'MMM DD' }, { period: 'WW', format: 'MMM DD' }, { period: 'MM', format: 'MMM' }, { period: 'YYYY', format: 'YYYY' }]


                //   "categoryBalloonDateFormats": [ {
                //     "period": "mm",
                //     "format": "NN:SS"
                //   }, {
                //     "period": "hh",
                //     "format": "NN:SS:QQQ"
                //   } ]
            },


            "export": {
                "enabled": true,
                "position": "top-left"
            },
            "event": "zoomed",
            "method": '',
        });
        this.amchartVariable[coinToken].dataProvider = chartData;
        console.log(this.weeklyData);
        // setInterval(() => {
        //     this.AutoUpdateOfChart();
        // }, 3000)

    }
    chartDispal(coinToken, intervalTime, rangeVal, btn) {
        if (this.amchartVariable[coinToken][btn]) {
            this.amchartVariable[coinToken].dataProvider = [];
            let data = this.amchartVariable[coinToken][btn];
            this.amchartVariable[coinToken].dataSets[0].dataProvider = data
            // this.amchartVariable[coinToken].dataProvider = data;
            this.amchartVariable[coinToken].zoomOut();
            this.amchartVariable[coinToken].validateData();
            this.amchartVariable[coinToken].zoomOut();
        }
        else {
            this.http.post('http://54.165.36.80:5687/exchange/getChart', { pair: coinToken, interval: intervalTime, range: rangeVal }).map(response => response.json()).subscribe(data => {
                this.amchartVariable[coinToken][btn] = data;
                this.amchartVariable[coinToken].dataProvider = [];
                this.amchartVariable[coinToken].dataSets[0].dataProvider = data
                // this.amchartVariable[coinToken].dataProvider = data;
                this.amchartVariable[coinToken].zoomOut();
                this.amchartVariable[coinToken].validateData();
                this.amchartVariable[coinToken].zoomOut();

            })
        }
        this.isBtnClicked = btn

    }
    AutoUpdateOfChart() {

        for (let propt in this.amchartVariable) {
            this.http.post('http://54.165.36.80:5687/exchange/getLastSecData', { pair: propt }).map(response => response.json()).subscribe(data => {
                // this.chartDataProvider.push(data);
                let k = this.AmCharts;
                data[0]['date'] = new Date().toISOString();
                if (data.length > 0) {
                    console.log(this.amchartVariable[propt].dataProvider.length)
                    // this.chartDataProvider.push(data[0]);
                    this.amchartVariable[propt].dataSets[0].dataProvider.push(data[0])
                    this.amchartVariable[propt].dataProvider.shift();
                    this.amchartVariable[propt].validateData();
                }
            })
        }
    }
    changeType(type, variable) {
        if (type) {
            // this.btnActive= type;
            this.amchartVariable[variable].panels[0].stockGraphs[0].type = type;
            if (type == 'line') {
                this.amchartVariable[variable].panels[0].stockGraphs[0].fillAlphas = 0;
                this.amchartVariable[variable].validateData();

            }
            else if (type == 'candlestick') {
                this.amchartVariable[variable].panels[0].stockGraphs[0].fillAlphas = 1;
                this.amchartVariable[variable].validateData();
            }
        }
        // this.amchartVariable[variable].validateNow();
    }
    advancedSearchFilter(advFilter) {
        if (advFilter.length > 0) {
            this.changeGraphTheme.clear_interval_filter();
            this.http.post('http://54.165.36.80:5687/exchange/getusd', { filter: advFilter, from: 0, to: 1500 }).map(response => response.json()).
                subscribe(
                data => {
                    console.log(data)
                    this.advancedTableFilter(data);
                },
                err => {
                    console.log(err)
                    let array = [];
                    this.advancedTableFilter(array);
                })
        }
    }


    getPortfolioList() {

        let token = localStorage.getItem('userToken');
        this.http.post('http://54.165.36.80:5687/api/coins/getPortfolio', { token: token }).map(
            response => response.json()).subscribe(
            data => {
                this.getLoggedIn = false;
                debugger
                if (this.portfolioList.length > 0) {
                    this.updatePortfolio(data.portfolioList)
                    this.showLoadSpinner = false
                }
                
                else if (data.portfolioList.length == 0) {
                    this.showLoadSpinner = false;
                    this.noData = true;
                }
                else {

                    this.portfolioList = data.portfolioList;
                    console.log(data)
                    this.showLoadSpinner = false;

                    this.runningInterval = setInterval(() => {
                        this.getPortfolioList();
                    }, this.setIntervalTime)
                }
            },
        );

    }

    updatePortfolio(allCoins) {debugger
        console.log(allCoins)
        for (let i = 0; i < allCoins.length; i++) {
            let checkIsThere = true;
            let obj = this.portfolioList.findIndex(coin => allCoins[i].pair === coin.pair);
            if (obj != -1) {
                this.portfolioList[obj].price = allCoins[i].price;
                console.log(this.portfolioList[obj].price, allCoins[i].price)
                this.portfolioList[obj].priceStatus = allCoins[i].priceStatus;
                this.portfolioList[obj].dayPrice = allCoins[i].dayPrice;
                this.portfolioList[obj].dayPriceStatus = allCoins[i].dayPriceStatus;
            }
            else {
                this.portfolioList.push(allCoins[i]);
            }
        }
    }
}

