import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesComponent } from './movies.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { APP_CONFIG, APP_DI_CONFIG } from '../../../app/shared/configuration/appconfig.constants';
import { MoviesblService } from '../../../app/services/moviesbl/moviesbl.service';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormComponent,
        ListComponent,
        MoviesComponent
      ],
      imports: [
        CommonModule,
        FormsModule,
        HttpClientModule
      ],
      providers: [ 
        {
          provide: APP_CONFIG, 
          useValue: APP_DI_CONFIG
        },
        MoviesblService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
