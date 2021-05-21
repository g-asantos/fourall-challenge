import { container } from 'tsyringe';


import { UsersRepository } from '../../modules/users/repositories/implementations/UsersRepository'
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository';
import { IMoviesRepository } from '../../modules/movies/repositories/IMoviesRepository';
import { MoviesRepository } from '../../modules/movies/repositories/implementations/MoviesRepository';
import IHashProvider from '../../modules/users/providers/HashProvider/models/IHashProvider';
import BCryptHashProvider from '../../modules/users/providers/HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IMoviesRepository>(
  'MoviesRepository',
  MoviesRepository,
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);


container.registerSingleton<IHashProvider>(
  'HashProvider',
  BCryptHashProvider);
