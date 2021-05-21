
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RentAMovieUseCase } from './RentAMovieUseCase';

class RentAMovieController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {movieId} = request.body;

        const rentAMovieUseCase = container.resolve(RentAMovieUseCase);

        const movieRented = await rentAMovieUseCase.execute(movieId);

        return response.json(movieRented);
    }
}

export { RentAMovieController };
