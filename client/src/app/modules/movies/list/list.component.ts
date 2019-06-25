import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MovieDto } from '../../../shared/dto/movie.dto';

@Component({
  selector: 'movies-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnChanges {

  @Input()
  get movieSelected() {
    return this.movieSelectedVal;
  }
  set movieSelected(newMovie) {
    this.movieSelectedVal= newMovie;
    this.movieSelectedChange.emit(this.movieSelectedVal);
  }
  @Input()
  get movies() {
    return this.moviesVal;
  }
  set movies(newMovies) {
    this.moviesVal= newMovies;
    this.moviesChange.emit(this.moviesVal);
  }
  @Output() movieSelectedChange = new EventEmitter<MovieDto>();
  @Output() moviesChange = new EventEmitter<MovieDto[]>();
  movieSelectedVal: MovieDto;
  moviesVal: MovieDto[];
  duplicatesList : { name: string, count: number, defaultMovieId: number }[];
  showDuplicates: boolean = false;
  showDuplicatesLink: string = "Show Duplicates";
  
  constructor() {  
  }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    this.processDuplicates();
  }

  toggleShowDuplicates() {
    this.showDuplicates = !this.showDuplicates;

    if(!this.showDuplicates){
      this.showDuplicatesLink = "Show Duplicates";
    }
    else{
      this.showDuplicatesLink = "Hide Duplicates";
    }
  }

  onSelectMovie(movie: MovieDto) {
     this.movieSelected = movie;
     this.movieSelected.hasConflict = false;
  }

  onDeleteMovie(movie: MovieDto) {
    
  }
  
  onDuplicateSelected(duplicate: { name: string, count: number, defaultMovieId: number }) {
    let movieTmp = this.movies.filter(movie => movie.id === duplicate.defaultMovieId)[0];
    this.movies.forEach(movie => { movie.hasConflict = false; });
    movieTmp.hasConflict = true;
    this.movieSelected = movieTmp;
  }

  processDuplicates() {
    let movieCounter = {};
    let movieToEdit = {};
    let moviesCopy = [];
    this.duplicatesList = [];

    moviesCopy = [...this.movies];
    this.sortMoviesArray(moviesCopy);

    moviesCopy.forEach(movie => {
       if(!movieCounter[movie.name]){
         movieCounter[movie.name] = 0;
       }
       
       movieCounter[movie.name] += 1;
       movieToEdit[movie.name] = movie.id;
    });

    for(var name in movieCounter){
      if(movieCounter[name] >= 2){
        this.duplicatesList.push({ name: name, count: movieCounter[name], defaultMovieId: movieToEdit[name] });
      }
    }
  }

  sortMoviesArray(moviesArray: MovieDto[]) {
    moviesArray.sort((mov1, mov2) => {
      if(mov1.codeName > mov2.codeName) {
        return 1;
      }

      if(mov1.codeName < mov2.codeName) {
        return -1;
      }

      return 0;
    });
  }
}
