import { inject, injectable } from 'tsyringe';

import { Movie } from '../../entities/Movie';
import { IMoviesRepository } from '../../repositories/IMoviesRepository';

@injectable()
class ReturnAMovieUseCase {
    constructor(
        @inject('MoviesRepository')
        private moviesRepository: IMoviesRepository,
    ) {}

    async execute(movieId: string): Promise<Movie> {
        const movieRented = await this.moviesRepository.returnMovie(movieId);
        return movieRented;
    }
}

export { ReturnAMovieUseCase };
