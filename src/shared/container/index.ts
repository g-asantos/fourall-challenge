import { container } from 'tsyringe';


import { UsersRepository } from '../../modules/users/repositories/implementations/UsersRepository'
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository';
import { IMoviesRepository } from '../../modules/movies/repositories/IMoviesRepository';
import { MoviesRepository } from '../../modules/movies/repositories/implementations/MoviesRepository';


container.registerSingleton<IMoviesRepository>(
  'MoviesRepository',
  MoviesRepository,
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

