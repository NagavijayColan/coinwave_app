import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { CompDataSharingService } from './comp-data-sharing.service';
import { CookieService } from 'ngx-cookie-service';
@Injectable()
export class CommonServiceService {

  constructor(private cookieService: CookieService, private http: HttpClient, private router: Router, private shareData: CompDataSharingService) { }
  userRegistration(userReg) {
    if (Object.keys(userReg).length < 4) {
      return true;
    }
    else {
      userReg.loginType = 'Manual';
      this.http.post('http://54.165.36.80:5687/user/register', userReg).subscribe(data => {
        localStorage.setItem('userToken', data['access_token']);
        localStorage.setItem('userName', data['userName']);
        if(sessionStorage.getItem('favouriteCoins') ){
          let favcoin = JSON.parse(sessionStorage.getItem('favouriteCoins'));
          if(favcoin.length > 0){
            let tokenV = localStorage.getItem('userToken');
            this.http.put('http://54.165.36.80:5687/api/userSetting/update', { favourites: favcoin, token: tokenV }).
            subscribe(data => {
                console.log(data)
            })
          }
        }
        if (this.router.url == '/login') {
          this.router.navigate(['coinlist/', data]);
        }
        else {
          this.shareData.userProfile_filter();
          this.shareData.portfolio_Data_filter();
          this.shareData.trigger_successMessagePopUp_filter('You have successfully Registered')
        }
        this.shareData.isLoggedIn_filter(data);
      },
      err => {
        if(typeof err.error == 'string'){
          this.shareData.trigger_errorMessagePopUp_filter(err.error);
        }
        else if(typeof err.error == 'object'){
          this.shareData.trigger_errorMessagePopUp_filter(err.error.message);
        }
        
      })
      return false;
    }
  }
  userLogin(userLogin) {
    
    if (Object.keys(userLogin).length < 2) {
      return true;
    }
    else {
      
      this.http.post('http://54.165.36.80:5687/user/login', userLogin).subscribe(data => {
        localStorage.setItem('userToken', data['access_token']);
        localStorage.setItem('userName', data['userName']);
        let lang = "/en/" + data['siteLanguage'];
        lang = lang.replace(/%/g, "");
        this.cookieService.set('googtrans', lang);
        if(sessionStorage.getItem('favouriteCoins') ){
          let favcoin = JSON.parse(sessionStorage.getItem('favouriteCoins'));
          if(favcoin.length > 0){
            let tokenV = localStorage.getItem('userToken');
            this.http.put('http://54.165.36.80:5687/api/userSetting/update', { favourites: favcoin, token: tokenV }).
            subscribe(data => {
                console.log(data)
            })
          }
        }
        if (this.router.url == '/login') {
          
          this.router.navigate(['coinlist/', data]);
        }
        else {
          this.shareData.portfolio_Data_filter();
          this.shareData.userProfile_filter();
          this.shareData.trigger_successMessagePopUp_filter('Welcome ' + data['userName']);
          
        }
        this.shareData.isLoggedIn_filter(data);
      },
      err => {
        if(typeof err.error == 'string'){
          this.shareData.trigger_errorMessagePopUp_filter(err.error);
        }
        else if(typeof err.error == 'object'){
          this.shareData.trigger_errorMessagePopUp_filter(err.error.message);
        }
        
      })
      return false;
    }
  }
  sociallogInAction(userData) {
    let userReg = {};
    userReg['loginId'] = userData.id;
    userReg['loginType'] = userData.provider;
    userReg['userName'] = userData.name;
    this.http.post('http://54.165.36.80:5687/user/socialLogin', userReg).subscribe(data => {
      localStorage.setItem('userToken', data['access_token']);
      localStorage.setItem('userName', data['userName']);
      let lang = "/en/" + data['siteLanguage'];
      this.cookieService.set('googtrans', lang);
      if(sessionStorage.getItem('favouriteCoins') ){
        let favcoin = JSON.parse(sessionStorage.getItem('favouriteCoins'));
        if(favcoin.length > 0){
          let tokenV = localStorage.getItem('userToken');
          this.http.put('http://54.165.36.80:5687/api/userSetting/update', { favourites: favcoin, token: tokenV }).
          subscribe(data => {
              console.log(data)
          })
        }
      }
      if (this.router.url == '/login') {
        this.router.navigate(['coinlist/', data]);
      }
      else {
        this.shareData.trigger_successMessagePopUp_filter('Welcome ' + data['userName'])
        this.shareData.userProfile_filter();
        this.shareData.portfolio_Data_filter();
        
      }
      this.shareData.isLoggedIn_filter(data);
    },
      err => {
        this.shareData.trigger_errorMessagePopUp_filter(err.error)
      })

  }
  checkEmpty(formIdc) {
    let i;
    let elem;
    let status = false;
    let formId = document.getElementById(formIdc);
    elem = formId.getElementsByClassName('required');
    for (i = 0; i < elem.length; i++) {
      if (!elem[i].classList.contains('error')) {
        if (elem[i].value == "") {
          elem[i].classList.add('error');
          status = true
        }
      }
      else if (elem[i].value == "") {
        status = true
      }
      else {
        elem[i].classList.remove('error');
      }
    }
    return status
  }
}
