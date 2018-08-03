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
  private getAloonFavCoins = new Subject<any>();
  private trigger_login = new Subject<any>();
  private trigger_successMes = new Subject<any>();
  private trigger_errorMes = new Subject<any>();
  private trigger_social_login = new Subject<any>();
  private userProfile = new Subject<any>();
  private userTheme = new Subject<any>();
  private portFolio = new Subject<any>();
  private portFolio_clear = new Subject<any>();
  private clear_interval = new Subject<any>();
  private amchart_theme = new Subject<any>();
  private exchange = new Subject<any>();
  
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
  searchDataFilter(text: any,) {
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
  get_favAndNormal_coins_listener(){
    return this.getAloonFavCoins.asObservable();
  }
  get_favAndNormal_coins_filter(){
    this.getAloonFavCoins.next();
  }
  trigger_loginPopUp_listener(){
    return this.trigger_login.asObservable();
  }
  trigger_loginPopUp_filter(){
    this.trigger_login.next();
  }
  trigger_successMessagePopUp_listener(){
    return this.trigger_successMes.asObservable();
  }
  trigger_successMessagePopUp_filter(msg : any){
    this.trigger_successMes.next(msg);
  }
  trigger_errorMessagePopUp_listener(){
    return this.trigger_errorMes.asObservable();
  }
  trigger_errorMessagePopUp_filter(msg : any){
    this.trigger_errorMes.next(msg);
  }
  trigger_signUpwithSocial_listener(){
    return this.trigger_social_login.asObservable();
  }
  trigger_signUpwithSocial_filter(type : any){
    this.trigger_social_login.next(type);
  }
  userProfile_listener(){
    return this.userProfile.asObservable();
  }
  userProfile_filter(){
    this.userProfile.next();
  }
  user_theme_listener(){
    return this.userTheme.asObservable();
  }
  user_theme_filter(theme : any){
    this.userTheme.next(theme);
  }
  portfolio_Data_listener(){
    return this.portFolio.asObservable();
  }
  portfolio_Data_filter(){
    this.portFolio.next();
  }
  exchange_data_listener(){
    return this.exchange.asObservable();
  }
  exchange_data_filter(){
    this.exchange.next();
  }
  
  clear_portfolio_Data_listener(){
    return this.portFolio_clear.asObservable();
  }
  clear_portfolio_Data_filter(){
    this.portFolio_clear.next();
  }
  clear_interval_filter(){
    this.clear_interval.next();
  }
  clear_interval_listener(){
    return this.clear_interval.asObservable();
  }
  chnageTheme_of_amchart_filter(theme : any){
    this.amchart_theme.next(theme);
  }
  chnageTheme_of_amchart_listener(){
    return this.amchart_theme.asObservable();
  }
  private changeGraphTheme = new BehaviorSubject<string>("default message");
  currentMessage = this.changeGraphTheme.asObservable();
  constructor() { }
  changeMessage(message: string) {
    this.changeGraphTheme.next(message)
  }
}
