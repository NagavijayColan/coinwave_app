import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-header',
  templateUrl: './theme-header.component.html',
  styleUrls: ['./theme-header.component.css']
})
export class ThemeHeaderComponent implements OnInit {
 public hideThemesection:Boolean;
 desktoplists:Array<any>;
 mobilelists:Array<any>;
  constructor() { }
 

  ngOnInit() {
    this.hideThemesection = true;
    this.desktoplists = [
        { label:'Favourite', ischecked:true },
        { label:'Coin', ischecked:true },
        { label:'Price', ischecked:true },
        { label:'24 HR Change', ischecked:true },
        { label:'7 Day Change', ischecked:true },
        { label:'24 HR Volume', ischecked:true },
        { label:'Market Cap', ischecked:true },
        { label:'24 HR High', ischecked:true },
        { label:'24 HR Low', ischecked:true },
        { label:'24 HR Volume', ischecked:true },
        { label:'Market Cap', ischecked:true },
        { label:'24 HR High', ischecked:true },
        { label:'24 HR Low', ischecked:true },
       ];

       this.mobilelists = [
        { label:'Favourite', ischecked:true },
        { label:'Coin', ischecked:true },
        { label:'Price', ischecked:true },
        { label:'24 HR Change', ischecked:true },
        { label:'7 Day Change', ischecked:true },
        { label:'24 HR Volume', ischecked:true },
        { label:'Market Cap', ischecked:true },
        { label:'24 HR High', ischecked:true },
        { label:'24 HR Low', ischecked:true },
        { label:'24 HR Volume', ischecked:true },
        { label:'Market Cap', ischecked:true },
        { label:'24 HR High', ischecked:true },
        { label:'24 HR Low', ischecked:true },
       ];
  }



  siteColor() {

    let body = document.getElementsByTagName('body')[0];
    var currentList = body.classList.contains('black-theme');
    
    if (currentList)
    {
      body.classList.remove('black-theme');
      body.classList.add('white-theme');
    }
    else
    {
      body.classList.add('black-theme');
      body.classList.remove('white-theme');
    }
    // body.classList.remove("black-theme");
    // body.classList.add("white-theme");
    
  }

  themeSectionHide()
  {
    this.hideThemesection = !this.hideThemesection
  }

}
