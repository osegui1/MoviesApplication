import { Injectable } from '@angular/core';
import { MovieDto } from '../../../app/shared/dto/movie.dto';

@Injectable()
export class MoviesblService {

  constructor() { }

  processDuplicates (movies: MovieDto[]) : { name: string, count: number, defaultMovieId: number }[] 
  {
    let movieCounter = {};
    let movieToEdit = {};
    let moviesCopy = [];
    let duplicatesList = [];

    moviesCopy = [...movies];
    this.sortMoviesArray(moviesCopy);

    moviesCopy.forEach(movie => {
       let name = movie.name.toLowerCase();

       if(!movieCounter[name]){
         movieCounter[name] = 0;
       }
       
       movieCounter[name] += 1;
       movieToEdit[name] = movie.id;
    });

    for(var nameMovie in movieCounter) {
      let name = nameMovie.toLowerCase();

      if(movieCounter[name] >= 2){
        duplicatesList.push({ name: name, count: movieCounter[name], defaultMovieId: movieToEdit[name] });
      }
    }

    return  duplicatesList;
  }

  sortMoviesArray(moviesArray: MovieDto[]) {
    moviesArray.sort((mov1, mov2) => {
      if(mov1.codeName.toLowerCase() > mov2.codeName.toLowerCase()) {
        return 1;
      }

      if(mov1.codeName.toLowerCase() < mov2.codeName.toLowerCase()) {
        return -1;
      }

      return 0;
    });
  }

  validateDuplicates(validateName: boolean, movies: MovieDto[], movieEdit: MovieDto): string[] {
    let errorMessages = [];
    let duplicatedSlug = false;
    let duplicatedCodeName = false;
    let duplicatedName = false;

    for(let movie of movies) {
      if(movieEdit.id !== movie.id) {
        duplicatedSlug = movieEdit.slug === movie.slug;
        duplicatedCodeName = movieEdit.codeName === movie.codeName;
        duplicatedName = validateName? movieEdit.name === movie.name: false;
        
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
}
