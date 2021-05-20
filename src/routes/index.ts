import { Router } from 'express';
import { usersRoutes } from './users.routes';
import { moviesRoutes } from './movies.routes'

const router = Router();

router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);

export { router };
