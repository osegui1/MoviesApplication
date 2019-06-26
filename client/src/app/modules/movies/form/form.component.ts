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
  customErrors: string[];

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
    this.customErrors = [];
    this.customErrors = this.validateDuplicates(this.movie.hasConflict);

    if(this.customErrors.length === 0) {

      if(!this.edit) {
        this.movie.id = this.movies.length > 0 ?this.movies[this.movies.length -1].id + 1: 1;
        this.movies.push(this.movie);
      }

      this.clearForm();
    }
  }

  onDelete() {
    this.movies.splice(this.movies.indexOf(this.movie), 1);
    this.clearForm();
  }

  validateDuplicates(validateName:boolean): string[] {
    let errorMessages = [];
    let duplicatedSlug = false;
    let duplicatedCodeName = false;
    let duplicatedName = false;

    for(let movie of this.movies) {
      if(movie.id !== this.movie.id) {
        duplicatedSlug = movie.slug === this.movie.slug;
        duplicatedCodeName = movie.codeName === this.movie.codeName;
        duplicatedName = validateName? movie.name === this.movie.name: false;
        
        if(duplicatedSlug || duplicatedCodeName || duplicatedName)
        {
          break;
        }
      }
    }

    if(duplicatedSlug) {
      errorMessages.push("There is already a movie with the same slug");
    }

    if(duplicatedCodeName) {
      errorMessages.push("There is already a movie with the same code name");
    }

    if(duplicatedName) {
      errorMessages.push("There is already a movie with the same name");
    }

    return errorMessages;
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
    this.customErrors = [];
  }

}
