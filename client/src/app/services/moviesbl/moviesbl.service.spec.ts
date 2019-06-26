import { TestBed } from '@angular/core/testing';

import { MoviesblService } from './moviesbl.service';
import { MovieDto } from '../../../app/shared/dto/movie.dto';

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

  it('should sort array by code name', () => {
    const service: MoviesblService = TestBed.get(MoviesblService);
    let movies: MovieDto[] = [];
    let movie1 = new MovieDto();
    let movie2 = new MovieDto();
    let movie3 = new MovieDto();
    movie1.codeName = "X01";
    movie2.codeName = "C09";
    movie3.codeName = "Z01";
    movies.push(movie1);
    movies.push(movie2);
    movies.push(movie3);
    service.sortMoviesArray(movies);
    expect(movies[0].codeName).toBe("C09");
    expect(movies[2].codeName).toBe("Z01");
  });

  it('should return duplicate movies by name and the movie id of the first in descending order by code name', () => {
    const service: MoviesblService = TestBed.get(MoviesblService);
    let movies: MovieDto[] = [];
    let movie1 = new MovieDto();
    let movie2 = new MovieDto();
    let movie3 = new MovieDto();
    movie1.id = 1;
    movie1.name = "Lord of the rings";
    movie1.codeName = "X01";
    movie2.id = 2;
    movie2.name = "Avengers";
    movie2.codeName = "Z01";
    movie3.id = 3;
    movie3.name = "avengers";
    movie3.codeName = "A01";
    movies.push(movie1);
    movies.push(movie2);
    movies.push(movie3);
    let duplicates = service.processDuplicates(movies);
    expect(duplicates.length).toBe(1);
    expect(duplicates[0].count).toBe(2);
    expect(duplicates[0].defaultMovieId).toBe(2);
  });

  it('should copy movie values of different instances', () => {
    const service: MoviesblService = TestBed.get(MoviesblService);
    let movie1 = new MovieDto();
    let movie2 = new MovieDto();
    movie1.id = 1;
    movie1.codeName = "X01";
    movie1.name = "Lord of the rings";
    movie1.slug = "lord-of-the-rings";
    movie1.gender = "fantasy";
    movie2.id = 2;
    movie2.codeName = "Z01";
    movie2.name = "aladdin";
    movie2.slug = "aladdin-movie";
    movie2.gender = "animation";
    service.copyMovieValues(movie1, movie2);
    expect(movie1.id).toBe(movie2.id);
    expect(movie1.name).toBe(movie2.name);
    expect(movie1.codeName).toBe(movie2.codeName);
    expect(movie1.gender).toBe(movie2.gender);
    expect(movie1.slug).toBe(movie2.slug);
  });

  it('should validate duplicate movie by name', () => {
    const service: MoviesblService = TestBed.get(MoviesblService);
    const nameValidationMsg= "There is already a movie with the same name";
    let movies: MovieDto[] = [];
    let movie1 = new MovieDto();
    let movie2 = new MovieDto();
    let movie3 = new MovieDto();
    movie1.id = 1;
    movie1.codeName = "X01";
    movie1.name = "Lord of the rings";
    movie1.slug = "lord-of-the-rings";
    movie2.id = 2;
    movie2.codeName = "Z01";
    movie2.name = "aladdin";
    movie2.slug = "aladdin-movie";
    movie3.id = 3;
    movie3.codeName = "W01";
    movie3.name = "aladdin";
    movie3.slug = "spider-man";
    movies.push(movie1);
    movies.push(movie2);
    movies.push(movie3);
    let errors = service.validateDuplicates(true, movies, movie3);
    expect(errors[0]).toBe(nameValidationMsg);
    expect(errors.length).toBe(1);
  });
});
