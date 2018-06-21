import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { debug } from 'util';
@Injectable()
export class CompDataSharingService {
  private refresh = new Subject<any>();
  private searchData = new Subject<any>();
  private customizeCol = new Subject<any>();
  private isLoggedInSub = new Subject<any>();
  private makeLogOut = new Subject<any>();
  private currencyVal = new Subject<any>();
  private makeDefaultTheme = new Subject<any>();
  private getAllCoinsLogOut = new Subject<any>();
/* Refresh Rate  */
  refreshRateListen(): Observable<any> {
     return this.refresh.asObservable();
  }
  refreshRateFilter(filterBy: string) {
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
  customizeColumns_listener(): Observable<any> {
    return this.customizeCol.asObservable();
  }
  customizeColumns_filter(text: Object) {
     this.customizeCol.next(text);
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
  /*Currency Converter*/
  currencyConverter_listener(){
    return this.currencyVal.asObservable();
  }
  currencyConverter_filter(currencyRate: number){
    this.currencyVal.next(currencyRate);
  }
  /*Make Default Theme */
  changeTo_default_theme_listener(){
    return this.makeDefaultTheme.asObservable();
  }
  changeTo_default_theme_filter(){
    this.makeDefaultTheme.next();
  }
  /*Get Default Data*/
  get_all_coins_listener(){
    return this.getAllCoinsLogOut.asObservable();
  }
  get_all_coins_filter(){
    this.getAllCoinsLogOut.next();
  }

  private changeGraphTheme = new BehaviorSubject<string>("default message");
  currentMessage = this.changeGraphTheme.asObservable();
  constructor() { }
  changeMessage(message: string) {
    this.changeGraphTheme.next(message)
  }
}
