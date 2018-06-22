import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router'
import {CompDataSharingService} from './comp-data-sharing.service'
@Injectable()
export class CommonServiceService {
  
  constructor(private http : HttpClient, private router : Router,private shareData : CompDataSharingService) { }
  userRegistration(userReg) {

    userReg.loginType = 'Manual'
    this.http.post('http://coinwave.service.colanonline.net/user/register', userReg).subscribe(data => {
      localStorage.setItem('userToken', data['access_token']);
      localStorage.setItem('userName', data['userName']);
      if(this.router.url == '/login'){
        this.router.navigate(['coinlist/', data]);
      }
      this.shareData.isLoggedIn_filter(data);
    })

  }
  userLogin(userLogin) {

    this.http.post('http://coinwave.service.colanonline.net/user/login', userLogin).subscribe(data => {
      localStorage.setItem('userToken', data['access_token']);
      localStorage.setItem('userName', data['userName']);
      if(this.router.url == '/login'){
        this.router.navigate(['coinlist/', data]);
      }
      this.shareData.isLoggedIn_filter(data);
    })

  }
  sociallogInAction(userData){
    let userReg ={};
    userReg['loginId'] = userData.id;
    userReg['loginType'] = userData.provider;
    userReg['userName'] = userData.name;
    this.http.post('http://coinwave.service.colanonline.net/user/socialLogin',userReg).subscribe(data => {
      localStorage.setItem('userToken', data['access_token']);
      localStorage.setItem('userName', data['userName']);
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
