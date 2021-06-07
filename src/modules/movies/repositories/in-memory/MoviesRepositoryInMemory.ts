import AppError from "../../../../shared/errors/AppError";
import { Movie } from "../../entities/Movie";
import { IMoviesRepository } from "../IMoviesRepository";

class MoviesRepositoryInMemory implements IMoviesRepository{

  movies: Movie[] = [{
    "id": "$2a$10$NYFZ/8WaQ3Qb6FCs.00jce4nxX9w7AkgWVsQCG6oUwTAcZqP9Flqu",
    "title": "Grease",
    "director": "Randal Kleiser",
    "rented": true,
    "created_at": new Date("2021-05-22T18:10:30.000Z")
  },
  {
    "id": "$2y$12$8vplEbMRsgO1zKID3DpWgu6KfqePdnDMO2o/ns3Hr0D1/exijwKZi",
    "title": "Pulp Fiction",
    "director": "Tarantino",
    "rented": true,
    "created_at": new Date("2021-05-22T18:10:30.000Z")
  },
  {
    "id": "$2y$12$m/Wlt54fo0aUwvlrQVia/u4zZB6iFszyzZFOjZQ8HYdyljtVbdLNW",
    "title": "Alien",
    "director": "Ridley Scott",
    "rented": false,
    "created_at": new Date("2021-05-22T18:10:30.000Z")
  }];


  async findByTitle(title: string): Promise<Movie[]> {
    const movieFound = this.movies.filter(movie => movie.title === title);

    return movieFound;
  }

  async list(): Promise<Movie[]> {
    return this.movies;
  }
  async rentMovie(title: string): Promise<Movie> {

    const movieFound = this.movies.filter(movie => movie.title === title);

    const availableMovies = movieFound.filter((movie: Movie) => movie.rented !== true);

    if(availableMovies.length === 0){
      throw new AppError('Movie is not available');
    }

    availableMovies[0].rented = true;


    this.movies = this.movies.map((movie: Movie) => movie.id === availableMovies[0].id ? {
      ...availableMovies[0],
    } : movie)


    return availableMovies[0];
  }
  async returnMovie(movieId: string): Promise<Movie> {

    const movie = this.movies.find((movie: Movie) => movie.id === movieId);

    if(!movie){
      throw new AppError('Movie does not exist');
    }


    this.movies = this.movies.map((movie: Movie) => movie.id === movieId ? {
      ...movie,
      rented: false,
    }: movie);

    const changedMovie = this.movies.find((movie: Movie) => movie.id === movieId);

    return changedMovie;
  }

}

export {MoviesRepositoryInMemory};
