import { Component, OnInit } from '@angular/core';
import {Injectable, NgZone} from "@angular/core";
import {Router} from '@angular/router'
import { Http } from '@angular/http';
import "rxjs/add/operator/map";
import {SocialUser, AuthService,FacebookLoginProvider,GoogleLoginProvider,LinkedinLoginProvider} from 'ng4-social-login';
import { debug } from 'util';
import { CompDataSharingService } from "../comp-data-sharing.service";
declare var IN: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable()

export class LoginComponent implements OnInit {
  
  userReg:any = {};
  userLogin:any = {};
  private user: SocialUser;
  private loggedIn: boolean;
  public apiKey;
  public isUserAuthenticated;
  constructor(private authService: AuthService,private http : Http,private router : Router,private changeGraphTheme : CompDataSharingService) {
    this.changeGraphTheme.callLogOut_listener().subscribe(() => {
     this.signOut();
    })
  }
  
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (userData) => {
        this.userReg.loginId = userData.id;
        this.userReg.loginType = userData.provider;
        this.userReg.userName = userData.name;
        this.http.post('http://coinwave.service.colanonline.net/user/socialLogin',this.userReg).map(response => response.json()).subscribe(data =>{
          console.log(data)
          localStorage.setItem('userToken',data.access_token);
          localStorage.setItem('userName',data.userName);
          this.router.navigate(['coinlist/',data]);
          this.changeGraphTheme.isLoggedIn_filter(data);
      })
      }
    )
  }
  
  signInWithFB(): void {
    
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (userData) => {
        this.userReg.loginId = userData.id;
        this.userReg.loginType = userData.provider;
        this.userReg.userName = userData.name;
        this.http.post('http://coinwave.service.colanonline.net/user/socialLogin',this.userReg).map(response => response.json()).subscribe(data =>{
          localStorage.setItem('userToken',data.access_token);
          localStorage.setItem('userName',data.userName);
          this.router.navigate(['coinlist/',data]);
          this.changeGraphTheme.isLoggedIn_filter(data);
      })
      }
    );
  }
 
  signInWithLinkedIN(): void {
    
    this.authService.signIn(LinkedinLoginProvider.PROVIDER_ID).then(
      (userData) => {
        this.userReg.loginId = userData.id;
        this.userReg.loginType = userData.provider;
        this.userReg.userName = userData.name;
        this.http.post('http://coinwave.service.colanonline.net/user/socialLogin',this.userReg).map(response => response.json()).subscribe(data =>{
          localStorage.setItem('userToken',data.access_token);
          localStorage.setItem('userName',data.userName);
          this.router.navigate(['coinlist/',data]);
          this.changeGraphTheme.isLoggedIn_filter(data);
      })
      }
    );
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
  confirmPassword(){}
  signUpWithMail(userReg){
    userReg.loginType = 'Manual'
    this.http.post('http://coinwave.service.colanonline.net/user/register',userReg).map(response => response.json()).subscribe(data =>{
      localStorage.setItem('userToken',data.access_token);
      localStorage.setItem('userName',data.userName);
      this.router.navigate(['coinlist/',data]);
      this.changeGraphTheme.isLoggedIn_filter(data);
    })
  }
  loginWithMail(userLogin){
    
    this.http.post('http://coinwave.service.colanonline.net/user/login',userLogin).map(response => response.json()).subscribe(data =>{
      localStorage.setItem('userToken',data.access_token);
      localStorage.setItem('userName',data.userName);
      this.router.navigate(['coinlist/',data]);
      this.changeGraphTheme.isLoggedIn_filter(data);
    })
  }
  
}
