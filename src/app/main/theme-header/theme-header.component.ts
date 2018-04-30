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
    if(sessionStorage.getItem('hideThemesection')){
      this.hideThemesection = JSON.parse(sessionStorage.getItem('hideThemesection'));
    }
    else{
      this.hideThemesection = true;
     sessionStorage.setItem('hideThemesection','true')
    }
   
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
        { label:'Circulation Supply ', ischecked:false },
        { label:'Total Supply', ischecked:false },
        { label:'Exchanges ', ischecked:false },
       ];

       this.mobilelists = [
        { label:'Favourite', ischecked:false },
        { label:'Coin', ischecked:true },
        { label:'Price', ischecked:true },
        { label:'24 HR Change', ischecked:true },
        { label:'7 Day Change', ischecked:true },
        { label:'24 HR Volume', ischecked:false },
        { label:'Market Cap', ischecked:false },
        { label:'24 HR High', ischecked:false },
        { label:'24 HR Low', ischecked:false },
        { label:'24 HR Volume', ischecked:false },
        { label:'Circulation Supply ', ischecked:false },
        { label:'Total Supply', ischecked:false },
        { label:'Exchanges ', ischecked:false },
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
  }

  themeSectionHide()
  {debugger
    sessionStorage.setItem('hideThemesection','false');
    this.hideThemesection = JSON.parse(sessionStorage.getItem('hideThemesection'));
  }

}
