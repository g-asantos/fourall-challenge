import { inject, injectable } from 'tsyringe';

import { Movie } from '../../entities/Movie';
import { IMoviesRepository } from '../../repositories/IMoviesRepository';

@injectable()
class GetMovieByTitleUseCase {
    constructor(
        @inject('MoviesRepository')
        private moviesRepository: IMoviesRepository,
    ) {}

    async execute(title: string): Promise<Movie[]> {
        const movies = await this.moviesRepository.findByTitle(title);

        return movies;
    }
}

export { GetMovieByTitleUseCase };
