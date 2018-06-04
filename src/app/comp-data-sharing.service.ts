import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class CompDataSharingService {
  private _listners = new Subject<any>();

  listen(): Observable<any> {
     return this._listners.asObservable();
  }
  filter(filterBy: string) {
     this._listners.next(filterBy);
  }
  
  private changeGraphTheme = new BehaviorSubject<string>("default message");
  currentMessage = this.changeGraphTheme.asObservable();
  constructor() { }
  changeMessage(message: string) {
    this.changeGraphTheme.next(message)
  }
}
