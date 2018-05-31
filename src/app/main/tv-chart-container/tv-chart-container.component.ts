import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompDataSharingService } from "../../comp-data-sharing.service";
import {Http} from '@angular/http';
import {
    widget,
    onready,
    ChartingLibraryWidgetOptions,
    LanguageCode,
} from '../../../assets/charting_library/charting_library.min';
import { window, document } from 'angular-bootstrap-md/utils/facade/browser';
// import { setInterval } from 'timers';

@Component({
    selector: 'app-tv-chart-container',
    templateUrl: './tv-chart-container.component.html',
    styleUrls: ['./tv-chart-container.component.css']
})
export class TvChartContainerComponent implements OnInit {
    
    
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
    public graphThemeColor : any;
    public udf_datafeed;
    public coinList;
    public barsData;
    public getallCoins;
    public setIntervalTime;
    public volume_white;
    variable:any
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
    
   constructor(private http : Http,private router : Router,private changeGraphTheme : CompDataSharingService){}
    ngOnInit() {
        this.volume_white = {
            "volume.volume.color.0": "#000",
            "volume.volume.color.1": "#fff",
            "volume.volume.transparency": 70,
            "volume.volume ma.color": "#FF0000",
            "volume.volume ma.transparency": 30,
            "volume.volume ma.linewidth": 5,
            "volume.show ma": true,
            "bollinger bands.median.color": "#33FF88",
            "bollinger bands.upper.linewidth": 7
        }
        this.coinList=[];
        this.changeGraphTheme.currentMessage.subscribe(message => this.graphThemeColor = message);
        this.setIntervalTime = 1000;
        this.getCoinList();
        setInterval(() => {
            this.getCoinList();
            console.log("caling")
         },this.setIntervalTime);
        console.log("OHO",this.graphThemeColor)
        this.overrides_obj = this.graphThemeColor;
    }
    expandGraph(ev,i,coinToken,coinName){
        
        if(document.getElementById('expand'+i).classList.contains('showingNow')){
          document.getElementById('expand'+i).classList.remove('showingNow');
          document.getElementById('expand'+i).classList.add('hidingNow');
          let elementExp = document.getElementById('expand'+i).parentElement.children[0].children[0].children[0].classList
         if(elementExp.contains('fa-arrows')){
          elementExp.add('fa-arrows-alt')
          elementExp.remove('fa-arrows')
         }
        }
        else{
          document.getElementById('expand'+i).classList.add('showingNow');
          document.getElementById('expand'+i).classList.remove('hidingNow');
          let elementExp = document.getElementById('expand'+i).parentElement.children[0].children[0].children[0].classList
          if(elementExp.contains('fa-arrows-alt')){
           elementExp.add('fa-arrows')
           elementExp.remove('fa-arrows-alt')
          }
        }
        this.generateGraph("tv_chart_container"+i,coinToken,coinName);
        } 
        key: string = 'name'; 
        reverse: boolean = false;
        sort(key){
        this.key = key;
        this.reverse = !this.reverse;
        } 
        generateGraph(id,coinToken,coinName){

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
                var coinTokenSam = coinToken.toUpperCase()
                var config2 = {
                    "name": coinTokenSam,
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
                    async : true,
                    url : 'http://182.72.201.145:5687/exchange/getChart',
                    data : {pair : coinToken},
                    success : function(response){
                        console.log("Bars Response" , response)
                        onHistoryCallback(response, {noData: true})
                    },
                    error: function(res){
                        return 'F'
                    
                    }
                })
            },
            subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
                var configData;
                console.log('subscribe ' + resolution);
                setInterval(() => {
                   configData =  chartDataUpdate();
                   console.log(configData)
                   onRealtimeCallback(parseJSONorNot(configData));
                }, 1000);
                onRealtimeCallback(parseJSONorNot(configData));
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
        function chartDataUpdate(){
            
            jQuery.ajax({
                method: 'POST',
                async : true,
                url : 'http://182.72.201.145:5687/exchange/getChart',
                data : {pair : coinToken},
                success : function(response){
                    console.log("Response" , response)
                    return response;
                },
                error: function(res){
                    return 'F'
                
                }
            })
        }
        function getLanguageFromURL(): LanguageCode | null {
            const regex = new RegExp('[\\?&]lang=([^&#]*)');
            const results = regex.exec(location.search);

            return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' ')) as LanguageCode;
        }
        this.overrides_obj = this.graphThemeColor;

        const widgetOptions: ChartingLibraryWidgetOptions = {
            
            symbol: this._symbol,
            loading_screen: { backgroundColor: '#000' },
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
            enabled_features: ['study_templates','header_chart_type','header_settings'],
            charts_storage_url: this._chartsStorageUrl,
            charts_storage_api_version: this._chartsStorageApiVersion,
            client_id: this._clientId,
            user_id: this._userId,
            // toolbar_bg: '#212121',
            // debug: true,
            // studies_overrides : this.volume_white,
            fullscreen: this._fullscreen,
            autosize: this._autosize,
            overrides :  this.overrides_obj    
        };
        const tvWidget = new widget(widgetOptions);
            tvWidget.onChartReady(() => {
                tvWidget.chart().setChartType(2);
            });
        }
        coinDetails(id){
            this.router.navigate(['coinpage/' ,id]);
        }
        getCoinList(){
            this.http.post('http://182.72.201.145:5687/exchange/getusd',{}).map(
                response => response.json()).subscribe(
                    data => {
                        this.getallCoins = data;
                       
                        if(this.coinList.length > 0 && this.getallCoins.length === this.coinList.length){
                            this.updateCoindData(this.getallCoins)
                        }
                        else{
                            this.coinList =this.getallCoins;
                            console.log('Data' , this.getallCoins)
                        }
                    })
        } 
        updateCoindData(allCoins){
            
            for(let i=0; i < allCoins.length; i++){

                for(let k = 0; k < allCoins.length; k++){
                    if(this.coinList[k].pair == allCoins[i].pair){
                        this.coinList[k].price = allCoins[i].price;
                        this.coinList[k].change = allCoins[i].change;
                        this.coinList[k].dayVolume = allCoins[i].dayVolume;
                        this.coinList[k].highestPrice = allCoins[i].highestPrice;
                        this.coinList[k].lowestPrice = allCoins[i].lowestPrice;
                    }
                }
            }
        }
}
