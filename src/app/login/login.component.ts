import { Component, OnInit } from '@angular/core';
import {Injectable, NgZone} from "@angular/core";
import {Router} from '@angular/router'
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
  userReg:any = {};
  userLogin:any = {};
  private user: SocialUser;
  private loggedIn: boolean;
  constructor(private authService: AuthService,private http : Http,private router : Router) {}
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (userData) => {
        console.log(GoogleLoginProvider.PROVIDER_ID+" sign in data : " , userData);
        
        this.userReg.loginId = userData.id;
        this.userReg.loginType = userData.provider;
        this.userReg.userName = userData.name;
        this.http.post('http://coinwave.service.colanonline.net/user/socialLogin',this.userReg).map(response => response.json()).subscribe(data =>{
        this.router.navigate(['/coinlist']);
      })
      }
    )
  }
  
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (userData) => {
        console.log(GoogleLoginProvider.PROVIDER_ID+" sign in data : " , userData);
        
        this.userReg.loginId = userData.id;
        this.userReg.loginType = userData.provider;
        this.userReg.userName = userData.name;
        this.http.post('http://coinwave.service.colanonline.net/user/socialLogin',this.userReg).map(response => response.json()).subscribe(data =>{
        this.router.navigate(['/coinlist']);
      })
      }
    );
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
      console.log(this.user)
    });
  }
  confirmPassword(){
    // if(this.userReg.confirmPassword === this.userReg.password){
    //     alert(this.userReg.confirmPassword === this.userReg.password)
    // }
  }
  signUpWithMail(userReg){
    userReg.loginType = 'Manual'
    this.http.post('http://coinwave.service.colanonline.net/user/register',userReg).map(response => response.json()).subscribe(data =>{
      console.log(data);
      this.router.navigate(['/coinlist'])
    })

  }
  loginWithMail(userLogin){
    this.http.post('http://coinwave.service.colanonline.net/user/login',userLogin).map(response => response.json()).subscribe(data =>{
      console.log(data);
      this.router.navigate(['/coinlist'])
    })
  }
}
