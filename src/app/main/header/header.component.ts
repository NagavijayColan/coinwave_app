import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  constructor(private router : Router) { }

  ngOnInit() {
  }
  makeActive(add,remove1,remove2){
    document.getElementById(add).classList.add('active')
    document.getElementById(remove1).classList.remove('active')
    document.getElementById(remove2).classList.remove('active')
  }
  
  loginform1()
  {
      this.router.navigate(['/login'])  
  }
}
