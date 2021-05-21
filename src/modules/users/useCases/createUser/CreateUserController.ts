import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';
import {IUser} from '../../dtos/IUserDto'

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        const createUserUseCase = container.resolve(CreateUserUseCase);

        await createUserUseCase.execute({
            name,
            email,
            password,
        });

        const formattedUser: IUser = {
          name,
          email
        }

        return response.status(201).send(formattedUser);
    }
}

export { CreateUserController };
