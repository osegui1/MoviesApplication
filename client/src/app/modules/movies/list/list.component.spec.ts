import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './list.component';
import { APP_CONFIG, APP_DI_CONFIG } from '../../../../app/shared/configuration/appconfig.constants';
import { MoviesblService } from '../../../../app/services/moviesbl/moviesbl.service';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [HttpClientModule],
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
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
