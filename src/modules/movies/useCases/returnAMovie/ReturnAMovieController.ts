
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ReturnAMovieUseCase } from './ReturnAMovieUseCase';

class ReturnAMovieController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {movieId} = request.body;

        const rentAMovieUseCase = container.resolve(ReturnAMovieUseCase);

        const movieRented = await rentAMovieUseCase.execute(movieId);

        return response.json(movieRented);
    }
}

export { ReturnAMovieController };
