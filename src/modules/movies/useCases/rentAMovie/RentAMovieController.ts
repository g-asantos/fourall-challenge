
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RentAMovieUseCase } from './RentAMovieUseCase';

class RentAMovieController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {title} = request.body;

        const rentAMovieUseCase = container.resolve(RentAMovieUseCase);

        const movieRented = await rentAMovieUseCase.execute(title);

        return response.json(movieRented);
    }
}

export { RentAMovieController };
