import { Component, OnInit ,ViewChild} from '@angular/core';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { CompDataSharingService } from "../../comp-data-sharing.service";
import {Router } from '@angular/router'
@Component({
  selector: 'app-graph-section',
  templateUrl: './graph-section.component.html',
  styleUrls: ['./graph-section.component.css']
})
export class GraphSectionComponent implements OnInit {
  // public myOptions;
  // constructor() { }
 
  // ngOnInit() {
  //   setTimeout(function(){
  //     let k = document.getElementsByClassName('amcharts-period-selector-div');
  //     for(let i = 0; i < k.length ; i++){
  //       k[i].setAttribute('style','display:none !important')
  //     }

  //   },300)
   
  //   this.myOptions =[{
  //   name:"vijay"
  //   },
  //   {
  //     name:"vijay"
  //     },
  //     {
  //       name:"vijay"
  //     }]
  // }
  public chartData:any;
private chart: AmChart;
public themeType : any;
public backgroundColor;
public chartConfig;
public typical_Price;
public vp;
public tvp;
public vwap;
public vwaparray = [];
public tv;
public  tvDup = 0;
public  tvpDup = 0;
public i=0;;
public j=0;
public l=0;
public ddd;
public disabled;
public chart1;
public chart2;
public chartData3;
public chartData1;
public inst;
public films;
public closeGraph:boolean;
public graphThemeColor : any;

constructor(private router : Router , private AmCharts: AmChartsService,private changeGraphTheme : CompDataSharingService) {}

ngOnInit() {
  this.graphThemeColor = {
    theme : '',
    bgColor : ''
  }
  this.changeGraphTheme.currentMessage.subscribe(message => this.graphThemeColor = message)
  // this.closeGraph = true;
  this.films = [
    // { title: 'The Shawshank Redemption', year: 1994, rating: 9.2, director: 'Frank Darabont', description: ' '},

    {
        id:'btc',
         coin: 'Bitcoin(BTC)', 
         price: '9.2',
         HRchange: '11.20%',
         dayChange: '11.20%',
         Hrvolume:'$16,288,423,566',
         marketCap:'$16,288,423,566',
         hrhigh:'$16,784',
         hrlow:'$16,784',
         description: [{"date":"2012-10-26T18:30:00.000Z","open":125,"close":134,"high":134,"low":123,"volume":316,"value":113},{"date":"2012-10-27T18:30:00.000Z","open":104,"close":105,"high":105,"low":100,"volume":1049,"value":117},{"date":"2012-10-28T18:30:00.000Z","open":118,"close":124,"high":125,"low":117,"volume":584,"value":118},{"date":"2012-10-29T18:30:00.000Z","open":103,"close":106,"high":107,"low":98,"volume":305,"value":117},{"date":"2012-10-30T18:30:00.000Z","open":113,"close":117,"high":119,"low":108,"volume":496,"value":126},{"date":"2012-10-31T18:30:00.000Z","open":115,"close":123,"high":124,"low":112,"volume":585,"value":125},{"date":"2012-11-01T18:30:00.000Z","open":105,"close":110,"high":111,"low":102,"volume":741,"value":127},{"date":"2012-11-02T18:30:00.000Z","open":116,"close":118,"high":119,"low":113,"volume":796,"value":110},{"date":"2012-11-03T18:30:00.000Z","open":122,"close":124,"high":126,"low":119,"volume":132,"value":118},{"date":"2012-11-04T18:30:00.000Z","open":113,"close":121,"high":121,"low":108,"volume":110,"value":130},{"date":"2012-11-05T18:30:00.000Z","open":110,"close":114,"high":118,"low":109,"volume":238,"value":116},{"date":"2012-11-06T18:30:00.000Z","open":115,"close":118,"high":120,"low":114,"volume":831,"value":108},{"date":"2012-11-07T18:30:00.000Z","open":109,"close":104,"high":113,"low":104,"volume":641,"value":113},{"date":"2012-11-08T18:30:00.000Z","open":118,"close":126,"high":129,"low":118,"volume":287,"value":116},{"date":"2012-11-09T18:30:00.000Z","open":122,"close":127,"high":132,"low":120,"volume":1095,"value":113},{"date":"2012-11-10T18:30:00.000Z","open":104,"close":101,"high":105,"low":99,"volume":435,"value":124},{"date":"2012-11-11T18:30:00.000Z","open":109,"close":123,"high":127,"low":108,"volume":886,"value":103},{"date":"2012-11-12T18:30:00.000Z","open":116,"close":128,"high":128,"low":114,"volume":470,"value":117},{"date":"2012-11-13T18:30:00.000Z","open":109,"close":110,"high":110,"low":108,"volume":267,"value":119},{"date":"2012-11-14T18:30:00.000Z","open":116,"close":125,"high":127,"low":112,"volume":508,"value":129},{"date":"2012-11-15T18:30:00.000Z","open":119,"close":132,"high":135,"low":116,"volume":1025,"value":121},{"date":"2012-11-16T18:30:00.000Z","open":100,"close":100,"high":101,"low":97,"volume":1092,"value":125},{"date":"2012-11-17T18:30:00.000Z","open":113,"close":119,"high":120,"low":112,"volume":303,"value":102},{"date":"2012-11-18T18:30:00.000Z","open":106,"close":109,"high":110,"low":102,"volume":716,"value":112},{"date":"2012-11-19T18:30:00.000Z","open":113,"close":114,"high":119,"low":113,"volume":860,"value":110},{"date":"2012-11-20T18:30:00.000Z","open":119,"close":125,"high":125,"low":119,"volume":206,"value":111},{"date":"2012-11-21T18:30:00.000Z","open":129,"close":127,"high":134,"low":125,"volume":975,"value":116},{"date":"2012-11-22T18:30:00.000Z","open":117,"close":119,"high":122,"low":114,"volume":184,"value":124},{"date":"2012-11-23T18:30:00.000Z","open":100,"close":108,"high":108,"low":99,"volume":502,"value":127},{"date":"2012-11-24T18:30:00.000Z","open":126,"close":135,"high":135,"low":122,"volume":1104,"value":102},{"date":"2012-11-25T18:30:00.000Z","open":128,"close":128,"high":130,"low":126,"volume":390,"value":122}]
    },

    { id:'ripple', coin: 'Ripple', price: '9.1', HRchange: '11.21%', dayChange: '11.21%', Hrvolume:'$16,288,423,566', marketCap:'$17,288,423,566', hrhigh:'$17,784', hrlow:'$17,784', description: [{"date":"2012-10-26T18:30:00.000Z","open":125,"close":134,"high":134,"low":123,"volume":316,"value":113},{"date":"2012-10-27T18:30:00.000Z","open":104,"close":105,"high":105,"low":100,"volume":1049,"value":117},{"date":"2012-10-28T18:30:00.000Z","open":118,"close":124,"high":125,"low":117,"volume":584,"value":118},{"date":"2012-10-29T18:30:00.000Z","open":103,"close":106,"high":107,"low":98,"volume":305,"value":117},{"date":"2012-10-30T18:30:00.000Z","open":113,"close":117,"high":119,"low":108,"volume":496,"value":126},{"date":"2012-10-31T18:30:00.000Z","open":115,"close":123,"high":124,"low":112,"volume":585,"value":125},{"date":"2012-11-01T18:30:00.000Z","open":105,"close":110,"high":111,"low":102,"volume":741,"value":127},{"date":"2012-11-02T18:30:00.000Z","open":116,"close":118,"high":119,"low":113,"volume":796,"value":110},{"date":"2012-11-03T18:30:00.000Z","open":122,"close":124,"high":126,"low":119,"volume":132,"value":118},{"date":"2012-11-04T18:30:00.000Z","open":113,"close":121,"high":121,"low":108,"volume":110,"value":130},{"date":"2012-11-05T18:30:00.000Z","open":110,"close":114,"high":118,"low":109,"volume":238,"value":116},{"date":"2012-11-06T18:30:00.000Z","open":115,"close":118,"high":120,"low":114,"volume":831,"value":108},{"date":"2012-11-07T18:30:00.000Z","open":109,"close":104,"high":113,"low":104,"volume":641,"value":113},{"date":"2012-11-08T18:30:00.000Z","open":118,"close":126,"high":129,"low":118,"volume":287,"value":116},{"date":"2012-11-09T18:30:00.000Z","open":122,"close":127,"high":132,"low":120,"volume":1095,"value":113},{"date":"2012-11-10T18:30:00.000Z","open":104,"close":101,"high":105,"low":99,"volume":435,"value":124},{"date":"2012-11-11T18:30:00.000Z","open":109,"close":123,"high":127,"low":108,"volume":886,"value":103},{"date":"2012-11-12T18:30:00.000Z","open":116,"close":128,"high":128,"low":114,"volume":470,"value":117},{"date":"2012-11-13T18:30:00.000Z","open":109,"close":110,"high":110,"low":108,"volume":267,"value":119},{"date":"2012-11-14T18:30:00.000Z","open":116,"close":125,"high":127,"low":112,"volume":508,"value":129},{"date":"2012-11-15T18:30:00.000Z","open":119,"close":132,"high":135,"low":116,"volume":1025,"value":121},{"date":"2012-11-16T18:30:00.000Z","open":100,"close":100,"high":101,"low":97,"volume":1092,"value":125},{"date":"2012-11-17T18:30:00.000Z","open":113,"close":119,"high":120,"low":112,"volume":303,"value":102},{"date":"2012-11-18T18:30:00.000Z","open":106,"close":109,"high":110,"low":102,"volume":716,"value":112},{"date":"2012-11-19T18:30:00.000Z","open":113,"close":114,"high":119,"low":113,"volume":860,"value":110},{"date":"2012-11-20T18:30:00.000Z","open":119,"close":125,"high":125,"low":119,"volume":206,"value":111},{"date":"2012-11-21T18:30:00.000Z","open":129,"close":127,"high":134,"low":125,"volume":975,"value":116},{"date":"2012-11-22T18:30:00.000Z","open":117,"close":119,"high":122,"low":114,"volume":184,"value":124},{"date":"2012-11-23T18:30:00.000Z","open":100,"close":108,"high":108,"low":99,"volume":502,"value":127},{"date":"2012-11-24T18:30:00.000Z","open":126,"close":135,"high":135,"low":122,"volume":1104,"value":102}]},

    { id:'btc',coin: 'Bitcoin(BTC)', price: '9.2', HRchange: '11.20%', dayChange: '11.20%', Hrvolume:'$16,288,423,566', marketCap:'$16,288,423,566', hrhigh:'$16,784', hrlow:'$16,784', description: [{"date":"2012-11-09T18:30:00.000Z","open":122,"close":127,"high":132,"low":120,"volume":1095,"value":113},{"date":"2012-11-10T18:30:00.000Z","open":104,"close":101,"high":105,"low":99,"volume":435,"value":124},{"date":"2012-11-11T18:30:00.000Z","open":109,"close":123,"high":127,"low":108,"volume":886,"value":103},{"date":"2012-11-12T18:30:00.000Z","open":116,"close":128,"high":128,"low":114,"volume":470,"value":117},{"date":"2012-11-13T18:30:00.000Z","open":109,"close":110,"high":110,"low":108,"volume":267,"value":119},{"date":"2012-11-14T18:30:00.000Z","open":116,"close":125,"high":127,"low":112,"volume":508,"value":129},{"date":"2012-11-15T18:30:00.000Z","open":119,"close":132,"high":135,"low":116,"volume":1025,"value":121},{"date":"2012-11-16T18:30:00.000Z","open":100,"close":100,"high":101,"low":97,"volume":1092,"value":125},{"date":"2012-11-17T18:30:00.000Z","open":113,"close":119,"high":120,"low":112,"volume":303,"value":102},{"date":"2012-11-18T18:30:00.000Z","open":106,"close":109,"high":110,"low":102,"volume":716,"value":112},{"date":"2012-11-19T18:30:00.000Z","open":113,"close":114,"high":119,"low":113,"volume":860,"value":110},{"date":"2012-11-20T18:30:00.000Z","open":119,"close":125,"high":125,"low":119,"volume":206,"value":111},{"date":"2012-11-21T18:30:00.000Z","open":129,"close":127,"high":134,"low":125,"volume":975,"value":116},{"date":"2012-11-22T18:30:00.000Z","open":117,"close":119,"high":122,"low":114,"volume":184,"value":124},{"date":"2012-11-23T18:30:00.000Z","open":100,"close":108,"high":108,"low":99,"volume":502,"value":127},{"date":"2012-11-24T18:30:00.000Z","open":126,"close":135,"high":135,"low":122,"volume":1104,"value":102},{"date":"2012-11-25T18:30:00.000Z","open":128,"close":128,"high":130,"low":126,"volume":390,"value":122}]},
    
    { id:'ripple',coin: 'Ripple', price: '9.1', HRchange: '11.21%', dayChange: '11.21%', Hrvolume:'$16,288,423,566', marketCap:'$17,288,423,566', hrhigh:'$17,784', hrlow:'$17,784', description: [{"date":"2012-10-26T18:30:00.000Z","open":125,"close":134,"high":134,"low":123,"volume":316,"value":113},{"date":"2012-10-27T18:30:00.000Z","open":104,"close":105,"high":105,"low":100,"volume":1049,"value":117},{"date":"2012-10-28T18:30:00.000Z","open":118,"close":124,"high":125,"low":117,"volume":584,"value":118},{"date":"2012-10-29T18:30:00.000Z","open":103,"close":106,"high":107,"low":98,"volume":305,"value":117},{"date":"2012-10-30T18:30:00.000Z","open":113,"close":117,"high":119,"low":108,"volume":496,"value":126},{"date":"2012-10-31T18:30:00.000Z","open":115,"close":123,"high":124,"low":112,"volume":585,"value":125},{"date":"2012-11-01T18:30:00.000Z","open":105,"close":110,"high":111,"low":102,"volume":741,"value":127},{"date":"2012-11-02T18:30:00.000Z","open":116,"close":118,"high":119,"low":113,"volume":796,"value":110},{"date":"2012-11-03T18:30:00.000Z","open":122,"close":124,"high":126,"low":119,"volume":132,"value":118},{"date":"2012-11-04T18:30:00.000Z","open":113,"close":121,"high":121,"low":108,"volume":110,"value":130},{"date":"2012-11-05T18:30:00.000Z","open":110,"close":114,"high":118,"low":109,"volume":238,"value":116},{"date":"2012-11-06T18:30:00.000Z","open":115,"close":118,"high":120,"low":114,"volume":831,"value":108},{"date":"2012-11-07T18:30:00.000Z","open":109,"close":104,"high":113,"low":104,"volume":641,"value":113},{"date":"2012-11-08T18:30:00.000Z","open":118,"close":126,"high":129,"low":118,"volume":287,"value":116},{"date":"2012-11-09T18:30:00.000Z","open":122,"close":127,"high":132,"low":120,"volume":1095,"value":113},{"date":"2012-11-10T18:30:00.000Z","open":104,"close":101,"high":105,"low":99,"volume":435,"value":124},{"date":"2012-11-11T18:30:00.000Z","open":109,"close":123,"high":127,"low":108,"volume":886,"value":103},{"date":"2012-11-12T18:30:00.000Z","open":116,"close":128,"high":128,"low":114,"volume":470,"value":117},{"date":"2012-11-13T18:30:00.000Z","open":109,"close":110,"high":110,"low":108,"volume":267,"value":119},{"date":"2012-11-14T18:30:00.000Z","open":116,"close":125,"high":127,"low":112,"volume":508,"value":129},{"date":"2012-11-15T18:30:00.000Z","open":119,"close":132,"high":135,"low":116,"volume":1025,"value":121},{"date":"2012-11-16T18:30:00.000Z","open":100,"close":100,"high":101,"low":97,"volume":1092,"value":125},{"date":"2012-11-17T18:30:00.000Z","open":113,"close":119,"high":120,"low":112,"volume":303,"value":102},{"date":"2012-11-18T18:30:00.000Z","open":106,"close":109,"high":110,"low":102,"volume":716,"value":112},{"date":"2012-11-19T18:30:00.000Z","open":113,"close":114,"high":119,"low":113,"volume":860,"value":110},{"date":"2012-11-20T18:30:00.000Z","open":119,"close":125,"high":125,"low":119,"volume":206,"value":111},{"date":"2012-11-21T18:30:00.000Z","open":129,"close":127,"high":134,"low":125,"volume":975,"value":116},{"date":"2012-11-22T18:30:00.000Z","open":117,"close":119,"high":122,"low":114,"volume":184,"value":124},{"date":"2012-11-23T18:30:00.000Z","open":100,"close":108,"high":108,"low":99,"volume":502,"value":127},{"date":"2012-11-24T18:30:00.000Z","open":126,"close":135,"high":135,"low":122,"volume":1104,"value":102},{"date":"2012-11-25T18:30:00.000Z","open":128,"close":128,"high":130,"low":126,"volume":390,"value":122}]},

    { id:'btc',coin: 'Bitcoin(BTC)', price: '9.2', HRchange: '11.20%', dayChange: '11.20%', Hrvolume:'$16,288,423,566', marketCap:'$16,288,423,566', hrhigh:'$16,784', hrlow:'$16,784', description: [{"date":"2012-10-26T18:30:00.000Z","open":125,"close":134,"high":134,"low":123,"volume":316,"value":113},{"date":"2012-10-27T18:30:00.000Z","open":104,"close":105,"high":105,"low":100,"volume":1049,"value":117},{"date":"2012-10-28T18:30:00.000Z","open":118,"close":124,"high":125,"low":117,"volume":584,"value":118},{"date":"2012-10-29T18:30:00.000Z","open":103,"close":106,"high":107,"low":98,"volume":305,"value":117},{"date":"2012-10-30T18:30:00.000Z","open":113,"close":117,"high":119,"low":108,"volume":496,"value":126},{"date":"2012-10-31T18:30:00.000Z","open":115,"close":123,"high":124,"low":112,"volume":585,"value":125},{"date":"2012-11-01T18:30:00.000Z","open":105,"close":110,"high":111,"low":102,"volume":741,"value":127},{"date":"2012-11-02T18:30:00.000Z","open":116,"close":118,"high":119,"low":113,"volume":796,"value":110},{"date":"2012-11-03T18:30:00.000Z","open":122,"close":124,"high":126,"low":119,"volume":132,"value":118},{"date":"2012-11-04T18:30:00.000Z","open":113,"close":121,"high":121,"low":108,"volume":110,"value":130},{"date":"2012-11-05T18:30:00.000Z","open":110,"close":114,"high":118,"low":109,"volume":238,"value":116},{"date":"2012-11-06T18:30:00.000Z","open":115,"close":118,"high":120,"low":114,"volume":831,"value":108},{"date":"2012-11-07T18:30:00.000Z","open":109,"close":104,"high":113,"low":104,"volume":641,"value":113},{"date":"2012-11-08T18:30:00.000Z","open":118,"close":126,"high":129,"low":118,"volume":287,"value":116},{"date":"2012-11-09T18:30:00.000Z","open":122,"close":127,"high":132,"low":120,"volume":1095,"value":113},{"date":"2012-11-10T18:30:00.000Z","open":104,"close":101,"high":105,"low":99,"volume":435,"value":124},{"date":"2012-11-11T18:30:00.000Z","open":109,"close":123,"high":127,"low":108,"volume":886,"value":103},{"date":"2012-11-12T18:30:00.000Z","open":116,"close":128,"high":128,"low":114,"volume":470,"value":117},{"date":"2012-11-13T18:30:00.000Z","open":109,"close":110,"high":110,"low":108,"volume":267,"value":119},{"date":"2012-11-14T18:30:00.000Z","open":116,"close":125,"high":127,"low":112,"volume":508,"value":129},{"date":"2012-11-15T18:30:00.000Z","open":119,"close":132,"high":135,"low":116,"volume":1025,"value":121},{"date":"2012-11-16T18:30:00.000Z","open":100,"close":100,"high":101,"low":97,"volume":1092,"value":125},{"date":"2012-11-17T18:30:00.000Z","open":113,"close":119,"high":120,"low":112,"volume":303,"value":102},{"date":"2012-11-18T18:30:00.000Z","open":106,"close":109,"high":110,"low":102,"volume":716,"value":112},{"date":"2012-11-19T18:30:00.000Z","open":113,"close":114,"high":119,"low":113,"volume":860,"value":110},{"date":"2012-11-20T18:30:00.000Z","open":119,"close":125,"high":125,"low":119,"volume":206,"value":111},{"date":"2012-11-21T18:30:00.000Z","open":129,"close":127,"high":134,"low":125,"volume":975,"value":116},{"date":"2012-11-22T18:30:00.000Z","open":117,"close":119,"high":122,"low":114,"volume":184,"value":124},{"date":"2012-11-23T18:30:00.000Z","open":100,"close":108,"high":108,"low":99,"volume":502,"value":127},{"date":"2012-11-24T18:30:00.000Z","open":126,"close":135,"high":135,"low":122,"volume":1104,"value":102},{"date":"2012-11-25T18:30:00.000Z","open":128,"close":128,"high":130,"low":126,"volume":390,"value":122}]},

    { id:'ripple',coin: 'Ripple', price: '9.1', HRchange: '11.21%', dayChange: '11.21%', Hrvolume:'$16,288,423,566', marketCap:'$17,288,423,566', hrhigh:'$17,784', hrlow:'$17,784', description: [{"date":"2012-10-26T18:30:00.000Z","open":125,"close":134,"high":134,"low":123,"volume":316,"value":113},{"date":"2012-10-27T18:30:00.000Z","open":104,"close":105,"high":105,"low":100,"volume":1049,"value":117},{"date":"2012-10-28T18:30:00.000Z","open":118,"close":124,"high":125,"low":117,"volume":584,"value":118},{"date":"2012-10-29T18:30:00.000Z","open":103,"close":106,"high":107,"low":98,"volume":305,"value":117},{"date":"2012-10-30T18:30:00.000Z","open":113,"close":117,"high":119,"low":108,"volume":496,"value":126},{"date":"2012-10-31T18:30:00.000Z","open":115,"close":123,"high":124,"low":112,"volume":585,"value":125},{"date":"2012-11-01T18:30:00.000Z","open":105,"close":110,"high":111,"low":102,"volume":741,"value":127},{"date":"2012-11-02T18:30:00.000Z","open":116,"close":118,"high":119,"low":113,"volume":796,"value":110},{"date":"2012-11-03T18:30:00.000Z","open":122,"close":124,"high":126,"low":119,"volume":132,"value":118},{"date":"2012-11-04T18:30:00.000Z","open":113,"close":121,"high":121,"low":108,"volume":110,"value":130},{"date":"2012-11-05T18:30:00.000Z","open":110,"close":114,"high":118,"low":109,"volume":238,"value":116},{"date":"2012-11-06T18:30:00.000Z","open":115,"close":118,"high":120,"low":114,"volume":831,"value":108},{"date":"2012-11-07T18:30:00.000Z","open":109,"close":104,"high":113,"low":104,"volume":641,"value":113},{"date":"2012-11-08T18:30:00.000Z","open":118,"close":126,"high":129,"low":118,"volume":287,"value":116},{"date":"2012-11-09T18:30:00.000Z","open":122,"close":127,"high":132,"low":120,"volume":1095,"value":113},{"date":"2012-11-10T18:30:00.000Z","open":104,"close":101,"high":105,"low":99,"volume":435,"value":124},{"date":"2012-11-11T18:30:00.000Z","open":109,"close":123,"high":127,"low":108,"volume":886,"value":103},{"date":"2012-11-12T18:30:00.000Z","open":116,"close":128,"high":128,"low":114,"volume":470,"value":117},{"date":"2012-11-13T18:30:00.000Z","open":109,"close":110,"high":110,"low":108,"volume":267,"value":119},{"date":"2012-11-14T18:30:00.000Z","open":116,"close":125,"high":127,"low":112,"volume":508,"value":129},{"date":"2012-11-15T18:30:00.000Z","open":119,"close":132,"high":135,"low":116,"volume":1025,"value":121},{"date":"2012-11-16T18:30:00.000Z","open":100,"close":100,"high":101,"low":97,"volume":1092,"value":125},{"date":"2012-11-17T18:30:00.000Z","open":113,"close":119,"high":120,"low":112,"volume":303,"value":102},{"date":"2012-11-18T18:30:00.000Z","open":106,"close":109,"high":110,"low":102,"volume":716,"value":112},{"date":"2012-11-19T18:30:00.000Z","open":113,"close":114,"high":119,"low":113,"volume":860,"value":110},{"date":"2012-11-20T18:30:00.000Z","open":119,"close":125,"high":125,"low":119,"volume":206,"value":111},{"date":"2012-11-21T18:30:00.000Z","open":129,"close":127,"high":134,"low":125,"volume":975,"value":116},{"date":"2012-11-22T18:30:00.000Z","open":117,"close":119,"high":122,"low":114,"volume":184,"value":124},{"date":"2012-11-23T18:30:00.000Z","open":100,"close":108,"high":108,"low":99,"volume":502,"value":127},{"date":"2012-11-24T18:30:00.000Z","open":126,"close":135,"high":135,"low":122,"volume":1104,"value":102},{"date":"2012-11-25T18:30:00.000Z","open":128,"close":128,"high":130,"low":126,"volume":390,"value":122}]},

    { id:'btc',coin: 'Bitcoin(BTC)', price: '9.2', HRchange: '11.20%', dayChange: '11.20%', Hrvolume:'$16,288,423,566', marketCap:'$16,288,423,566', hrhigh:'$16,784', hrlow:'$16,784', description: [{"date":"2012-10-26T18:30:00.000Z","open":125,"close":134,"high":134,"low":123,"volume":316,"value":113},{"date":"2012-10-27T18:30:00.000Z","open":104,"close":105,"high":105,"low":100,"volume":1049,"value":117},{"date":"2012-10-28T18:30:00.000Z","open":118,"close":124,"high":125,"low":117,"volume":584,"value":118},{"date":"2012-10-29T18:30:00.000Z","open":103,"close":106,"high":107,"low":98,"volume":305,"value":117},{"date":"2012-10-30T18:30:00.000Z","open":113,"close":117,"high":119,"low":108,"volume":496,"value":126},{"date":"2012-10-31T18:30:00.000Z","open":115,"close":123,"high":124,"low":112,"volume":585,"value":125},{"date":"2012-11-01T18:30:00.000Z","open":105,"close":110,"high":111,"low":102,"volume":741,"value":127},{"date":"2012-11-02T18:30:00.000Z","open":116,"close":118,"high":119,"low":113,"volume":796,"value":110},{"date":"2012-11-03T18:30:00.000Z","open":122,"close":124,"high":126,"low":119,"volume":132,"value":118},{"date":"2012-11-04T18:30:00.000Z","open":113,"close":121,"high":121,"low":108,"volume":110,"value":130},{"date":"2012-11-05T18:30:00.000Z","open":110,"close":114,"high":118,"low":109,"volume":238,"value":116},{"date":"2012-11-06T18:30:00.000Z","open":115,"close":118,"high":120,"low":114,"volume":831,"value":108},{"date":"2012-11-07T18:30:00.000Z","open":109,"close":104,"high":113,"low":104,"volume":641,"value":113},{"date":"2012-11-08T18:30:00.000Z","open":118,"close":126,"high":129,"low":118,"volume":287,"value":116},{"date":"2012-11-09T18:30:00.000Z","open":122,"close":127,"high":132,"low":120,"volume":1095,"value":113},{"date":"2012-11-10T18:30:00.000Z","open":104,"close":101,"high":105,"low":99,"volume":435,"value":124},{"date":"2012-11-11T18:30:00.000Z","open":109,"close":123,"high":127,"low":108,"volume":886,"value":103},{"date":"2012-11-12T18:30:00.000Z","open":116,"close":128,"high":128,"low":114,"volume":470,"value":117},{"date":"2012-11-13T18:30:00.000Z","open":109,"close":110,"high":110,"low":108,"volume":267,"value":119},{"date":"2012-11-14T18:30:00.000Z","open":116,"close":125,"high":127,"low":112,"volume":508,"value":129},{"date":"2012-11-15T18:30:00.000Z","open":119,"close":132,"high":135,"low":116,"volume":1025,"value":121},{"date":"2012-11-16T18:30:00.000Z","open":100,"close":100,"high":101,"low":97,"volume":1092,"value":125},{"date":"2012-11-17T18:30:00.000Z","open":113,"close":119,"high":120,"low":112,"volume":303,"value":102},{"date":"2012-11-18T18:30:00.000Z","open":106,"close":109,"high":110,"low":102,"volume":716,"value":112},{"date":"2012-11-19T18:30:00.000Z","open":113,"close":114,"high":119,"low":113,"volume":860,"value":110},{"date":"2012-11-20T18:30:00.000Z","open":119,"close":125,"high":125,"low":119,"volume":206,"value":111},{"date":"2012-11-21T18:30:00.000Z","open":129,"close":127,"high":134,"low":125,"volume":975,"value":116},{"date":"2012-11-22T18:30:00.000Z","open":117,"close":119,"high":122,"low":114,"volume":184,"value":124},{"date":"2012-11-23T18:30:00.000Z","open":100,"close":108,"high":108,"low":99,"volume":502,"value":127},{"date":"2012-11-24T18:30:00.000Z","open":126,"close":135,"high":135,"low":122,"volume":1104,"value":102},{"date":"2012-11-25T18:30:00.000Z","open":128,"close":128,"high":130,"low":126,"volume":390,"value":122}]},
    
    { id:'ripple',coin: 'Ripple', price: '9.1', HRchange: '11.21%', dayChange: '11.21%', Hrvolume:'$16,288,423,566', marketCap:'$17,288,423,566', hrhigh:'$17,784', hrlow:'$17,784', description: [{"date":"2012-10-26T18:30:00.000Z","open":125,"close":134,"high":134,"low":123,"volume":316,"value":113},{"date":"2012-10-27T18:30:00.000Z","open":104,"close":105,"high":105,"low":100,"volume":1049,"value":117},{"date":"2012-10-28T18:30:00.000Z","open":118,"close":124,"high":125,"low":117,"volume":584,"value":118},{"date":"2012-10-29T18:30:00.000Z","open":103,"close":106,"high":107,"low":98,"volume":305,"value":117},{"date":"2012-10-30T18:30:00.000Z","open":113,"close":117,"high":119,"low":108,"volume":496,"value":126},{"date":"2012-10-31T18:30:00.000Z","open":115,"close":123,"high":124,"low":112,"volume":585,"value":125},{"date":"2012-11-01T18:30:00.000Z","open":105,"close":110,"high":111,"low":102,"volume":741,"value":127},{"date":"2012-11-02T18:30:00.000Z","open":116,"close":118,"high":119,"low":113,"volume":796,"value":110},{"date":"2012-11-03T18:30:00.000Z","open":122,"close":124,"high":126,"low":119,"volume":132,"value":118},{"date":"2012-11-04T18:30:00.000Z","open":113,"close":121,"high":121,"low":108,"volume":110,"value":130},{"date":"2012-11-05T18:30:00.000Z","open":110,"close":114,"high":118,"low":109,"volume":238,"value":116},{"date":"2012-11-06T18:30:00.000Z","open":115,"close":118,"high":120,"low":114,"volume":831,"value":108},{"date":"2012-11-07T18:30:00.000Z","open":109,"close":104,"high":113,"low":104,"volume":641,"value":113},{"date":"2012-11-08T18:30:00.000Z","open":118,"close":126,"high":129,"low":118,"volume":287,"value":116},{"date":"2012-11-09T18:30:00.000Z","open":122,"close":127,"high":132,"low":120,"volume":1095,"value":113},{"date":"2012-11-10T18:30:00.000Z","open":104,"close":101,"high":105,"low":99,"volume":435,"value":124},{"date":"2012-11-11T18:30:00.000Z","open":109,"close":123,"high":127,"low":108,"volume":886,"value":103},{"date":"2012-11-12T18:30:00.000Z","open":116,"close":128,"high":128,"low":114,"volume":470,"value":117},{"date":"2012-11-13T18:30:00.000Z","open":109,"close":110,"high":110,"low":108,"volume":267,"value":119},{"date":"2012-11-14T18:30:00.000Z","open":116,"close":125,"high":127,"low":112,"volume":508,"value":129},{"date":"2012-11-15T18:30:00.000Z","open":119,"close":132,"high":135,"low":116,"volume":1025,"value":121},{"date":"2012-11-16T18:30:00.000Z","open":100,"close":100,"high":101,"low":97,"volume":1092,"value":125},{"date":"2012-11-17T18:30:00.000Z","open":113,"close":119,"high":120,"low":112,"volume":303,"value":102},{"date":"2012-11-18T18:30:00.000Z","open":106,"close":109,"high":110,"low":102,"volume":716,"value":112},{"date":"2012-11-19T18:30:00.000Z","open":113,"close":114,"high":119,"low":113,"volume":860,"value":110},{"date":"2012-11-20T18:30:00.000Z","open":119,"close":125,"high":125,"low":119,"volume":206,"value":111},{"date":"2012-11-21T18:30:00.000Z","open":129,"close":127,"high":134,"low":125,"volume":975,"value":116},{"date":"2012-11-22T18:30:00.000Z","open":117,"close":119,"high":122,"low":114,"volume":184,"value":124},{"date":"2012-11-23T18:30:00.000Z","open":100,"close":108,"high":108,"low":99,"volume":502,"value":127},{"date":"2012-11-24T18:30:00.000Z","open":126,"close":135,"high":135,"low":122,"volume":1104,"value":102},{"date":"2012-11-25T18:30:00.000Z","open":128,"close":128,"high":130,"low":126,"volume":390,"value":122}]},

    { id:'btc',coin: 'Bitcoin(BTC)', price: '9.2', HRchange: '11.20%', dayChange: '11.20%', Hrvolume:'$16,288,423,566', marketCap:'$16,288,423,566', hrhigh:'$16,784', hrlow:'$16,784', description: [{"date":"2012-10-26T18:30:00.000Z","open":125,"close":134,"high":134,"low":123,"volume":316,"value":113},{"date":"2012-10-27T18:30:00.000Z","open":104,"close":105,"high":105,"low":100,"volume":1049,"value":117},{"date":"2012-10-28T18:30:00.000Z","open":118,"close":124,"high":125,"low":117,"volume":584,"value":118},{"date":"2012-10-29T18:30:00.000Z","open":103,"close":106,"high":107,"low":98,"volume":305,"value":117},{"date":"2012-10-30T18:30:00.000Z","open":113,"close":117,"high":119,"low":108,"volume":496,"value":126},{"date":"2012-10-31T18:30:00.000Z","open":115,"close":123,"high":124,"low":112,"volume":585,"value":125},{"date":"2012-11-01T18:30:00.000Z","open":105,"close":110,"high":111,"low":102,"volume":741,"value":127},{"date":"2012-11-02T18:30:00.000Z","open":116,"close":118,"high":119,"low":113,"volume":796,"value":110},{"date":"2012-11-03T18:30:00.000Z","open":122,"close":124,"high":126,"low":119,"volume":132,"value":118},{"date":"2012-11-04T18:30:00.000Z","open":113,"close":121,"high":121,"low":108,"volume":110,"value":130},{"date":"2012-11-05T18:30:00.000Z","open":110,"close":114,"high":118,"low":109,"volume":238,"value":116},{"date":"2012-11-06T18:30:00.000Z","open":115,"close":118,"high":120,"low":114,"volume":831,"value":108},{"date":"2012-11-07T18:30:00.000Z","open":109,"close":104,"high":113,"low":104,"volume":641,"value":113},{"date":"2012-11-08T18:30:00.000Z","open":118,"close":126,"high":129,"low":118,"volume":287,"value":116},{"date":"2012-11-09T18:30:00.000Z","open":122,"close":127,"high":132,"low":120,"volume":1095,"value":113},{"date":"2012-11-10T18:30:00.000Z","open":104,"close":101,"high":105,"low":99,"volume":435,"value":124},{"date":"2012-11-11T18:30:00.000Z","open":109,"close":123,"high":127,"low":108,"volume":886,"value":103},{"date":"2012-11-12T18:30:00.000Z","open":116,"close":128,"high":128,"low":114,"volume":470,"value":117},{"date":"2012-11-13T18:30:00.000Z","open":109,"close":110,"high":110,"low":108,"volume":267,"value":119},{"date":"2012-11-14T18:30:00.000Z","open":116,"close":125,"high":127,"low":112,"volume":508,"value":129},{"date":"2012-11-15T18:30:00.000Z","open":119,"close":132,"high":135,"low":116,"volume":1025,"value":121},{"date":"2012-11-16T18:30:00.000Z","open":100,"close":100,"high":101,"low":97,"volume":1092,"value":125},{"date":"2012-11-17T18:30:00.000Z","open":113,"close":119,"high":120,"low":112,"volume":303,"value":102},{"date":"2012-11-18T18:30:00.000Z","open":106,"close":109,"high":110,"low":102,"volume":716,"value":112},{"date":"2012-11-19T18:30:00.000Z","open":113,"close":114,"high":119,"low":113,"volume":860,"value":110},{"date":"2012-11-20T18:30:00.000Z","open":119,"close":125,"high":125,"low":119,"volume":206,"value":111},{"date":"2012-11-21T18:30:00.000Z","open":129,"close":127,"high":134,"low":125,"volume":975,"value":116},{"date":"2012-11-22T18:30:00.000Z","open":117,"close":119,"high":122,"low":114,"volume":184,"value":124},{"date":"2012-11-23T18:30:00.000Z","open":100,"close":108,"high":108,"low":99,"volume":502,"value":127},{"date":"2012-11-24T18:30:00.000Z","open":126,"close":135,"high":135,"low":122,"volume":1104,"value":102},{"date":"2012-11-25T18:30:00.000Z","open":128,"close":128,"high":130,"low":126,"volume":390,"value":122}]},
    
    { id:'ripple',coin: 'Ripple', price: '9.1', HRchange: '11.21%', dayChange: '11.21%', Hrvolume:'$16,288,423,566', marketCap:'$17,288,423,566', hrhigh:'$17,784', hrlow:'$17,784', description: [{"date":"2012-10-26T18:30:00.000Z","open":125,"close":134,"high":134,"low":123,"volume":316,"value":113},{"date":"2012-10-27T18:30:00.000Z","open":104,"close":105,"high":105,"low":100,"volume":1049,"value":117},{"date":"2012-10-28T18:30:00.000Z","open":118,"close":124,"high":125,"low":117,"volume":584,"value":118},{"date":"2012-10-29T18:30:00.000Z","open":103,"close":106,"high":107,"low":98,"volume":305,"value":117},{"date":"2012-10-30T18:30:00.000Z","open":113,"close":117,"high":119,"low":108,"volume":496,"value":126},{"date":"2012-10-31T18:30:00.000Z","open":115,"close":123,"high":124,"low":112,"volume":585,"value":125},{"date":"2012-11-01T18:30:00.000Z","open":105,"close":110,"high":111,"low":102,"volume":741,"value":127},{"date":"2012-11-02T18:30:00.000Z","open":116,"close":118,"high":119,"low":113,"volume":796,"value":110},{"date":"2012-11-03T18:30:00.000Z","open":122,"close":124,"high":126,"low":119,"volume":132,"value":118},{"date":"2012-11-04T18:30:00.000Z","open":113,"close":121,"high":121,"low":108,"volume":110,"value":130},{"date":"2012-11-05T18:30:00.000Z","open":110,"close":114,"high":118,"low":109,"volume":238,"value":116},{"date":"2012-11-06T18:30:00.000Z","open":115,"close":118,"high":120,"low":114,"volume":831,"value":108},{"date":"2012-11-07T18:30:00.000Z","open":109,"close":104,"high":113,"low":104,"volume":641,"value":113},{"date":"2012-11-08T18:30:00.000Z","open":118,"close":126,"high":129,"low":118,"volume":287,"value":116},{"date":"2012-11-09T18:30:00.000Z","open":122,"close":127,"high":132,"low":120,"volume":1095,"value":113},{"date":"2012-11-10T18:30:00.000Z","open":104,"close":101,"high":105,"low":99,"volume":435,"value":124},{"date":"2012-11-11T18:30:00.000Z","open":109,"close":123,"high":127,"low":108,"volume":886,"value":103},{"date":"2012-11-12T18:30:00.000Z","open":116,"close":128,"high":128,"low":114,"volume":470,"value":117},{"date":"2012-11-13T18:30:00.000Z","open":109,"close":110,"high":110,"low":108,"volume":267,"value":119},{"date":"2012-11-14T18:30:00.000Z","open":116,"close":125,"high":127,"low":112,"volume":508,"value":129},{"date":"2012-11-15T18:30:00.000Z","open":119,"close":132,"high":135,"low":116,"volume":1025,"value":121},{"date":"2012-11-16T18:30:00.000Z","open":100,"close":100,"high":101,"low":97,"volume":1092,"value":125},{"date":"2012-11-17T18:30:00.000Z","open":113,"close":119,"high":120,"low":112,"volume":303,"value":102},{"date":"2012-11-18T18:30:00.000Z","open":106,"close":109,"high":110,"low":102,"volume":716,"value":112},{"date":"2012-11-19T18:30:00.000Z","open":113,"close":114,"high":119,"low":113,"volume":860,"value":110},{"date":"2012-11-20T18:30:00.000Z","open":119,"close":125,"high":125,"low":119,"volume":206,"value":111},{"date":"2012-11-21T18:30:00.000Z","open":129,"close":127,"high":134,"low":125,"volume":975,"value":116},{"date":"2012-11-22T18:30:00.000Z","open":117,"close":119,"high":122,"low":114,"volume":184,"value":124},{"date":"2012-11-23T18:30:00.000Z","open":100,"close":108,"high":108,"low":99,"volume":502,"value":127},{"date":"2012-11-24T18:30:00.000Z","open":126,"close":135,"high":135,"low":122,"volume":1104,"value":102},{"date":"2012-11-25T18:30:00.000Z","open":128,"close":128,"high":130,"low":126,"volume":390,"value":122}]},

    { id:'btc',coin: 'Bitcoin(BTC)', price: '9.2', HRchange: '11.20%', dayChange: '11.20%', Hrvolume:'$16,288,423,566', marketCap:'$16,288,423,566', hrhigh:'$16,784', hrlow:'$16,784', description: [{"date":"2012-10-26T18:30:00.000Z","open":125,"close":134,"high":134,"low":123,"volume":316,"value":113},{"date":"2012-10-27T18:30:00.000Z","open":104,"close":105,"high":105,"low":100,"volume":1049,"value":117},{"date":"2012-10-28T18:30:00.000Z","open":118,"close":124,"high":125,"low":117,"volume":584,"value":118},{"date":"2012-10-29T18:30:00.000Z","open":103,"close":106,"high":107,"low":98,"volume":305,"value":117},{"date":"2012-10-30T18:30:00.000Z","open":113,"close":117,"high":119,"low":108,"volume":496,"value":126},{"date":"2012-10-31T18:30:00.000Z","open":115,"close":123,"high":124,"low":112,"volume":585,"value":125},{"date":"2012-11-01T18:30:00.000Z","open":105,"close":110,"high":111,"low":102,"volume":741,"value":127},{"date":"2012-11-02T18:30:00.000Z","open":116,"close":118,"high":119,"low":113,"volume":796,"value":110},{"date":"2012-11-03T18:30:00.000Z","open":122,"close":124,"high":126,"low":119,"volume":132,"value":118},{"date":"2012-11-04T18:30:00.000Z","open":113,"close":121,"high":121,"low":108,"volume":110,"value":130},{"date":"2012-11-05T18:30:00.000Z","open":110,"close":114,"high":118,"low":109,"volume":238,"value":116},{"date":"2012-11-06T18:30:00.000Z","open":115,"close":118,"high":120,"low":114,"volume":831,"value":108},{"date":"2012-11-07T18:30:00.000Z","open":109,"close":104,"high":113,"low":104,"volume":641,"value":113},{"date":"2012-11-08T18:30:00.000Z","open":118,"close":126,"high":129,"low":118,"volume":287,"value":116},{"date":"2012-11-09T18:30:00.000Z","open":122,"close":127,"high":132,"low":120,"volume":1095,"value":113},{"date":"2012-11-10T18:30:00.000Z","open":104,"close":101,"high":105,"low":99,"volume":435,"value":124},{"date":"2012-11-11T18:30:00.000Z","open":109,"close":123,"high":127,"low":108,"volume":886,"value":103},{"date":"2012-11-12T18:30:00.000Z","open":116,"close":128,"high":128,"low":114,"volume":470,"value":117},{"date":"2012-11-13T18:30:00.000Z","open":109,"close":110,"high":110,"low":108,"volume":267,"value":119},{"date":"2012-11-14T18:30:00.000Z","open":116,"close":125,"high":127,"low":112,"volume":508,"value":129},{"date":"2012-11-15T18:30:00.000Z","open":119,"close":132,"high":135,"low":116,"volume":1025,"value":121},{"date":"2012-11-16T18:30:00.000Z","open":100,"close":100,"high":101,"low":97,"volume":1092,"value":125},{"date":"2012-11-17T18:30:00.000Z","open":113,"close":119,"high":120,"low":112,"volume":303,"value":102},{"date":"2012-11-18T18:30:00.000Z","open":106,"close":109,"high":110,"low":102,"volume":716,"value":112},{"date":"2012-11-19T18:30:00.000Z","open":113,"close":114,"high":119,"low":113,"volume":860,"value":110},{"date":"2012-11-20T18:30:00.000Z","open":119,"close":125,"high":125,"low":119,"volume":206,"value":111},{"date":"2012-11-21T18:30:00.000Z","open":129,"close":127,"high":134,"low":125,"volume":975,"value":116},{"date":"2012-11-22T18:30:00.000Z","open":117,"close":119,"high":122,"low":114,"volume":184,"value":124},{"date":"2012-11-23T18:30:00.000Z","open":100,"close":108,"high":108,"low":99,"volume":502,"value":127},{"date":"2012-11-24T18:30:00.000Z","open":126,"close":135,"high":135,"low":122,"volume":1104,"value":102},{"date":"2012-11-25T18:30:00.000Z","open":128,"close":128,"high":130,"low":126,"volume":390,"value":122}]},

    { id:'ripple',coin: 'Ripple', price: '9.1', HRchange: '11.21%', dayChange: '11.21%', Hrvolume:'$16,288,423,566', marketCap:'$17,288,423,566', hrhigh:'$17,784', hrlow:'$17,784', description: [{"date":"2012-10-26T18:30:00.000Z","open":125,"close":134,"high":134,"low":123,"volume":316,"value":113},{"date":"2012-10-27T18:30:00.000Z","open":104,"close":105,"high":105,"low":100,"volume":1049,"value":117},{"date":"2012-10-28T18:30:00.000Z","open":118,"close":124,"high":125,"low":117,"volume":584,"value":118},{"date":"2012-10-29T18:30:00.000Z","open":103,"close":106,"high":107,"low":98,"volume":305,"value":117},{"date":"2012-10-30T18:30:00.000Z","open":113,"close":117,"high":119,"low":108,"volume":496,"value":126},{"date":"2012-10-31T18:30:00.000Z","open":115,"close":123,"high":124,"low":112,"volume":585,"value":125},{"date":"2012-11-01T18:30:00.000Z","open":105,"close":110,"high":111,"low":102,"volume":741,"value":127},{"date":"2012-11-02T18:30:00.000Z","open":116,"close":118,"high":119,"low":113,"volume":796,"value":110},{"date":"2012-11-03T18:30:00.000Z","open":122,"close":124,"high":126,"low":119,"volume":132,"value":118},{"date":"2012-11-04T18:30:00.000Z","open":113,"close":121,"high":121,"low":108,"volume":110,"value":130},{"date":"2012-11-05T18:30:00.000Z","open":110,"close":114,"high":118,"low":109,"volume":238,"value":116},{"date":"2012-11-06T18:30:00.000Z","open":115,"close":118,"high":120,"low":114,"volume":831,"value":108},{"date":"2012-11-07T18:30:00.000Z","open":109,"close":104,"high":113,"low":104,"volume":641,"value":113},{"date":"2012-11-08T18:30:00.000Z","open":118,"close":126,"high":129,"low":118,"volume":287,"value":116},{"date":"2012-11-09T18:30:00.000Z","open":122,"close":127,"high":132,"low":120,"volume":1095,"value":113},{"date":"2012-11-10T18:30:00.000Z","open":104,"close":101,"high":105,"low":99,"volume":435,"value":124},{"date":"2012-11-11T18:30:00.000Z","open":109,"close":123,"high":127,"low":108,"volume":886,"value":103},{"date":"2012-11-12T18:30:00.000Z","open":116,"close":128,"high":128,"low":114,"volume":470,"value":117},{"date":"2012-11-13T18:30:00.000Z","open":109,"close":110,"high":110,"low":108,"volume":267,"value":119},{"date":"2012-11-14T18:30:00.000Z","open":116,"close":125,"high":127,"low":112,"volume":508,"value":129},{"date":"2012-11-15T18:30:00.000Z","open":119,"close":132,"high":135,"low":116,"volume":1025,"value":121},{"date":"2012-11-16T18:30:00.000Z","open":100,"close":100,"high":101,"low":97,"volume":1092,"value":125},{"date":"2012-11-17T18:30:00.000Z","open":113,"close":119,"high":120,"low":112,"volume":303,"value":102},{"date":"2012-11-18T18:30:00.000Z","open":106,"close":109,"high":110,"low":102,"volume":716,"value":112},{"date":"2012-11-19T18:30:00.000Z","open":113,"close":114,"high":119,"low":113,"volume":860,"value":110},{"date":"2012-11-20T18:30:00.000Z","open":119,"close":125,"high":125,"low":119,"volume":206,"value":111},{"date":"2012-11-21T18:30:00.000Z","open":129,"close":127,"high":134,"low":125,"volume":975,"value":116},{"date":"2012-11-22T18:30:00.000Z","open":117,"close":119,"high":122,"low":114,"volume":184,"value":124},{"date":"2012-11-23T18:30:00.000Z","open":100,"close":108,"high":108,"low":99,"volume":502,"value":127},{"date":"2012-11-24T18:30:00.000Z","open":126,"close":135,"high":135,"low":122,"volume":1104,"value":102},{"date":"2012-11-25T18:30:00.000Z","open":128,"close":128,"high":130,"low":126,"volume":390,"value":122}]},

    { id:'btc',coin: 'Bitcoin(BTC)', price: '9.2', HRchange: '11.20%', dayChange: '11.20%', Hrvolume:'$16,288,423,566', marketCap:'$16,288,423,566', hrhigh:'$16,784', hrlow:'$16,784', description: [{"date":"2012-10-26T18:30:00.000Z","open":125,"close":134,"high":134,"low":123,"volume":316,"value":113},{"date":"2012-10-27T18:30:00.000Z","open":104,"close":105,"high":105,"low":100,"volume":1049,"value":117},{"date":"2012-10-28T18:30:00.000Z","open":118,"close":124,"high":125,"low":117,"volume":584,"value":118},{"date":"2012-10-29T18:30:00.000Z","open":103,"close":106,"high":107,"low":98,"volume":305,"value":117},{"date":"2012-10-30T18:30:00.000Z","open":113,"close":117,"high":119,"low":108,"volume":496,"value":126},{"date":"2012-10-31T18:30:00.000Z","open":115,"close":123,"high":124,"low":112,"volume":585,"value":125},{"date":"2012-11-01T18:30:00.000Z","open":105,"close":110,"high":111,"low":102,"volume":741,"value":127},{"date":"2012-11-02T18:30:00.000Z","open":116,"close":118,"high":119,"low":113,"volume":796,"value":110},{"date":"2012-11-03T18:30:00.000Z","open":122,"close":124,"high":126,"low":119,"volume":132,"value":118},{"date":"2012-11-04T18:30:00.000Z","open":113,"close":121,"high":121,"low":108,"volume":110,"value":130},{"date":"2012-11-05T18:30:00.000Z","open":110,"close":114,"high":118,"low":109,"volume":238,"value":116},{"date":"2012-11-06T18:30:00.000Z","open":115,"close":118,"high":120,"low":114,"volume":831,"value":108},{"date":"2012-11-07T18:30:00.000Z","open":109,"close":104,"high":113,"low":104,"volume":641,"value":113},{"date":"2012-11-08T18:30:00.000Z","open":118,"close":126,"high":129,"low":118,"volume":287,"value":116},{"date":"2012-11-09T18:30:00.000Z","open":122,"close":127,"high":132,"low":120,"volume":1095,"value":113},{"date":"2012-11-10T18:30:00.000Z","open":104,"close":101,"high":105,"low":99,"volume":435,"value":124},{"date":"2012-11-11T18:30:00.000Z","open":109,"close":123,"high":127,"low":108,"volume":886,"value":103},{"date":"2012-11-12T18:30:00.000Z","open":116,"close":128,"high":128,"low":114,"volume":470,"value":117},{"date":"2012-11-13T18:30:00.000Z","open":109,"close":110,"high":110,"low":108,"volume":267,"value":119},{"date":"2012-11-14T18:30:00.000Z","open":116,"close":125,"high":127,"low":112,"volume":508,"value":129},{"date":"2012-11-15T18:30:00.000Z","open":119,"close":132,"high":135,"low":116,"volume":1025,"value":121},{"date":"2012-11-16T18:30:00.000Z","open":100,"close":100,"high":101,"low":97,"volume":1092,"value":125},{"date":"2012-11-17T18:30:00.000Z","open":113,"close":119,"high":120,"low":112,"volume":303,"value":102},{"date":"2012-11-18T18:30:00.000Z","open":106,"close":109,"high":110,"low":102,"volume":716,"value":112},{"date":"2012-11-19T18:30:00.000Z","open":113,"close":114,"high":119,"low":113,"volume":860,"value":110},{"date":"2012-11-20T18:30:00.000Z","open":119,"close":125,"high":125,"low":119,"volume":206,"value":111},{"date":"2012-11-21T18:30:00.000Z","open":129,"close":127,"high":134,"low":125,"volume":975,"value":116},{"date":"2012-11-22T18:30:00.000Z","open":117,"close":119,"high":122,"low":114,"volume":184,"value":124},{"date":"2012-11-23T18:30:00.000Z","open":100,"close":108,"high":108,"low":99,"volume":502,"value":127},{"date":"2012-11-24T18:30:00.000Z","open":126,"close":135,"high":135,"low":122,"volume":1104,"value":102},{"date":"2012-11-25T18:30:00.000Z","open":128,"close":128,"high":130,"low":126,"volume":390,"value":122}]},
    
    { id:'ripple',coin: 'Ripple', price: '9.1', HRchange: '11.21%', dayChange: '11.21%', Hrvolume:'$16,288,423,566', marketCap:'$17,288,423,566', hrhigh:'$17,784', hrlow:'$17,784', description: [{"date":"2012-10-26T18:30:00.000Z","open":125,"close":134,"high":134,"low":123,"volume":316,"value":113},{"date":"2012-10-27T18:30:00.000Z","open":104,"close":105,"high":105,"low":100,"volume":1049,"value":117},{"date":"2012-10-28T18:30:00.000Z","open":118,"close":124,"high":125,"low":117,"volume":584,"value":118},{"date":"2012-10-29T18:30:00.000Z","open":103,"close":106,"high":107,"low":98,"volume":305,"value":117},{"date":"2012-10-30T18:30:00.000Z","open":113,"close":117,"high":119,"low":108,"volume":496,"value":126},{"date":"2012-10-31T18:30:00.000Z","open":115,"close":123,"high":124,"low":112,"volume":585,"value":125},{"date":"2012-11-01T18:30:00.000Z","open":105,"close":110,"high":111,"low":102,"volume":741,"value":127},{"date":"2012-11-02T18:30:00.000Z","open":116,"close":118,"high":119,"low":113,"volume":796,"value":110},{"date":"2012-11-03T18:30:00.000Z","open":122,"close":124,"high":126,"low":119,"volume":132,"value":118},{"date":"2012-11-04T18:30:00.000Z","open":113,"close":121,"high":121,"low":108,"volume":110,"value":130},{"date":"2012-11-05T18:30:00.000Z","open":110,"close":114,"high":118,"low":109,"volume":238,"value":116},{"date":"2012-11-06T18:30:00.000Z","open":115,"close":118,"high":120,"low":114,"volume":831,"value":108},{"date":"2012-11-07T18:30:00.000Z","open":109,"close":104,"high":113,"low":104,"volume":641,"value":113},{"date":"2012-11-08T18:30:00.000Z","open":118,"close":126,"high":129,"low":118,"volume":287,"value":116},{"date":"2012-11-09T18:30:00.000Z","open":122,"close":127,"high":132,"low":120,"volume":1095,"value":113},{"date":"2012-11-10T18:30:00.000Z","open":104,"close":101,"high":105,"low":99,"volume":435,"value":124},{"date":"2012-11-11T18:30:00.000Z","open":109,"close":123,"high":127,"low":108,"volume":886,"value":103},{"date":"2012-11-12T18:30:00.000Z","open":116,"close":128,"high":128,"low":114,"volume":470,"value":117},{"date":"2012-11-13T18:30:00.000Z","open":109,"close":110,"high":110,"low":108,"volume":267,"value":119},{"date":"2012-11-14T18:30:00.000Z","open":116,"close":125,"high":127,"low":112,"volume":508,"value":129},{"date":"2012-11-15T18:30:00.000Z","open":119,"close":132,"high":135,"low":116,"volume":1025,"value":121},{"date":"2012-11-16T18:30:00.000Z","open":100,"close":100,"high":101,"low":97,"volume":1092,"value":125},{"date":"2012-11-17T18:30:00.000Z","open":113,"close":119,"high":120,"low":112,"volume":303,"value":102},{"date":"2012-11-18T18:30:00.000Z","open":106,"close":109,"high":110,"low":102,"volume":716,"value":112},{"date":"2012-11-19T18:30:00.000Z","open":113,"close":114,"high":119,"low":113,"volume":860,"value":110},{"date":"2012-11-20T18:30:00.000Z","open":119,"close":125,"high":125,"low":119,"volume":206,"value":111},{"date":"2012-11-21T18:30:00.000Z","open":129,"close":127,"high":134,"low":125,"volume":975,"value":116},{"date":"2012-11-22T18:30:00.000Z","open":117,"close":119,"high":122,"low":114,"volume":184,"value":124},{"date":"2012-11-23T18:30:00.000Z","open":100,"close":108,"high":108,"low":99,"volume":502,"value":127},{"date":"2012-11-24T18:30:00.000Z","open":126,"close":135,"high":135,"low":122,"volume":1104,"value":102},{"date":"2012-11-25T18:30:00.000Z","open":128,"close":128,"high":130,"low":126,"volume":390,"value":122}]},

    { id:'btc',coin: 'Bitcoin(BTC)', price: '9.2', HRchange: '11.20%', dayChange: '11.20%', Hrvolume:'$16,288,423,566', marketCap:'$16,288,423,566', hrhigh:'$16,784', hrlow:'$16,784', description: [{"date":"2012-10-26T18:30:00.000Z","open":125,"close":134,"high":134,"low":123,"volume":316,"value":113},{"date":"2012-10-27T18:30:00.000Z","open":104,"close":105,"high":105,"low":100,"volume":1049,"value":117},{"date":"2012-10-28T18:30:00.000Z","open":118,"close":124,"high":125,"low":117,"volume":584,"value":118},{"date":"2012-10-29T18:30:00.000Z","open":103,"close":106,"high":107,"low":98,"volume":305,"value":117},{"date":"2012-10-30T18:30:00.000Z","open":113,"close":117,"high":119,"low":108,"volume":496,"value":126},{"date":"2012-10-31T18:30:00.000Z","open":115,"close":123,"high":124,"low":112,"volume":585,"value":125},{"date":"2012-11-01T18:30:00.000Z","open":105,"close":110,"high":111,"low":102,"volume":741,"value":127},{"date":"2012-11-02T18:30:00.000Z","open":116,"close":118,"high":119,"low":113,"volume":796,"value":110},{"date":"2012-11-03T18:30:00.000Z","open":122,"close":124,"high":126,"low":119,"volume":132,"value":118},{"date":"2012-11-04T18:30:00.000Z","open":113,"close":121,"high":121,"low":108,"volume":110,"value":130},{"date":"2012-11-05T18:30:00.000Z","open":110,"close":114,"high":118,"low":109,"volume":238,"value":116},{"date":"2012-11-06T18:30:00.000Z","open":115,"close":118,"high":120,"low":114,"volume":831,"value":108},{"date":"2012-11-07T18:30:00.000Z","open":109,"close":104,"high":113,"low":104,"volume":641,"value":113},{"date":"2012-11-08T18:30:00.000Z","open":118,"close":126,"high":129,"low":118,"volume":287,"value":116},{"date":"2012-11-09T18:30:00.000Z","open":122,"close":127,"high":132,"low":120,"volume":1095,"value":113},{"date":"2012-11-10T18:30:00.000Z","open":104,"close":101,"high":105,"low":99,"volume":435,"value":124},{"date":"2012-11-11T18:30:00.000Z","open":109,"close":123,"high":127,"low":108,"volume":886,"value":103},{"date":"2012-11-12T18:30:00.000Z","open":116,"close":128,"high":128,"low":114,"volume":470,"value":117},{"date":"2012-11-13T18:30:00.000Z","open":109,"close":110,"high":110,"low":108,"volume":267,"value":119},{"date":"2012-11-14T18:30:00.000Z","open":116,"close":125,"high":127,"low":112,"volume":508,"value":129},{"date":"2012-11-15T18:30:00.000Z","open":119,"close":132,"high":135,"low":116,"volume":1025,"value":121},{"date":"2012-11-16T18:30:00.000Z","open":100,"close":100,"high":101,"low":97,"volume":1092,"value":125},{"date":"2012-11-17T18:30:00.000Z","open":113,"close":119,"high":120,"low":112,"volume":303,"value":102},{"date":"2012-11-18T18:30:00.000Z","open":106,"close":109,"high":110,"low":102,"volume":716,"value":112},{"date":"2012-11-19T18:30:00.000Z","open":113,"close":114,"high":119,"low":113,"volume":860,"value":110},{"date":"2012-11-20T18:30:00.000Z","open":119,"close":125,"high":125,"low":119,"volume":206,"value":111},{"date":"2012-11-21T18:30:00.000Z","open":129,"close":127,"high":134,"low":125,"volume":975,"value":116},{"date":"2012-11-22T18:30:00.000Z","open":117,"close":119,"high":122,"low":114,"volume":184,"value":124},{"date":"2012-11-23T18:30:00.000Z","open":100,"close":108,"high":108,"low":99,"volume":502,"value":127},{"date":"2012-11-24T18:30:00.000Z","open":126,"close":135,"high":135,"low":122,"volume":1104,"value":102},{"date":"2012-11-25T18:30:00.000Z","open":128,"close":128,"high":130,"low":126,"volume":390,"value":122}]},
    
    { id:'ripple',coin: 'Ripple', price: '9.1', HRchange: '11.21%', dayChange: '11.21%', Hrvolume:'$16,288,423,566', marketCap:'$17,288,423,566', hrhigh:'$17,784', hrlow:'$17,784', description: [{"date":"2012-10-26T18:30:00.000Z","open":125,"close":134,"high":134,"low":123,"volume":316,"value":113},{"date":"2012-10-27T18:30:00.000Z","open":104,"close":105,"high":105,"low":100,"volume":1049,"value":117},{"date":"2012-10-28T18:30:00.000Z","open":118,"close":124,"high":125,"low":117,"volume":584,"value":118},{"date":"2012-10-29T18:30:00.000Z","open":103,"close":106,"high":107,"low":98,"volume":305,"value":117},{"date":"2012-10-30T18:30:00.000Z","open":113,"close":117,"high":119,"low":108,"volume":496,"value":126},{"date":"2012-10-31T18:30:00.000Z","open":115,"close":123,"high":124,"low":112,"volume":585,"value":125},{"date":"2012-11-01T18:30:00.000Z","open":105,"close":110,"high":111,"low":102,"volume":741,"value":127},{"date":"2012-11-02T18:30:00.000Z","open":116,"close":118,"high":119,"low":113,"volume":796,"value":110},{"date":"2012-11-03T18:30:00.000Z","open":122,"close":124,"high":126,"low":119,"volume":132,"value":118},{"date":"2012-11-04T18:30:00.000Z","open":113,"close":121,"high":121,"low":108,"volume":110,"value":130},{"date":"2012-11-05T18:30:00.000Z","open":110,"close":114,"high":118,"low":109,"volume":238,"value":116},{"date":"2012-11-06T18:30:00.000Z","open":115,"close":118,"high":120,"low":114,"volume":831,"value":108},{"date":"2012-11-07T18:30:00.000Z","open":109,"close":104,"high":113,"low":104,"volume":641,"value":113},{"date":"2012-11-08T18:30:00.000Z","open":118,"close":126,"high":129,"low":118,"volume":287,"value":116},{"date":"2012-11-09T18:30:00.000Z","open":122,"close":127,"high":132,"low":120,"volume":1095,"value":113},{"date":"2012-11-10T18:30:00.000Z","open":104,"close":101,"high":105,"low":99,"volume":435,"value":124},{"date":"2012-11-11T18:30:00.000Z","open":109,"close":123,"high":127,"low":108,"volume":886,"value":103},{"date":"2012-11-12T18:30:00.000Z","open":116,"close":128,"high":128,"low":114,"volume":470,"value":117},{"date":"2012-11-13T18:30:00.000Z","open":109,"close":110,"high":110,"low":108,"volume":267,"value":119},{"date":"2012-11-14T18:30:00.000Z","open":116,"close":125,"high":127,"low":112,"volume":508,"value":129},{"date":"2012-11-15T18:30:00.000Z","open":119,"close":132,"high":135,"low":116,"volume":1025,"value":121},{"date":"2012-11-16T18:30:00.000Z","open":100,"close":100,"high":101,"low":97,"volume":1092,"value":125},{"date":"2012-11-17T18:30:00.000Z","open":113,"close":119,"high":120,"low":112,"volume":303,"value":102},{"date":"2012-11-18T18:30:00.000Z","open":106,"close":109,"high":110,"low":102,"volume":716,"value":112},{"date":"2012-11-19T18:30:00.000Z","open":113,"close":114,"high":119,"low":113,"volume":860,"value":110},{"date":"2012-11-20T18:30:00.000Z","open":119,"close":125,"high":125,"low":119,"volume":206,"value":111},{"date":"2012-11-21T18:30:00.000Z","open":129,"close":127,"high":134,"low":125,"volume":975,"value":116},{"date":"2012-11-22T18:30:00.000Z","open":117,"close":119,"high":122,"low":114,"volume":184,"value":124},{"date":"2012-11-23T18:30:00.000Z","open":100,"close":108,"high":108,"low":99,"volume":502,"value":127},{"date":"2012-11-24T18:30:00.000Z","open":126,"close":135,"high":135,"low":122,"volume":1104,"value":102},{"date":"2012-11-25T18:30:00.000Z","open":128,"close":128,"high":130,"low":126,"volume":390,"value":122}]},

    { id:'btc',coin: 'Bitcoin(BTC)', price: '9.2', HRchange: '11.20%', dayChange: '11.20%', Hrvolume:'$16,288,423,566', marketCap:'$16,288,423,566', hrhigh:'$16,784', hrlow:'$16,784', description: [{"date":"2012-10-26T18:30:00.000Z","open":125,"close":134,"high":134,"low":123,"volume":316,"value":113},{"date":"2012-10-27T18:30:00.000Z","open":104,"close":105,"high":105,"low":100,"volume":1049,"value":117},{"date":"2012-10-28T18:30:00.000Z","open":118,"close":124,"high":125,"low":117,"volume":584,"value":118},{"date":"2012-10-29T18:30:00.000Z","open":103,"close":106,"high":107,"low":98,"volume":305,"value":117},{"date":"2012-10-30T18:30:00.000Z","open":113,"close":117,"high":119,"low":108,"volume":496,"value":126},{"date":"2012-10-31T18:30:00.000Z","open":115,"close":123,"high":124,"low":112,"volume":585,"value":125},{"date":"2012-11-01T18:30:00.000Z","open":105,"close":110,"high":111,"low":102,"volume":741,"value":127},{"date":"2012-11-02T18:30:00.000Z","open":116,"close":118,"high":119,"low":113,"volume":796,"value":110},{"date":"2012-11-03T18:30:00.000Z","open":122,"close":124,"high":126,"low":119,"volume":132,"value":118},{"date":"2012-11-04T18:30:00.000Z","open":113,"close":121,"high":121,"low":108,"volume":110,"value":130},{"date":"2012-11-05T18:30:00.000Z","open":110,"close":114,"high":118,"low":109,"volume":238,"value":116},{"date":"2012-11-06T18:30:00.000Z","open":115,"close":118,"high":120,"low":114,"volume":831,"value":108},{"date":"2012-11-07T18:30:00.000Z","open":109,"close":104,"high":113,"low":104,"volume":641,"value":113},{"date":"2012-11-08T18:30:00.000Z","open":118,"close":126,"high":129,"low":118,"volume":287,"value":116},{"date":"2012-11-09T18:30:00.000Z","open":122,"close":127,"high":132,"low":120,"volume":1095,"value":113},{"date":"2012-11-10T18:30:00.000Z","open":104,"close":101,"high":105,"low":99,"volume":435,"value":124},{"date":"2012-11-11T18:30:00.000Z","open":109,"close":123,"high":127,"low":108,"volume":886,"value":103},{"date":"2012-11-12T18:30:00.000Z","open":116,"close":128,"high":128,"low":114,"volume":470,"value":117},{"date":"2012-11-13T18:30:00.000Z","open":109,"close":110,"high":110,"low":108,"volume":267,"value":119},{"date":"2012-11-14T18:30:00.000Z","open":116,"close":125,"high":127,"low":112,"volume":508,"value":129},{"date":"2012-11-15T18:30:00.000Z","open":119,"close":132,"high":135,"low":116,"volume":1025,"value":121},{"date":"2012-11-16T18:30:00.000Z","open":100,"close":100,"high":101,"low":97,"volume":1092,"value":125},{"date":"2012-11-17T18:30:00.000Z","open":113,"close":119,"high":120,"low":112,"volume":303,"value":102},{"date":"2012-11-18T18:30:00.000Z","open":106,"close":109,"high":110,"low":102,"volume":716,"value":112},{"date":"2012-11-19T18:30:00.000Z","open":113,"close":114,"high":119,"low":113,"volume":860,"value":110},{"date":"2012-11-20T18:30:00.000Z","open":119,"close":125,"high":125,"low":119,"volume":206,"value":111},{"date":"2012-11-21T18:30:00.000Z","open":129,"close":127,"high":134,"low":125,"volume":975,"value":116},{"date":"2012-11-22T18:30:00.000Z","open":117,"close":119,"high":122,"low":114,"volume":184,"value":124},{"date":"2012-11-23T18:30:00.000Z","open":100,"close":108,"high":108,"low":99,"volume":502,"value":127},{"date":"2012-11-24T18:30:00.000Z","open":126,"close":135,"high":135,"low":122,"volume":1104,"value":102},{"date":"2012-11-25T18:30:00.000Z","open":128,"close":128,"high":130,"low":126,"volume":390,"value":122}]},

    { id:'ripple',coin: 'Ripple', price: '9.1', HRchange: '11.21%', dayChange: '11.21%', Hrvolume:'$16,288,423,566', marketCap:'$17,288,423,566', hrhigh:'$17,784', hrlow:'$17,784', description: [{"date":"2012-10-26T18:30:00.000Z","open":125,"close":134,"high":134,"low":123,"volume":316,"value":113},{"date":"2012-10-27T18:30:00.000Z","open":104,"close":105,"high":105,"low":100,"volume":1049,"value":117},{"date":"2012-10-28T18:30:00.000Z","open":118,"close":124,"high":125,"low":117,"volume":584,"value":118},{"date":"2012-10-29T18:30:00.000Z","open":103,"close":106,"high":107,"low":98,"volume":305,"value":117},{"date":"2012-10-30T18:30:00.000Z","open":113,"close":117,"high":119,"low":108,"volume":496,"value":126},{"date":"2012-10-31T18:30:00.000Z","open":115,"close":123,"high":124,"low":112,"volume":585,"value":125},{"date":"2012-11-01T18:30:00.000Z","open":105,"close":110,"high":111,"low":102,"volume":741,"value":127},{"date":"2012-11-02T18:30:00.000Z","open":116,"close":118,"high":119,"low":113,"volume":796,"value":110},{"date":"2012-11-03T18:30:00.000Z","open":122,"close":124,"high":126,"low":119,"volume":132,"value":118},{"date":"2012-11-04T18:30:00.000Z","open":113,"close":121,"high":121,"low":108,"volume":110,"value":130},{"date":"2012-11-05T18:30:00.000Z","open":110,"close":114,"high":118,"low":109,"volume":238,"value":116},{"date":"2012-11-06T18:30:00.000Z","open":115,"close":118,"high":120,"low":114,"volume":831,"value":108},{"date":"2012-11-07T18:30:00.000Z","open":109,"close":104,"high":113,"low":104,"volume":641,"value":113},{"date":"2012-11-08T18:30:00.000Z","open":118,"close":126,"high":129,"low":118,"volume":287,"value":116},{"date":"2012-11-09T18:30:00.000Z","open":122,"close":127,"high":132,"low":120,"volume":1095,"value":113},{"date":"2012-11-10T18:30:00.000Z","open":104,"close":101,"high":105,"low":99,"volume":435,"value":124},{"date":"2012-11-11T18:30:00.000Z","open":109,"close":123,"high":127,"low":108,"volume":886,"value":103},{"date":"2012-11-12T18:30:00.000Z","open":116,"close":128,"high":128,"low":114,"volume":470,"value":117},{"date":"2012-11-13T18:30:00.000Z","open":109,"close":110,"high":110,"low":108,"volume":267,"value":119},{"date":"2012-11-14T18:30:00.000Z","open":116,"close":125,"high":127,"low":112,"volume":508,"value":129},{"date":"2012-11-15T18:30:00.000Z","open":119,"close":132,"high":135,"low":116,"volume":1025,"value":121},{"date":"2012-11-16T18:30:00.000Z","open":100,"close":100,"high":101,"low":97,"volume":1092,"value":125},{"date":"2012-11-17T18:30:00.000Z","open":113,"close":119,"high":120,"low":112,"volume":303,"value":102},{"date":"2012-11-18T18:30:00.000Z","open":106,"close":109,"high":110,"low":102,"volume":716,"value":112},{"date":"2012-11-19T18:30:00.000Z","open":113,"close":114,"high":119,"low":113,"volume":860,"value":110},{"date":"2012-11-20T18:30:00.000Z","open":119,"close":125,"high":125,"low":119,"volume":206,"value":111},{"date":"2012-11-21T18:30:00.000Z","open":129,"close":127,"high":134,"low":125,"volume":975,"value":116},{"date":"2012-11-22T18:30:00.000Z","open":117,"close":119,"high":122,"low":114,"volume":184,"value":124},{"date":"2012-11-23T18:30:00.000Z","open":100,"close":108,"high":108,"low":99,"volume":502,"value":127},{"date":"2012-11-24T18:30:00.000Z","open":126,"close":135,"high":135,"low":122,"volume":1104,"value":102},{"date":"2012-11-25T18:30:00.000Z","open":128,"close":128,"high":130,"low":126,"volume":390,"value":122}]},
      
];
  this.disabled = false
  this.chartData1 =[{"date":"2012-10-26T18:30:00.000Z","open":125,"close":134,"high":134,"low":123,"volume":316,"value":113},{"date":"2012-10-27T18:30:00.000Z","open":104,"close":105,"high":105,"low":100,"volume":1049,"value":117},{"date":"2012-10-28T18:30:00.000Z","open":118,"close":124,"high":125,"low":117,"volume":584,"value":118},{"date":"2012-10-29T18:30:00.000Z","open":103,"close":106,"high":107,"low":98,"volume":305,"value":117},{"date":"2012-10-30T18:30:00.000Z","open":113,"close":117,"high":119,"low":108,"volume":496,"value":126},{"date":"2012-10-31T18:30:00.000Z","open":115,"close":123,"high":124,"low":112,"volume":585,"value":125},{"date":"2012-11-01T18:30:00.000Z","open":105,"close":110,"high":111,"low":102,"volume":741,"value":127},{"date":"2012-11-02T18:30:00.000Z","open":116,"close":118,"high":119,"low":113,"volume":796,"value":110},{"date":"2012-11-03T18:30:00.000Z","open":122,"close":124,"high":126,"low":119,"volume":132,"value":118},{"date":"2012-11-04T18:30:00.000Z","open":113,"close":121,"high":121,"low":108,"volume":110,"value":130},{"date":"2012-11-05T18:30:00.000Z","open":110,"close":114,"high":118,"low":109,"volume":238,"value":116},{"date":"2012-11-06T18:30:00.000Z","open":115,"close":118,"high":120,"low":114,"volume":831,"value":108},{"date":"2012-11-07T18:30:00.000Z","open":109,"close":104,"high":113,"low":104,"volume":641,"value":113},{"date":"2012-11-08T18:30:00.000Z","open":118,"close":126,"high":129,"low":118,"volume":287,"value":116},{"date":"2012-11-09T18:30:00.000Z","open":122,"close":127,"high":132,"low":120,"volume":1095,"value":113},{"date":"2012-11-10T18:30:00.000Z","open":104,"close":101,"high":105,"low":99,"volume":435,"value":124},{"date":"2012-11-11T18:30:00.000Z","open":109,"close":123,"high":127,"low":108,"volume":886,"value":103},{"date":"2012-11-12T18:30:00.000Z","open":116,"close":128,"high":128,"low":114,"volume":470,"value":117},{"date":"2012-11-13T18:30:00.000Z","open":109,"close":110,"high":110,"low":108,"volume":267,"value":119},{"date":"2012-11-14T18:30:00.000Z","open":116,"close":125,"high":127,"low":112,"volume":508,"value":129},{"date":"2012-11-15T18:30:00.000Z","open":119,"close":132,"high":135,"low":116,"volume":1025,"value":121},{"date":"2012-11-16T18:30:00.000Z","open":100,"close":100,"high":101,"low":97,"volume":1092,"value":125},{"date":"2012-11-17T18:30:00.000Z","open":113,"close":119,"high":120,"low":112,"volume":303,"value":102},{"date":"2012-11-18T18:30:00.000Z","open":106,"close":109,"high":110,"low":102,"volume":716,"value":112},{"date":"2012-11-19T18:30:00.000Z","open":113,"close":114,"high":119,"low":113,"volume":860,"value":110},{"date":"2012-11-20T18:30:00.000Z","open":119,"close":125,"high":125,"low":119,"volume":206,"value":111},{"date":"2012-11-21T18:30:00.000Z","open":129,"close":127,"high":134,"low":125,"volume":975,"value":116},{"date":"2012-11-22T18:30:00.000Z","open":117,"close":119,"high":122,"low":114,"volume":184,"value":124},{"date":"2012-11-23T18:30:00.000Z","open":100,"close":108,"high":108,"low":99,"volume":502,"value":127},{"date":"2012-11-24T18:30:00.000Z","open":126,"close":135,"high":135,"low":122,"volume":1104,"value":102},{"date":"2012-11-25T18:30:00.000Z","open":128,"close":128,"high":130,"low":126,"volume":390,"value":122}];
  this.chartData3 =[{"date":"2012-10-26T18:30:00.000Z","open":125,"close":134,"high":134,"low":123,"volume":316,"value":113},{"date":"2012-10-27T18:30:00.000Z","open":104,"close":105,"high":105,"low":100,"volume":1049,"value":117},{"date":"2012-10-28T18:30:00.000Z","open":118,"close":124,"high":125,"low":117,"volume":584,"value":118},{"date":"2012-10-29T18:30:00.000Z","open":103,"close":106,"high":107,"low":98,"volume":305,"value":117},{"date":"2012-10-30T18:30:00.000Z","open":113,"close":117,"high":119,"low":108,"volume":496,"value":126},{"date":"2012-10-31T18:30:00.000Z","open":115,"close":123,"high":124,"low":112,"volume":585,"value":125},{"date":"2012-11-01T18:30:00.000Z","open":105,"close":110,"high":111,"low":102,"volume":741,"value":127},{"date":"2012-11-02T18:30:00.000Z","open":116,"close":118,"high":119,"low":113,"volume":796,"value":110}];
  
  this.ddd = {

    showCategoryAxis: true,
    recalculateToPercents: "never",
    stockGraphs: [{
        id: "g2",
        valueField: "vwap",
        compareField: "vwap",
        comparable: true,
        visibleInLegend: false
    }],

    stockLegend: {
        
    }
}
 
    this.themeType = this.graphThemeColor.theme;
    this.backgroundColor = this.graphThemeColor.bgColor;
 
    setTimeout(function(){
      let k = document.getElementsByClassName('amcharts-period-selector-div');
      for(let i = 0; i < k.length ; i++){
        k[i].setAttribute('style','display:none !important')
      }

    },300)
  this.themeDo();
  this.calcVWAP();
 
}

//Calculate VWAP
calcVWAP(){
  for(this.i=0;this.i<this.chartData.length;this.i++){

    this.typical_Price = ( this.chartData[this.i].high +this.chartData[this.i].low +this.chartData[this.i].close )/3;
    this.vp = (this.chartData[this.i].volume )*( this.typical_Price);
    if(this.i === 0){
      this.tvp = this.vp;
      this.tv  = this.chartData[this.i].volume
    }
    else{
      
      for(this.j=0; this.j < this.vwaparray.length; this.j++){
         this.tvpDup +=   this.vwaparray[this.j].vp
      }
      this.tvp = this.tvpDup;
      if(this.vwaparray.length > 0)
      for(this.l=0; this.l < this.vwaparray.length; this.l++){
        
       this.tvDup += this.chartData[this.l].volume
      }
      this.tv = this.tvDup
    }

    this.vwap = (this.tvp/this.tv);
    this.vwaparray.push({
      "date":this.chartData[this.i].date,
       "vwap" : this.vwap,
       "vp": this.vp
    })
  }
  console.log(this.vwaparray)
}

// Sort 
key: string = 'name'; 
reverse: boolean = false;
sort(key){
  this.key = key;
  this.reverse = !this.reverse;
}

themeDo() {
//   AmCharts.addMovingAverage(this.chartConfig.dataSets[0], this.chartConfig.panels[0], 'value', {
//     useDataSetColors: false,
//     color: "#ccffcc",
//     title: "Moving average"
// });
for(let k = 0; k < this.films.length ; k++){
  this.AmCharts.makeChart("chart1div"+k,{
    "type": "stock",
    "theme": this.themeType,
    "dataSets": [ {
      "fieldMappings": [ {
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
      } ],
      "color": "#7f8da9",
      "dataProvider": this.films[k].description,
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
      title: "VWAP",
      fieldMappings: [{
          fromField: "vwap",
          toField: "vwap"
      }],
      dataProvider: this.vwaparray,
      categoryField: "date",
      compared: true
  }
  ],
  
  
    "panels": [ {
        "title": "Value",
        "showCategoryAxis": true,
        
        "recalculateToPercents": "never",
        "valueAxes": [ {
          "id": "v1",
          "dashLength": 5,
          "gridThickness":0,
        "position": "right"
          
        } ],
  
        "categoryAxis": {
          "dashLength": 5,
          "gridThickness":0
        },
  
        "stockGraphs": [ {
          "type": "candlestick",
          "id": "g1",
          "openField": "open",
          "closeField": "close",
          "highField": "high",
          "lowField": "low",
          "valueField": "close",
          "lineColor": "#7f8da9",
          "fillColors": "#7f8da9",
          "negativeLineColor": "#db4c3c",
          "negativeFillColors": "#db4c3c",
          
          "useDataSetColors": false,
          "comparable": true,
          "compareField": "value",
          "showBalloon": true,
          "proCandlesticks": true
        } ],
  
        "stockLegend": {
          "valueTextRegular": undefined,
          "periodValueTextComparing": "[[percents.value.close]]%"
        },
        // "drawingIconsEnabled": true
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
      "usePeriod": "WW",
      "height":0
    },
  
    "chartCursorSettings": {
      "valueLineBalloonEnabled": true,
      "valueLineEnabled": true,
      "cursorColor":"#fff",
      "valueBalloonsEnabled":true
    },
  
    "periodSelector": {
      "position": "bottom",
      "periods": [ {
        "period": "DD",
        "count": 1,
        "label": "1 day"
      },{
        "period": "DD",
        "count": 10,
        "label": "10 days"
      }, {
        "period": "MM",
        "selected": true,
        "count": 1,
        "label": "1 month"
      }, {
        "period": "YYYY",
        "count": 1,
        "label": "1 year"
      }, {
        "period": "YTD",
        "label": "YTD"
      }, {
        "period": "MAX",
        "label": "MAX"
      } ]
    },
    "export": {
      "enabled": true,
      "position": "top-left" 
    }
  });
  this.AmCharts.makeChart("chartdiv"+k,{
    "type": "stock",
    "theme": this.themeType,
    "dataSets": [ {
      "fieldMappings": [ {
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
      } ],
      "color": "#7f8da9",
      "dataProvider": this.films[k].description,
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
      title: "VWAP",
      fieldMappings: [{
          fromField: "vwap",
          toField: "vwap"
      }],
      dataProvider: this.vwaparray,
      categoryField: "date",
      compared: true
  }
  ],
  
  
    "panels": [ {
        "title": "Value",
        "showCategoryAxis": true,
        
        "recalculateToPercents": "never",
        "valueAxes": [ {
          "id": "v1",
          "dashLength": 5,
          "gridThickness":0
          
        } ],
  
        "categoryAxis": {
          "dashLength": 5,
          "gridThickness":0
        },
  
        "stockGraphs": [ {
          "type": "line",
          "id": "g1",
          "openField": "open",
          "closeField": "close",
          "highField": "high",
          "lowField": "low",
          "valueField": "close",
          "lineColor": "#7f8da9",
          "fillColors": "#7f8da9",
          "negativeLineColor": "#db4c3c",
          "negativeFillColors": "#db4c3c",
          
          "useDataSetColors": false,
          "comparable": true,
          "compareField": "value",
          "showBalloon": true,
          "proCandlesticks": true
        } ],
  
        "stockLegend": {
          "valueTextRegular": undefined,
          "periodValueTextComparing": "[[percents.value.close]]%"
        },
        // "drawingIconsEnabled": true
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
      "usePeriod": "WW",
      "height":0
    },
  
    "chartCursorSettings": {
      "valueLineBalloonEnabled": true,
      "valueLineEnabled": true,
      "cursorColor":"#fff",
      "valueBalloonsEnabled":true
    },
  
    "periodSelector": {
      "position": "bottom",
      "periods": [ {
        "period": "DD",
        "count": 1,
        "label": "1 day"
      },{
        "period": "DD",
        "count": 10,
        "label": "10 days"
      }, {
        "period": "MM",
        "selected": true,
        "count": 1,
        "label": "1 month"
      }, {
        "period": "YYYY",
        "count": 1,
        "label": "1 year"
      }, {
        "period": "YTD",
        "label": "YTD"
      }, {
        "period": "MAX",
        "label": "MAX"
      } ]
    },
    "export": {
      "enabled": true,
      "position": "top-left" 
    }
  });
}
}
changeTheme(type){
  this.themeType = type;
  this.backgroundColor = '#000'
  this.themeDo();
}
changeType(type){
  if(type){
     this.chart.panels[0].stockGraphs[0].type = type;
  }
this.chart.validateNow();
}
zoomOut(){
  this.chart.zoomOut();
}
vwapaaaa(){
  this.chartConfig.panels.push(this.ddd);
  this.themeDo();
  this.disabled = true
}
expandGraph(ev,l,k){
  if(document.getElementById(l).classList.contains('showingNow')){
    document.getElementById(l).classList.remove('showingNow');
    document.getElementById(l).classList.add('hidingNow');
    let elementExp = document.getElementById(l).parentElement.children[0].children[0].children[0].classList
   if(elementExp.contains('fa-arrows')){
    elementExp.add('fa-arrows-alt')
    elementExp.remove('fa-arrows')
   }
  }
  else{
    document.getElementById(l).classList.add('showingNow');
    document.getElementById(l).classList.remove('hidingNow');
    let elementExp = document.getElementById(l).parentElement.children[0].children[0].children[0].classList
    if(elementExp.contains('fa-arrows-alt')){
     elementExp.add('fa-arrows')
     elementExp.remove('fa-arrows-alt')
    }
  }
  }
 
  coinDetails(id){debugger
      this.router.navigate(['coinpage/' ,id]);
  }
}
