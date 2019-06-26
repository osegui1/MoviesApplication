import { Component, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { MovieDto } from '../../../shared/dto/movie.dto';
import { ApiService } from '../../../services/apiservice/api.service';
import { MoviesblService } from '../../../../app/services/moviesbl/moviesbl.service';

@Component({
  selector: 'movies-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnChanges {

  @Input() 
  get movieEdit() {
    return this.movie;
  }
  set movieEdit(movieNew) {
    this.movie = movieNew;
    this.movieEditChange.emit(this.movie);
  }
  @Input()
  get movies() {
    return this.moviesVal;
  }
  set movies(newMovies) {
    this.moviesVal= newMovies;
    this.moviesChange.emit(this.moviesVal);
  }
  @Output() movieEditChange= new EventEmitter<MovieDto>();
  @Output() moviesChange = new EventEmitter<MovieDto[]>();
  movie: MovieDto;
  moviePreviousVal: MovieDto;
  moviesVal: MovieDto[];
  edit: boolean;
  customErrors: string[];

  constructor(private apiService: ApiService, private movieblService: MoviesblService) { 
    this.movie = new MovieDto();
  }

  ngOnChanges(changes: SimpleChanges) { 
    let movieChanges = changes['movieEdit'];

    if(typeof movieChanges !== 'undefined' && movieChanges.currentValue.id > 0) {
      this.edit = true;
      this.moviePreviousVal = new MovieDto();
      this.movieblService.copyMovieValues(this.moviePreviousVal, movieChanges.currentValue);
    }
  }  
 
  onCancelEdit() {
    if(this.moviePreviousVal.id == this.movie.id) {
      this.movieblService.copyMovieValues(this.movieEdit, this.moviePreviousVal);
    }

    this.movieEdit.hasConflict = false;
    this.clearForm();
  }

  onSave() {
    this.customErrors = [];
    this.customErrors = this.movieblService.validateDuplicates(this.movie.hasConflict, this.movies, this.movie);

    if(this.customErrors.length === 0) {

      if(this.edit) {
        this.apiService.updateMovie(this.movie).subscribe(response => {
          if(response.ok) {
            this.clearForm();
          }
        });
      }
      else{
        this.apiService.createMovie(this.movie).subscribe(response => {
          if(response.ok) {
            let movieCreated = response.body;

            if(movieCreated.id > 0) {
              this.movies.push(movieCreated);
              this.clearForm();
            }
          }
        });
      }
    }
  }

  onDelete() {
    this.apiService.deleteMovie(this.movie.id).subscribe((response) => {
      if(response.ok) {
        this.movies.splice(this.movies.indexOf(this.movie), 1);
        this.clearForm();
      }
    });
  }

  clearForm() {
    this.edit = false;
    this.movieEdit = new MovieDto();
    this.customErrors = [];
  }

}
