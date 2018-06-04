import { Component,OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-coinlist',
  templateUrl: './coinlist.component.html',
  styleUrls: ['./coinlist.component.css']
})
export class CoinlistComponent implements OnInit {
  @ViewChild("component1") component1;
  constructor() {   }

// special params:


  ngOnInit() {
 
 
  }
  sortTable(key){
    this.component1.sort(key);
  }
 
}
