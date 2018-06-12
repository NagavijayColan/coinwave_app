import { Component, OnInit } from '@angular/core';
import {Injectable, NgZone} from "@angular/core";
import {Router} from '@angular/router'
import { Http } from '@angular/http';
import "rxjs/add/operator/map";
import {SocialUser, AuthService,FacebookLoginProvider,GoogleLoginProvider,LinkedinLoginProvider} from 'ng4-social-login';
import { debug } from 'util';
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
  constructor(private authService: AuthService,private http : Http,private router : Router) {}
  
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (userData) => {
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
        this.userReg.loginId = userData.id;
        this.userReg.loginType = userData.provider;
        this.userReg.userName = userData.name;
        this.http.post('http://coinwave.service.colanonline.net/user/socialLogin',this.userReg).map(response => response.json()).subscribe(data =>{
        this.router.navigate(['/coinlist']);
      })
      }
    );
  }
 
  signInWithLinkedIN(): void {debugger
    this.authService.signIn(LinkedinLoginProvider.PROVIDER_ID).then(
      (userData) => {
        this.userReg.loginId = userData.id;
        this.userReg.loginType = userData.provider;
        this.userReg.userName = userData.name;
        this.http.post('http://coinwave.service.colanonline.net/user/socialLogin',this.userReg).map(response => response.json()).subscribe(data =>{
        this.router.navigate(['/coinlist']);
      })
      }
    );
  }
  // signInWithLinkedIN(){debugger
  //   this._linkedInService.login().subscribe({
  //     next: (state) => {
  //       console.log(state) 
  //     },
  //     complete: () => {
  //       // Completed
  //     }
  //   });
  // }
  signOut(): void {
    this.authService.signOut();
  }
  
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
     
    });
  }
  confirmPassword(){
    // if(this.userReg.confirmPassword === this.userReg.password){
    //     alert(this.userReg.confirmPassword === this.userReg.password)
    // }
  }
  signUpWithMail(userReg){debugger
    userReg.loginType = 'Manual'
    this.http.post('http://coinwave.service.colanonline.net/user/register',userReg).map(response => response.json()).subscribe(data =>{
      
      this.router.navigate(['/coinlist'])
    })

  }
  loginWithMail(userLogin){
    this.http.post('http://coinwave.service.colanonline.net/user/login',userLogin).map(response => response.json()).subscribe(data =>{
      
      this.router.navigate(['/coinlist'])
    })
  }
  onLinkedInLoad() {
    IN.Event.on(IN, "auth", this.onLinkedInAuth);
  }
  public onLinkedInAuth() {
    IN.API.Profile("me")
      .fields("firstName", "lastName")
      .result(this.displayProfiles)
      .error(this.displayProfilesErrors);
  }
  public displayProfiles(profiles) {
    var linkedinmember = profiles.values[0];
    console.log(JSON.stringify(linkedinmember));
    console.log(linkedinmember.firstName + " " + linkedinmember.lastName);
  }
  public displayProfilesErrors(error) {
    console.log(error.message);
    console.log(error);
  }
}
