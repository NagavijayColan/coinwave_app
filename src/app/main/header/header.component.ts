import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { CompDataSharingService } from "../../comp-data-sharing.service";
import { CommonServiceService } from '../../common-service.service';
import { SocialUser, AuthService, FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider } from 'ng4-social-login';
import { debug } from 'util';
import { Http } from '@angular/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public searchText;
  public isLoggedIn;
  public userName;
  public successMessagePopup;
  userLogin: any = {};
  userReg: any = {};
  public errormessageSignUp;
  public errormessageLogin;
  public errorMessagePopup;
  public activeClass;
  public error;
  @ViewChild('loginform') public loginModal;
  @ViewChild('registerform') public signUpModal;
  @ViewChild('successMessage') public successModal;
  @ViewChild('errorMessage') public errorModal;
  constructor(private http: Http, private authService: AuthService, private commonService: CommonServiceService, private router: Router, private dataShare: CompDataSharingService) {
    this.dataShare.isLoggedIn_listener().subscribe((m: any) => {
      this.isLoggedIn = true;
      this.userName = m.userName;
    })
    this.dataShare.trigger_loginPopUp_listener().subscribe((m: any) => {
      this.loginModal.show();
    })
    this.dataShare.trigger_successMessagePopUp_listener().subscribe((m: any) => {
      this.successMessagePopup = m;
      this.signUpModal.hide();
      this.loginModal.hide();
      this.successModal.show();
      this.errorModal.hide();
    })
    this.dataShare.trigger_errorMessagePopUp_listener().subscribe((m: any) => {
      // this.signUpModal.hide();
      // this.loginModal.hide();
      this.errorMessagePopup = m;
      this.errorModal.show();
    });

  }

  ngOnInit() {
    this.signUpModal.hide();
    this.loginModal.hide();
    this.successModal.hide();
    this.errorModal.hide();
    this.activeClass = this.router.url;
    this.userName = 'k';
    if (localStorage.getItem('userToken')) {
      this.isLoggedIn = true;
      this.userName = localStorage.getItem('userName')
    }
  }
  
  makeActive(add, remove1, remove2) {
    document.getElementById(add).classList.add('active');
    document.getElementById(remove1).classList.remove('active');
    document.getElementById(remove2).classList.remove('active');
  }
  // loginPage(){
  //     this.router.navigate(['/login'])
  // }
  globalSearch(text) {
    let page = this.router.url;
    if (text != '') {
      if (page == '/coinlist') {
        if (localStorage.getItem('userToken')) {
          this.http.post('http://54.165.36.80:5687/exchange/getusd', { search: text,from : 0,to:1500 }).map(response => response.json()).subscribe(data => {
            this.dataShare.searchDataFilter(data);
          });
        }
        else {
          this.http.post('http://54.165.36.80:5687/exchange/getusd', { search: text }).map(response =>
          response.json()).subscribe(data => {
          console.log(data)
            this.dataShare.searchDataFilter(data);
          })
        }

      }
      else if (page == '/portfolio' && localStorage.getItem('userToken')) {
        this.http.post('http://54.165.36.80:5687/api/coins/getPortfolio', { search: text ,token : localStorage.getItem('userToken')}).map(
          response => response.json()).subscribe(
          data => {
            this.dataShare.searchDataFilter(data);
          });
      }
      else if (page == '/exchange') {

        // this.http.get("http://54.165.36.80:5687/exchange/exchangeSummary", { search: text }).map(
        //   response => response.json()).subscribe(
        //   data => {
            this.dataShare.searchDataFilter(text);
        //   },
        // );
      }
    }
    else if (localStorage.getItem('userToken')) {
      if(this.router.url == '/coinlist'){
        this.dataShare.get_favAndNormal_coins_filter();
      }
      else if(this.router.url == '/portfolio'){
        this.dataShare.portfolio_Data_filter()
      }
    }
    else {
      if(this.router.url == '/coinlist'){
         this.dataShare.get_all_coins_filter();
      }
     else if(this.router.url == '/portfolio'){
        this.dataShare.portfolio_Data_filter()
     }
      else if(this.router.url == '/exchange'){
        this.dataShare.exchange_data_filter();
      }
    }
    // this.http.post('',{key : text}).map(response => response.json()).subscribe(data => {
    //  this.dataShare.searchDataFilter(data);
    // })
  }
  onlyAplhaBets(event) {
    var key = event.keyCode;
    if ((key >= 65 && key <= 90) || key == 8 || key == 32 || key == 9) {
      return true
    }
    else {
      return false
    }
  }
  goToLogin() {
    this.router.navigate(['/login'], { skipLocationChange: false })
  }
  logOut() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    this.dataShare.callLogOut_filter();
    this.dataShare.changeTo_default_theme_filter();
    this.dataShare.get_all_coins_filter();
    this.dataShare.clear_portfolio_Data_filter();
    this.isLoggedIn = false;
  }
  // signUpWithMail(userReg) {

  //   let error = this.commonService.userRegistration(userReg);
  //   this.errormessageSignUp = error ?  true : false;
  //   if(!error){
  //     this.loginModal.hide();
  //     this.signUpModal.hide();
  //     this.successMessagePopup = 'You have logged in successfully!';
  //     this.successModal.show();
  //   }
  //   else{
  //     this.errorModal.show();
  //   }
  // }
  // loginWithMail(userLogin) {
  //   let error = this.commonService.userLogin(userLogin);
  //   this.errormessageLogin = error ?  true : false;
  //   if(error){
  //     this.loginModal.hide();
  //     this.signUpModal.hide();
  //     this.successMessagePopup = 'You have logged in successfully!';
  //     this.successModal.show();
  //   }
  //   else{
  //     this.loginModal.hide();
  //     this.signUpModal.hide();
  //     this.errorModal.show();
  //   }
  // }
  signUpWithMail(userReg) {
    let status = this.commonService.checkEmpty('signuPCredentials');
    if (!status) {
      this.commonService.userRegistration(userReg)

    }
    else {
      this.errormessageSignUp = true;
    }
  }
  loginWithMail(userLogin) {
    let status = this.commonService.checkEmpty('loginCredentials');
    if (!status) {
      this.commonService.userLogin(userLogin);
    }
    else {
      this.errormessageLogin = true;
    }
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (userData) => {
        this.commonService.sociallogInAction(userData);
        this.loginModal.hide();
        this.signUpModal.hide();
        this.successMessagePopup = 'You have logged in successfully!';
        this.successModal.show();
      },
      error => {
        this.errorModal.show();
      }
    )
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (userData) => {
        this.commonService.sociallogInAction(userData);
        this.loginModal.hide();
        this.signUpModal.hide();
        this.successMessagePopup = 'You have logged in successfully!';
        this.successModal.show();
      },
      error => {
        this.errorModal.show();
      }
    );
  }

  signInWithLinkedIN(): void {
    this.authService.signIn(LinkedinLoginProvider.PROVIDER_ID).then(
      (userData) => {
        this.commonService.sociallogInAction(userData);
      });
  }
}
