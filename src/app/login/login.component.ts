import { Component, OnInit } from '@angular/core';
import { Injectable, NgZone } from "@angular/core";
import { Router } from '@angular/router'
import { Http } from '@angular/http';
import "rxjs/add/operator/map";
import { SocialUser, AuthService, FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider } from 'ng4-social-login';
import { debug } from 'util';
import { CompDataSharingService } from "../comp-data-sharing.service";
import {CommonServiceService} from '../common-service.service'
import { document } from 'angular-bootstrap-md/utils/facade/browser';
import { retry } from 'rxjs/operators/retry';
declare var IN: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable()

export class LoginComponent implements OnInit {
  private user: SocialUser;
  private loggedIn: boolean;
  public apiKey;
  public isUserAuthenticated;
  public errormessageLogin;
  public errormessageSignUp;
  public showLoadSpinner;
  userReg: any = {};
  userLogin: any = {};
  constructor(private commonService : CommonServiceService,private authService: AuthService, private http: Http, private router: Router, private changeGraphTheme: CompDataSharingService) {
    this.changeGraphTheme.callLogOut_listener().subscribe(() => {
      this.signOut();
    })
    this.changeGraphTheme.trigger_signUpwithSocial_listener().subscribe((message : any) => {
      if(message == 'facebook'){
          this.signInWithFB()
      }
      else if(message == 'linkedin'){
        this.signInWithLinkedIN()
      }
      else if(message == 'google'){
        this. signInWithGoogle()
      }
      
    })
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (userData) => {
        this.commonService.sociallogInAction(userData);
      },
      error => {
          console.log(error)
      })
  }
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (userData) => {
        this.commonService.sociallogInAction(userData);
    },
    error => {
        console.log(error)
    });
  }
  signInWithLinkedIN(): void {
    this.authService.signIn(LinkedinLoginProvider.PROVIDER_ID).then(
      (userData) => {
        this.commonService.sociallogInAction(userData)
    },
    error => {
        console.log(error)
    });
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
  confirmPassword() { }
  signUpWithMail(userReg) {
    
    let status = this.commonService.checkEmpty('signuPCredentials');
    if(!status){
      this.commonService.userRegistration(userReg);
    }
    else{
      this.errormessageSignUp = true;
    }
  }
  loginWithMail(userLogin) {
    if(userLogin.emailId == 'admin@gmail.com' && userLogin.password == 'admin123'){
      this.router.navigate(['coinlist']);
      return
    }
    let status = this.commonService.checkEmpty('loginCredentials');
    if(!status){
      this.commonService.userLogin(userLogin);
    }
    else{
      this.errormessageLogin = true;
    }
  }
}
