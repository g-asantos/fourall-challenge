
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetAllMoviesUseCase } from './GetAllMoviesUseCase';

class GetAllMoviesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const getAllMoviesUseCase = container.resolve(GetAllMoviesUseCase);

        const all = await getAllMoviesUseCase.execute();

        return response.json(all);
    }
}

export { GetAllMoviesController };
