import { Router } from 'express';



import { GetAllMoviesController } from '../modules/movies/useCases/getAllMovies/GetAllMoviesController';
import { GetMovieByTitleController } from '../modules/movies/useCases/getMovieByTitle/GetMovieByTitleController';
import { RentAMovieController } from '../modules/movies/useCases/rentAMovie/RentAMovieController';
import { ReturnAMovieController } from '../modules/movies/useCases/returnAMovie/ReturnAMovieController';


const moviesRoutes = Router();

const getAllMoviesController = new GetAllMoviesController();

const rentAMovieController = new RentAMovieController();

const returnAMovieController = new ReturnAMovieController();

const getMovieByTitle = new GetMovieByTitleController();

moviesRoutes.get('/', getAllMoviesController.handle);

moviesRoutes.get('/title', getMovieByTitle.handle);

moviesRoutes.patch('/rent', rentAMovieController.handle);

moviesRoutes.patch('/return', returnAMovieController.handle);



export { moviesRoutes };
