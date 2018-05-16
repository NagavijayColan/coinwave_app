import { Component, OnInit } from '@angular/core';
import {Injectable, NgZone} from "@angular/core";
import {GoogleAuthService} from "ng-gapi/lib/GoogleAuthService";
import GoogleUser = gapi.auth2.GoogleUser;
import GoogleAuth = gapi.auth2.GoogleAuth;
import { Http } from '@angular/http';
import "rxjs/add/operator/map";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable()
export class LoginComponent implements OnInit {
  

  public static readonly SESSION_STORAGE_KEY: string = "accessToken";
    private user: GoogleUser = undefined;

    constructor(private googleAuthService: GoogleAuthService,
                private ngZone: NgZone) {
    }

    // public setUser(user: GoogleUser): void {
    //     this.user = user;
    // }

    // public getCurrentUser(): GoogleUser {
    //     return this.user;
    // }

    // public getToken(): string {
    //     let token: string = sessionStorage.getItem(LoginComponent.SESSION_STORAGE_KEY);
    //     if (!token) {
    //         throw new Error("no token set , authentication required");
    //     }
    //     return sessionStorage.getItem(LoginComponent.SESSION_STORAGE_KEY);
    // }

    public signIn() {
        this.googleAuthService.getAuth().subscribe((auth) => {
            auth.signIn().then(res => this.signInSuccessHandler(res), err => this.signInErrorHandler(err));
        });
    }

    //TODO: Rework
    // public signOut(): void {
    //     this.googleAuthService.getAuth().subscribe((auth) => {
    //         try {
    //             auth.signOut();
    //         } catch (e) {
    //             console.error(e);
    //         }
    //         sessionStorage.removeItem(LoginComponent.SESSION_STORAGE_KEY)
    //     });
    // }

    // public isUserSignedIn(): boolean {
    //     return !_.isEmpty(sessionStorage.getItem(LoginComponent.SESSION_STORAGE_KEY));
    // }

    private signInSuccessHandler(res: GoogleUser) {
        this.ngZone.run(() => {
            this.user = res;
            sessionStorage.setItem(
              LoginComponent.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
            );
        });
    }

    private signInErrorHandler(err) {
       // console.warn(err);
    }
  
  ngOnInit() {
  }





}
