import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';


import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController';
import LoginUserController from '../modules/users/useCases/loginUser/LoginUserController';



const usersRoutes = Router();

const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();


usersRoutes.post('/', createUserController.handle);
usersRoutes.post(
  '/login',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  loginUserController.handle,
);



export { usersRoutes };
