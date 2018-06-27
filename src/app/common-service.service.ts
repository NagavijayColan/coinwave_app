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
       userReg.loginType = 'Manual';
    this.http.post('http://18.191.202.171:5687/user/register', userReg).subscribe(data => {
      localStorage.setItem('userToken', data['access_token']);
      localStorage.setItem('userName', data['userName']);
      if(this.router.url == '/login'){
        this.router.navigate(['coinlist/', data]);
      }
      this.shareData.isLoggedIn_filter(data);
      this.shareData.userProfile_filter();
      this.shareData.trigger_successMessagePopUp_filter('You have successfully Registered')
    },
    err =>{
      this.shareData.trigger_errorMessagePopUp_filter(err.error);
    })
    return false;
    }
  }
  userLogin(userLogin) {
    if(Object.keys(userLogin).length < 2){
        return true;
    }
    else{
      this.http.post('http://18.191.202.171:5687/user/login', userLogin).subscribe(data => {
      localStorage.setItem('userToken', data['access_token']);
      localStorage.setItem('userName', data['userName']);
      let lang = "/en/"+data['siteLanguage'];
      lang = lang.replace(/%/g, "");
      this.cookieService.set('googtrans', lang )
      if(this.router.url == '/login'){
        this.router.navigate(['coinlist/', data]);
      }
      this.shareData.isLoggedIn_filter(data);
      this.shareData.userProfile_filter();
      this.shareData.trigger_successMessagePopUp_filter('You have successfully Registered')
    },
    err =>{
      this.shareData.trigger_successMessagePopUp_filter(err.error)
    })
    return false;
    }
    

  }
  sociallogInAction(userData){
    let userReg ={};
    userReg['loginId'] = userData.id;
    userReg['loginType'] = userData.provider;
    userReg['userName'] = userData.name;
    this.http.post('http://18.191.202.171:5687/user/socialLogin',userReg).subscribe(data => {
      localStorage.setItem('userToken', data['access_token']);
      localStorage.setItem('userName', data['userName']);
      let lang = "/en/"+data['siteLanguage'];
      this.cookieService.set('googtrans', lang );
      if(this.router.url == '/login'){
        this.router.navigate(['coinlist/', data]);
      }
      this.shareData.trigger_successMessagePopUp_filter('Successfully Loggedin!')
      this.shareData.isLoggedIn_filter(data);
      this.shareData.userProfile_filter();
    },
    err =>{
      this.shareData.trigger_errorMessagePopUp_filter(err.error)
    })

  }
  getMaxPrice(currencyValue){
    this.http.get('http://18.191.202.171:5687/exchange/getMax').subscribe(data => {
      return (data[0].maxPrice * currencyValue).toFixed(2) + 100;
    })
  }
  checkEmpty(formIdc){
    let i;
    let elem;
    let status = false;
    let formId = document.getElementById(formIdc);
    elem = formId.getElementsByClassName('required');
   for(i=0; i < elem.length ; i++){
     if(!elem[i].classList.contains('error')){
       if(elem[i].value == ""){
        elem[i].classList.add('error');
        status = true
       }
     }
     else if(elem[i].value == ""){
         status = true
     }
     else{
       elem[i].classList.remove('error');
     }
   }
  return status
  }
}
