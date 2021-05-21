import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import LoginUserUseCase from '../loginUser/LoginUserUseCase';

export default class LoginUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const loginUseruseCase = container.resolve(LoginUserUseCase);

    const { user, token } = await loginUseruseCase.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}
