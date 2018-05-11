import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class CompDataSharingService {
  private changeGraphTheme = new BehaviorSubject<string>("default message");
  currentMessage = this.changeGraphTheme.asObservable();
  constructor() { }
  changeMessage(message: string) {
    this.changeGraphTheme.next(message)
  }
}
