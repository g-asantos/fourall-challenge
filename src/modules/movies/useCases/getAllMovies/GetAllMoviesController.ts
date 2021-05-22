
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetAllMoviesUseCase } from './GetAllMoviesUseCase';

class GetAllMoviesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const getAllMoviesUseCase = container.resolve(GetAllMoviesUseCase);

        const all = await getAllMoviesUseCase.execute();

        const moviesFormatted = all.map(movie => {
          return {
            ...movie,
            rented: Boolean(movie.rented)
          }
        })

        return response.json(moviesFormatted);
    }
}

export { GetAllMoviesController };
