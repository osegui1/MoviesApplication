import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MoviesModule } from './modules/movies/movies.module';
import { APP_CONFIG, APP_DI_CONFIG } from './shared/configuration/appconfig.constants';
import { ApiService } from './services/apiservice/api.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MoviesModule,
    HttpClientModule
  ],
  providers: [ 
    {
      provide: APP_CONFIG, 
      useValue: APP_DI_CONFIG
    },
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
