import { Component, OnInit } from '@angular/core';
import {Injectable, NgZone} from "@angular/core";

import { Http } from '@angular/http';
import "rxjs/add/operator/map";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable()
export class LoginComponent implements OnInit {
  constructor() {}
  ngOnInit() {
  }
}
