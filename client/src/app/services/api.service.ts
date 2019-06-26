import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieDto } from '../shared/dto/movie.dto';
import { APP_CONFIG } from '../shared/configuration/appconfig.constants';
import { IAppConfig } from '../shared/configuration/appconfig.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient, @Inject(APP_CONFIG) private config: IAppConfig) { 
  }

  createMovie(movie: MovieDto) {
    return this.httpClient.post<MovieDto>(`${this.config.API_URL}/movies/`, movie, {observe: 'response'});
  }
  
  updateMovie(movie: MovieDto) {
    return this.httpClient.put(`${this.config.API_URL}/movies/${movie.id}`, movie, {observe: 'response'});
  }

  deleteMovie(id: number ) {
    return this.httpClient.delete(`${this.config.API_URL}/movies/${id}`, {observe: 'response'});
  }

  getMovies() {
    return this.httpClient.get<MovieDto[]>(`${this.config.API_URL}/movies`, {observe: 'response'});
  }
}
