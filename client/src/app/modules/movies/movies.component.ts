import { Component, OnInit } from '@angular/core';
import { MovieDto } from '../../shared/dto/movie.dto';
import { ApiService } from '../../services/apiservice/api.service';

@Component({
  selector: 'movies-admin',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit{

  moviesList: MovieDto[];
  selectedMovie: MovieDto;
  title: string = "Movies Administration";
 
  constructor(private apiService: ApiService) { 
    this.selectedMovie = new MovieDto();
    this.moviesList = [];
  }

  ngOnInit() {
    this.apiService.getMovies().subscribe((response) => { 
      if(response.ok) {
        let movies = response.body;

        if(movies.length > 0) {
          this.moviesList = movies;
        }
      }
    });
  }
}
