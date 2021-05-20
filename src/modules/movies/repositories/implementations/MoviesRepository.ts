import { getRepository, Repository } from 'typeorm';

import { Movie } from '../../entities/Movie';
import { IMoviesRepository } from '../IMoviesRepository';

class MoviesRepository implements IMoviesRepository {
    private repository: Repository<Movie>;

    private static INSTANCE: MoviesRepository;

    constructor() {
        this.repository = getRepository(Movie);
    }

    async list(): Promise<Movie[]> {
        const movies = await this.repository.find();
        console.log(movies, "here");
        return movies;
    }

    async findByName(name: string): Promise<Movie> {
        const movie = await this.repository.findOne(
            name
        );
        return movie;
    }

    async rentMovie(movieId: string): Promise<Movie> {
      const movie = await this.repository.findOne({
        id: movieId
      });

      movie.rented = true;

      return this.repository.save(movie);

    }
    async returnMovie(movieId: string): Promise<Movie> {
      const movie = await this.repository.findOne({
        id: movieId
      });

      movie.rented = false;

      return this.repository.save(movie);

    }


}

export { MoviesRepository };
