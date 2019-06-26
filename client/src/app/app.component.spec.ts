import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { MoviesModule } from './modules/movies/movies.module';
import { HttpClientModule } from '@angular/common/http';
import { APP_CONFIG, APP_DI_CONFIG } from './shared/configuration/appconfig.constants';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
        }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
