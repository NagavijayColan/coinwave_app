import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { CompDataSharingService } from "../../comp-data-sharing.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public searchText;
  constructor(private router : Router, private changeGraphTheme : CompDataSharingService) { }

  ngOnInit() {}
  makeActive(add,remove1,remove2){
    document.getElementById(add).classList.add('active')
    document.getElementById(remove1).classList.remove('active')
    document.getElementById(remove2).classList.remove('active')
  }
  // loginPage(){
  //     this.router.navigate(['/login'])
  // }
  globalSearch(text){
    console.log(text);
    this.changeGraphTheme.searchDataFilter(text);
  }
}
