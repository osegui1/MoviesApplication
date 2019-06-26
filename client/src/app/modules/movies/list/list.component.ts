import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MovieDto } from '../../../shared/dto/movie.dto';
import { ApiService } from '../../../services/apiservice/api.service';
import { MoviesblService } from '../../../../app/services/moviesbl/moviesbl.service';

@Component({
  selector: 'movies-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnChanges {

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
  
  constructor(private apiService: ApiService, private movieblService: MoviesblService) {  
    this.moviesVal = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    this.duplicatesList = this.movieblService.processDuplicates(this.movies);
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

  trackByMovieFn(index, movie: MovieDto) {  
    return movie.id;
  }

  trackByDuplicatesFn(index, duplicate: { name: string, count: number, defaultMovieId: number }) {    
    return duplicate.defaultMovieId;
  }

  onSelectMovie(movie: MovieDto) {
     this.movieSelected = movie;
     this.movieSelected.hasConflict = false;
  }

  onDeleteMovie(movie: MovieDto) {
    this.apiService.deleteMovie(movie.id).subscribe((response) => {
      if(response.ok) {
        this.movies.splice(this.movies.indexOf(movie), 1);
        this.duplicatesList = this.movieblService.processDuplicates(this.movies);
      }
    });
  }
  
  onDuplicateSelected(duplicate: { name: string, count: number, defaultMovieId: number }) {
    let movieTmp = this.movies.filter(movie => movie.id === duplicate.defaultMovieId)[0];
    this.movies.forEach(movie => { movie.hasConflict = false; });
    movieTmp.hasConflict = true;
    this.movieSelected = movieTmp;
  }
}
