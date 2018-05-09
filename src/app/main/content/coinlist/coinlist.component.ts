import { Component,OnInit, ViewChild } from '@angular/core';
import {GraphSectionComponent} from '../../graph-section/graph-section.component'
@Component({
  selector: 'app-coinlist',
  templateUrl: './coinlist.component.html',
  styleUrls: ['./coinlist.component.css']
})
export class CoinlistComponent implements OnInit {
  @ViewChild("component1") component1: GraphSectionComponent;
  constructor() {}
  ngOnInit() {
  }
  sortTable(key){
    this.component1.sort(key);
  }
}
