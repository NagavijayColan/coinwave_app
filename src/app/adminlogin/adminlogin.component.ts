import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(private router : Router) { }
  public user:object;
  ngOnInit() {
    this.user={};
    sessionStorage.setItem('adminlogin','false');
  }
  moveToDashboard(user){
      if(user.name == 'admin' && user.password == 'admin123@'){
          this.router.navigate(['coinlist/']);
          sessionStorage.setItem('adminlogin','true');
      }
      else{
        sessionStorage.setItem('adminlogin','false');        
        alert('You are not Autherised!')
      }
  }
}
