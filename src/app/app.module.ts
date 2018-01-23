import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SelectDeviceComponent } from './select-device/select-device.component';
import { ChartComponentComponent } from './chart-component/chart-component.component';

import {DeviceDataService} from './device-data.service';



@NgModule({
  declarations: [
    AppComponent,
    SelectDeviceComponent,
    ChartComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DeviceDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
