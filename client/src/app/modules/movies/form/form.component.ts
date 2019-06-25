import { Component, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { MovieDto } from '../../../shared/dto/movie.dto';

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

  constructor() { 
  }

  ngOnChanges(changes: SimpleChanges) { 
    let movieChanges = changes['movieEdit'];

    if(typeof movieChanges !== 'undefined' && movieChanges.currentValue.id > 0) {
      this.edit = true;
      this.moviePreviousVal = new MovieDto();
      this.copyMovieValues(this.moviePreviousVal, movieChanges.currentValue);
    }
  }  
 
  onCancelEdit() {
    if(this.moviePreviousVal.id == this.movie.id) {
      this.copyMovieValues(this.movieEdit, this.moviePreviousVal);
    }

    this.movieEdit.hasConflict = false;
    this.clearForm();
  }

  onSave() {
    if(!this.edit)
    {
      this.movie.id = this.movies[this.movies.length -1].id + 1;
      this.movies.push(this.movie);

    }

    this.clearForm();
  }

  onDelete() {

  }

  copyMovieValues(movieOld: MovieDto, movieNew: MovieDto) {
    movieOld.id = movieNew.id;
    movieOld.name = movieNew.name;
    movieOld.gender = movieNew.gender;
    movieOld.slug = movieNew.slug;
    movieOld.codeName = movieNew.codeName;
  }

  clearForm() {
    this.edit = false;
    this.movieEdit = new MovieDto();
  }

}
