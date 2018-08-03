import { Component,OnInit } from '@angular/core';
import { document } from 'angular-bootstrap-md/utils/facade/browser';
import { CompDataSharingService } from "./comp-data-sharing.service";

// import { GoogleService, GoogleObj } from './google.services';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  public timeoutID;
  constructor(private shareData : CompDataSharingService){}
  ngOnInit(){
    sessionStorage.removeItem('favouriteCoins');
    // this.setup();
  }
//   setup() {
//     console.log('setUp')
//     document.addEventListener("mousemove", this.resetTimer, false);
//     document.addEventListener("mousedown", this.resetTimer, false);
//     document.addEventListener("keypress", this.resetTimer, false);
//     document.addEventListener("DOMMouseScroll", this.resetTimer, false);
//     document.addEventListener("mousewheel", this.resetTimer, false);
//     document.addEventListener("touchmove", this.resetTimer, false);
//     document.addEventListener("MSPointerMove", this.resetTimer, false);
//     this.timeoutID = setTimeout(this.goInactive, 10000);
// }
// resetTimer() {
//   console.log('resetTimer')
  
//   clearTimeout(this.timeoutID);
//   console.log('asdasd')
//   this.timeoutID = setTimeout(this.goInactive, 10000);
// }
// goInactive(){
//     // this.shareData.trigger_loginPopUp_filter();
//     // document.getElemenetById('makeInactive').classList.add('pointer-none')
//     alert()
// }
}
