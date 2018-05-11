import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './main/login/login.component';
import { SignupComponent } from './main/signup/signup.component';
import { CoinlistComponent } from './main/content/coinlist/coinlist.component';
import { CoinpageComponent } from './main/content/coinpage/coinpage.component';
import { ExchangeComponent } from './main/content/exchange/exchange.component';
import { PortfolioComponent } from './main/content/portfolio/portfolio.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'coinlist',
    pathMatch: 'full'
  }, 

  { 
    path: 'coinlist',
    component: CoinlistComponent
  },
  

  { 
    path: 'login',
    component: LoginComponent
  },

  { 
    path: 'signup',
    component: SignupComponent
  },

  { 
    path: 'coinpage/:id',
    component: CoinpageComponent
  },

  { 
    path: 'exchange',
    component: ExchangeComponent
  },

  { 
    path: 'portfolio',
    component: PortfolioComponent
  }

];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})


export class AppRoutingModule { }
