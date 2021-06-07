import { getRepository, Repository,getManager } from 'typeorm';
import AppError from '../../../../shared/errors/AppError';

import { Movie } from '../../entities/Movie';
import { IMoviesRepository } from '../IMoviesRepository';

class MoviesRepository implements IMoviesRepository {
    private repository: Repository<Movie>;
    private entityManager = getManager();

    constructor() {
        this.repository = getRepository(Movie);
    }

    async list(): Promise<Movie[]> {
        const movies = await this.entityManager.query(`SELECT * FROM movies`);
        return movies;
    }

    async findByTitle(title: string): Promise<Movie[]> {
        const movie = this.entityManager.query(`SELECT * FROM movies WHERE title = "${title}"`);
        return movie;
    }

    async rentMovie(title: string): Promise<Movie> {
      const movies = await this.entityManager.query(`SELECT * FROM movies WHERE title = "${title}"`);

      const availableMovies: Movie[] = movies.filter((movie: Movie) => movie.rented !== true);

      if(availableMovies.length === 0){
        throw new AppError('Movie is not available');
      }

      availableMovies[0].rented = true;

      return this.repository.save(availableMovies[0]);

    }
    async returnMovie(movieId: string): Promise<Movie> {
      const movie = await this.repository.findOne({
        id: movieId
      });

      if(!movie){
        throw new AppError('Movie does not exist');
      }

      movie.rented = false;

      return this.repository.save(movie);

    }


}

export { MoviesRepository };
