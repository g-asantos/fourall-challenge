
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetMovieByTitleUseCase } from './GetMovieByTitleUseCase';

class GetMovieByTitleController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {title} = request.body;

        const getMovieByTitle = container.resolve(GetMovieByTitleUseCase);

        const all = await getMovieByTitle.execute(title);

        const moviesFormatted = all.map(movie => {
          return {
            ...movie,
            rented: Boolean(movie.rented)
          }
        })


        return response.json(moviesFormatted);
    }
}

export { GetMovieByTitleController };
