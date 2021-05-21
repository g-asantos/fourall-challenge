import { inject, injectable } from 'tsyringe';

import { Movie } from '../../entities/Movie';
import { IMoviesRepository } from '../../repositories/IMoviesRepository';

@injectable()
class RentAMovieUseCase {
    constructor(
        @inject('MoviesRepository')
        private moviesRepository: IMoviesRepository,
    ) {}

    async execute(movieId: string): Promise<Movie> {
        const movieRented = await this.moviesRepository.rentMovie(movieId);
        return movieRented;
    }
}

export { RentAMovieUseCase };
