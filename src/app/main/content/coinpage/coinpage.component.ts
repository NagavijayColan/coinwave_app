import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompDataSharingService } from "../../../comp-data-sharing.service";
import { document } from 'angular-bootstrap-md/utils/facade/browser';
import {
    widget,
    onready,
    ChartingLibraryWidgetOptions,
    LanguageCode,
} from '../../../../assets/charting_library/charting_library.min';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Component({
    selector: 'app-coinpage',
    templateUrl: './coinpage.component.html',
    styleUrls: ['./coinpage.component.css']
})
export class CoinpageComponent implements OnInit {
    public themeType;
    public backgroundColor;
    public jsonData;
    public graphThemeColor: any;
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
    public udf_datafeed;
    public coinList;
    public barsData;
    public setIntervalTime;
    public coinData;
    public volume_white;
    variable: any;
    public toolsBg;
    public coinKey;
    public isOpened;
    public coinName;
    public coinImage;
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

    constructor(private http: Http, private aroute: ActivatedRoute, private changeGraphTheme: CompDataSharingService) { }
    ngOnInit() {
        this.isOpened = false;
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
        this.aroute.params.subscribe(params => {
            this.coinKey = params['id'];
        });
        this.http.get("http://coinwave.service.colanonline.net/exchange/getusd/" + this.coinKey).map(
            response => response.json()).subscribe(
            data => {
                this.coinName = data[0].name;
                this.coinImage = data[0].image;
                this.coinData = [
                    {
                        "cp_24four_change": "14.2%",
                        "cp_7day_change": "5.6%",
                        "cp_30day_change": "7.6%",
                        "cp_24hr_volume": "$56,549,987",
                        "cp_24hr_high": "$9,2765",
                        "cp_24hr_low": "$7,943.2",
                        "cp_market_cap": "$99,549,987",
                        "cp_circulating_supply": "$15,000,000",
                        "cp_total_supply": "$16,000,000"
                    },
                ]

            },
        );

        this.graphThemeColor = {
            theme: '',
            bgColor: ''
        }
        this.changeGraphTheme.currentMessage.subscribe(message => this.graphThemeColor = message)
        this.themeType = this.graphThemeColor.theme;
        this.backgroundColor = this.graphThemeColor.bgColor;
        this.setIntervalTime = 1000;
        this.overrides_obj = this.graphThemeColor;
        this.generateGraph(this.coinKey)
    }

    // Sort 
    key: string = 'name';
    reverse: boolean = false;
    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }
    generateGraph(coinToken) {

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
                    url: 'http://coinwave.service.colanonline.net/exchange/getChart',
                    data: { pair: coinToken },
                    success: function (response) {

                        onHistoryCallback(response, { noData: true })
                    },
                    error: function (res) {
                        return 'F'
                    }
                })

            },
            subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
                var configData;
                setInterval(() => {
                    jQuery.ajax({
                        method: 'POST',
                        async: true,
                        url: 'http://coinwave.service.colanonline.net/exchange/getLastSecData',
                        data: { pair: coinToken },
                        success: function (response) {

                            onRealtimeCallback(parseJSONorNot(response[0]));
                        },
                        error: function (res) {
                            return 'F'
                        }
                    })
                }, 1000)
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
        function getLanguageFromURL(): LanguageCode | null {
            const regex = new RegExp('[\\?&]lang=([^&#]*)');
            const results = regex.exec(location.search);

            return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' ')) as LanguageCode;
        }
        this.overrides_obj = this.graphThemeColor.theme;
        this.toolsBg = this.graphThemeColor.toolsBg;
        const widgetOptions: ChartingLibraryWidgetOptions = {
            symbol: this._symbol,
            loading_screen: { backgroundColor: '#000' },
            datafeed: this.udf_datafeed,
            interval: this._interval,
            container_id: 'coinDetails_tv',
            library_path: this._libraryPath,
            locale: getLanguageFromURL() || 'en',
            disabled_features: [
                'header_saveload',
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
    addToPortfolio() {
        if (localStorage.getItem('userToken')) {
            let tokenV = localStorage.getItem('userToken');
            this.http.put('http://coinwave.service.colanonline.net/api/userSetting/update', { portfolio: this.coinKey, token: tokenV }).map(
                response => response.json()).subscribe(
                data => {
                    alert(data)
                }
                )
        }
    }
    buyCoin() {
        this.isOpened = !this.isOpened
    }

}
