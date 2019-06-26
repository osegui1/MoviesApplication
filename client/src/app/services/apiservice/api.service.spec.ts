import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { APP_CONFIG, APP_DI_CONFIG } from '../../shared/configuration/appconfig.constants';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
    providers: [ 
      {
        provide: APP_CONFIG, 
        useValue: APP_DI_CONFIG
      }
    ]
  }));

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });
});
