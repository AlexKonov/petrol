import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { API_GATEWAY } from 'src/app/api-service.config';
import { PetrolChainModule } from 'src/app/petrol-chain/petrol-chain.module';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PetrolChainModule,
  ],

  declarations: [
    AppComponent,
  ],

  providers: [
    {
      provide: API_GATEWAY,
      useValue: environment.gateway,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule { }
