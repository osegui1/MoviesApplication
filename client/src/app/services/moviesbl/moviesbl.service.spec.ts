import { TestBed } from '@angular/core/testing';

import { MoviesblService } from './moviesbl.service';

describe('MoviesblService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MoviesblService
    ]
  }));

  it('should be created', () => {
    const service: MoviesblService = TestBed.get(MoviesblService);
    expect(service).toBeTruthy();
  });
});
