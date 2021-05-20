import { Router } from 'express';



import { GetAllMoviesController } from '../modules/movies/useCases/getAllMovies/GetAllMoviesController';


const moviesRoutes = Router();

const getAllMoviesController = new GetAllMoviesController();


moviesRoutes.get('/', getAllMoviesController.handle);


export { moviesRoutes };
