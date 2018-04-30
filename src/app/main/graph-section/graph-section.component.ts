import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-graph-section',
  templateUrl: './graph-section.component.html',
  styleUrls: ['./graph-section.component.css']
})
export class GraphSectionComponent implements OnInit {
  public myOptions;
  constructor() { }
 
  ngOnInit() {debugger
    setTimeout(function(){
      let k = document.getElementsByClassName('amcharts-period-selector-div');
      for(let i = 0; i < k.length ; i++){
        k[i].setAttribute('style','display:none !important')
      }
     
    },300)
   
    this.myOptions =[{
    name:"vijay"
    },
    {
      name:"vijay"
      },
      {
        name:"vijay"
        }]
  }

}
