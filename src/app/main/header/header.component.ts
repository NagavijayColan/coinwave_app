import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { CompDataSharingService } from "../../comp-data-sharing.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public searchText;
  public isLoggedIn;
  public userName;
  constructor(private router : Router, private changeGraphTheme : CompDataSharingService) { 
    this.changeGraphTheme.isLoggedIn_listener().subscribe((m:any) => {
      this.isLoggedIn = true;
      this.userName = 'm.userName';
    })
  }

  ngOnInit() {
    this.userName = 'k'
    if(sessionStorage.getItem('userToken')){
       this.isLoggedIn = true;
       this.userName = sessionStorage.getItem('userName')
    }
  }
  makeActive(add,remove1,remove2){
    document.getElementById(add).classList.add('active')
    document.getElementById(remove1).classList.remove('active')
    document.getElementById(remove2).classList.remove('active')
  }
  // loginPage(){
  //     this.router.navigate(['/login'])
  // }
  globalSearch(text){
    console.log(text);
    this.changeGraphTheme.searchDataFilter(text);
  }
  goToLogin(){
    this.router.navigate(['/login'],{skipLocationChange : false})
  }
  logOut(){
    sessionStorage.removeItem('userToken');
    this.isLoggedIn = false;
  }
}
