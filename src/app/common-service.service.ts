import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router'
import {CompDataSharingService} from './comp-data-sharing.service';
import { CookieService } from 'ngx-cookie-service';
@Injectable()
export class CommonServiceService {
  
  constructor(private cookieService : CookieService,private http : HttpClient, private router : Router,private shareData : CompDataSharingService) { }
  userRegistration(userReg) {
    if(Object.keys(userReg).length < 4){
        return true;
    }
    else{
       userReg.loginType = 'Manual'
    this.http.post('http://coinwave.service.colanonline.net/user/register', userReg).subscribe(data => {
      localStorage.setItem('userToken', data['access_token']);
      localStorage.setItem('userName', data['userName']);
      if(this.router.url == '/login'){
        this.router.navigate(['coinlist/', data]);
      }
      this.shareData.isLoggedIn_filter(data);
    })
    return false;
    }
   

  }
  userLogin(userLogin) {
    if(Object.keys(userLogin).length < 2){
      debugger
        return true;
        
    }
    else{
      debugger
      this.http.post('http://coinwave.service.colanonline.net/user/login', userLogin).subscribe(data => {
      localStorage.setItem('userToken', data['access_token']);
      localStorage.setItem('userName', data['userName']);
      let lang = "/en/"+data['siteLanguage'];
      lang = lang.replace(/%/g, "");
      this.cookieService.set('googtrans', lang )
      if(this.router.url == '/login'){
        this.router.navigate(['coinlist/', data]);
      }
     
      this.shareData.isLoggedIn_filter(data);
    })
    return false;
    }
    

  }
  sociallogInAction(userData){
    debugger
    let userReg ={};
    userReg['loginId'] = userData.id;
    userReg['loginType'] = userData.provider;
    userReg['userName'] = userData.name;
    this.http.post('http://coinwave.service.colanonline.net/user/socialLogin',userReg).subscribe(data => {
      localStorage.setItem('userToken', data['access_token']);
      localStorage.setItem('userName', data['userName']);
      let lang = "/en/"+data['siteLanguage'];
      this.cookieService.set('googtrans', lang )
      this.router.navigate(['coinlist/', data]);
      this.shareData.isLoggedIn_filter(data);
     
    })

  }
  getMaxPrice(currencyValue){
    this.http.get('http://coinwave.service.colanonline.net/exchange/getMax').subscribe(data => {
      return (data[0].maxPrice * currencyValue).toFixed(2) + 100;
    })
  }
}
