import { Component } from '@angular/core';
import { MovieDto } from '../../shared/dto/movie.dto';

@Component({
  selector: 'movies-admin',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {

  moviesList: MovieDto[];
  selectedMovie: MovieDto;
  title: string = "Movies Administration";
 
  constructor() { 
    this.selectedMovie = new MovieDto();
    let movie1 = new MovieDto();
    let movie2 = new MovieDto();
    let movie3 = new MovieDto();
    let movie4 = new MovieDto();
    let movie5 = new MovieDto();
    let movie6 = new MovieDto();
    movie1.id=1;movie1.name="Movie 1";movie1.gender="Horror";movie1.slug="movie1";movie1.codeName="M01";
    movie2.id=2;movie2.name="Movie 2";movie2.gender="Comedy";movie2.slug="movie2";movie2.codeName="M02";
    movie3.id=3;movie3.name="Movie 1";movie3.gender="Drama";movie3.slug="movie3";movie3.codeName="M06";
    movie4.id=4;movie4.name="Movie 2";movie4.gender="Adventure";movie4.slug="movie4";movie4.codeName="M04";
    movie5.id=5;movie5.name="Movie 3";movie5.gender="Animation";movie5.slug="movie5";movie5.codeName="M05";
    movie6.id=6;movie6.name="Movie 1";movie6.gender="Documental";movie6.slug="movie6";movie6.codeName="M03";
    this.moviesList= [movie1, movie2, movie3, movie4, movie5, movie6];
  }

}
