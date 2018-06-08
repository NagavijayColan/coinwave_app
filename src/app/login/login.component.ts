import { Component, OnInit } from '@angular/core';
import {Injectable, NgZone} from "@angular/core";

import { Http } from '@angular/http';
import "rxjs/add/operator/map";
import {SocialUser, AuthService,FacebookLoginProvider,GoogleLoginProvider,LinkedinLoginProvider} from 'ng4-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable()
export class LoginComponent implements OnInit {
  private user: SocialUser;
  private loggedIn: boolean;
  constructor(private authService: AuthService) {}
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    
  }
 
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
 
  signInWithLinkedIN(): void {
    this.authService.signIn(LinkedinLoginProvider.PROVIDER_ID);
  }
 
  signOut(): void {
    this.authService.signOut();
  }
  
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }
}
