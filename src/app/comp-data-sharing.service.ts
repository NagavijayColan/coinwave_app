import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class CompDataSharingService {
  private _listners = new Subject<any>();
  private _listners1 = new Subject<any>();

  listen(): Observable<any> {
     return this._listners.asObservable();
  }
  listen1(): Observable<any> {
    return this._listners1.asObservable();
 }
  filter1(filterBy: string,) {
     this._listners1.next(filterBy);
  }
  filter(filterBy: string,) {
    this._listners.next(filterBy);
 }
  
  private changeGraphTheme = new BehaviorSubject<string>("default message");
  private searchText = new BehaviorSubject<string>("default message");
  currentMessage = this.changeGraphTheme.asObservable();
  searchTextObs = this.searchText.asObservable();
  constructor() { }
  changeMessage(message: string) {
    this.changeGraphTheme.next(message)
  }
  searchTextExchange(message: string){
    this.searchText.next(message)
  }
}
