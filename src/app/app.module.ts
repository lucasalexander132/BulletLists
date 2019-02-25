import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { TasklistService } from './tasklist.service';
import { SettingsService } from './settings.service';

import { NewPageModule } from './new/new.module';
import { HomePageModule } from './home/home.module';
import { EditPageModule } from './edit/edit.module';
import { DonationPageModule } from './donation/donation.module';
import { SettingsPageModule } from './settings/settings.module';

@NgModule({
  declarations: [AppComponent ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    FormsModule, 
    IonicStorageModule.forRoot(), 
    NewPageModule, 
    HomePageModule, 
    EditPageModule, 
    DonationPageModule,
    SettingsPageModule,
    HttpClientModule ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    TasklistService,
    Events
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
