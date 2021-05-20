import { inject, injectable } from 'tsyringe';

import { Movie } from '../../entities/Movie';
import { IMoviesRepository } from '../../repositories/IMoviesRepository';

@injectable()
class GetAllMoviesUseCase {
    constructor(
        @inject('MoviesRepository')
        private moviesRepository: IMoviesRepository,
    ) {}

    async execute(): Promise<Movie[]> {
        const movies = await this.moviesRepository.list();

        return movies;
    }
}

export { GetAllMoviesUseCase };
