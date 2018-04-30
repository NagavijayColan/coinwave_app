import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { DataTableModule } from './main/data-table';
import { DataTableSortExpand } from './main/sort-expand/data-table-sort-expand';


import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './main/header/header.component';
import { ThemeHeaderComponent } from './main/theme-header/theme-header.component';
import { GraphSectionComponent } from './main/graph-section/graph-section.component';
import { AdvertisementComponent } from './main/advertisement/advertisement.component';
import { CoinlistComponent } from './main/content/coinlist/coinlist.component';
import { PortfolioComponent } from './main/content/portfolio/portfolio.component';
import { ExchangeComponent } from './main/content/exchange/exchange.component';
import { CoinpageComponent } from './main/content/coinpage/coinpage.component';
import { LoginComponent } from './main/login/login.component';
import { SignupComponent } from './main/signup/signup.component';
import { ContentComponent } from './main/content/content.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterNavComponent } from './main/footer-nav/footer-nav.component';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    ThemeHeaderComponent,
    GraphSectionComponent,
    AdvertisementComponent,
    CoinlistComponent,
    PortfolioComponent,
    ExchangeComponent,
    CoinpageComponent,
    LoginComponent,
    SignupComponent,
    ContentComponent,
    DataTableSortExpand,
    FooterNavComponent

  ],
  imports: [
  
    BrowserModule,
    AppRoutingModule,
    DataTableModule,
    MDBBootstrapModule.forRoot()
  ],
  
  providers: [],
  bootstrap: [AppComponent]

  
})
export class AppModule { }
