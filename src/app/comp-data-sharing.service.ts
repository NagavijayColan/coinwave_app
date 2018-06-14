import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class CompDataSharingService {
  private refresh = new Subject<any>();
  private searchData = new Subject<any>();
  private costomizeColumn = new Subject<any>();
  private isLoggedInSub = new Subject<any>();
  private makeLogOut = new Subject<any>();

/* Refresh Rate  */
  refreshRateListen(): Observable<any> {
     return this.refresh.asObservable();
  }
  refreshRateFilter(filterBy: string,) {
    this.refresh.next(filterBy);
  }
 /* Global Search */
  searchCoinExchange(): Observable<any> {
    return this.searchData.asObservable();
  }
  searchDataFilter(text: string,) {
     this.searchData.next(text);
  }
  /* Column Customization  */
  customizeColumnListner(): Observable<any> {
    return this.costomizeColumn.asObservable();
  }
  customizeFilter(data: any){
    this.costomizeColumn.next(data);
  }

  /*Is logged In */
  isLoggedIn_listener(): Observable<any> {
    return this.isLoggedInSub.asObservable();
  }
  isLoggedIn_filter(data: any){
    this.isLoggedInSub.next(data);
  }
  /*Social Log out */
  callLogOut_listener(){
    return this.makeLogOut.asObservable();
  }
  callLogOut_filter(){
    this.makeLogOut.next();
  }
  private changeGraphTheme = new BehaviorSubject<string>("default message");
  currentMessage = this.changeGraphTheme.asObservable();
  constructor() { }
  changeMessage(message: string) {
    this.changeGraphTheme.next(message)
  }
}
