import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { HttpModule } from '@angular/http';
import { GoogleApiModule, GoogleApiService, GoogleAuthService,  NgGapiClientConfig, 
  NG_GAPI_CONFIG, GoogleApiConfig} from "ng-gapi";
import { HttpClientModule } from '@angular/common/http';




import { IonRangeSliderModule } from "ng2-ion-range-slider";
import {CompDataSharingService} from "./comp-data-sharing.service"
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
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './main/signup/signup.component';
import { ContentComponent } from './main/content/content.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterNavComponent } from './main/footer-nav/footer-nav.component';
import { CandlestickComponent } from './main/graph-section/candlestick/candlestick.component';
import { AmChartsModule } from "@amcharts/amcharts3-angular";
import { LineGraphComponent } from './main/graph-section/line-graph/line-graph.component';
import {AccordionModule} from "ng2-accordion";
import { OrderModule } from 'ngx-order-pipe';

<<<<<<< HEAD
let gapiClientConfig: NgGapiClientConfig = {
  client_id: "347517327969-njvciggsghu7ppjmjmcs3pbunvmpfmqg.apps.googleusercontent.com",
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
  scope: [
      "https://www.googleapis.com/auth/analytics.readonly",
      "https://www.googleapis.com/auth/analytics"
  ].join(" ")
};
=======
import { HttpModule } from '@angular/http';
>>>>>>> 4e114184b71afd4b9f654fb52405b9f489fba91c

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
    
   
    FooterNavComponent,
    CandlestickComponent,
    LineGraphComponent,
    

  ],
  imports: [
    AmChartsModule,
    BrowserModule,
    AppRoutingModule,
    OrderModule,
    AccordionModule,
    Ng2OrderModule,
    HttpModule,
<<<<<<< HEAD
   
=======
>>>>>>> 4e114184b71afd4b9f654fb52405b9f489fba91c
    IonRangeSliderModule,
    MDBBootstrapModule.forRoot(),
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
  ],
  providers: [CompDataSharingService],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]

  
})
export class AppModule { }
