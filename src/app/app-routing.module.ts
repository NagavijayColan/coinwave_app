import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './main/signup/signup.component';
import { CoinlistComponent } from './main/content/coinlist/coinlist.component';
import { CoinpageComponent } from './main/content/coinpage/coinpage.component';
import { ExchangeComponent } from './main/content/exchange/exchange.component';
import { PortfolioComponent } from './main/content/portfolio/portfolio.component';
import {AdminloginComponent} from '../app/adminlogin/adminlogin.component'
const routes: Routes = [
  { path: 'adminlogin',component: AdminloginComponent},
  { path: '',component: AdminloginComponent},
  {  path: '', component:MainComponent,
     children:[
      { path:'', redirectTo: 'coinlist', pathMatch: 'full'},  
      {  path: 'coinlist', component: CoinlistComponent},
      {  path: 'coinlist/:ud', component: CoinlistComponent, data: [{isProd: true}]},
      {  path: 'signup', component: SignupComponent },
      {  path: 'coinpage/:id', component: CoinpageComponent },
      {  path: 'exchange', component: ExchangeComponent },
      {  path: 'portfolio', component: PortfolioComponent }
     ]
  }, 

  { path: 'login',component: LoginComponent}, 
  
];


@NgModule({
  imports: [ RouterModule.forRoot(routes,{useHash : true}) ],
  exports: [ RouterModule ]
})


export class AppRoutingModule { }
