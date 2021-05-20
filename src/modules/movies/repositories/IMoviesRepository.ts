import { Movie } from '../entities/Movie';



interface IMoviesRepository {
    findByName(name: string): Promise<Movie>;
    list(): Promise<Movie[]>;
    rentMovie(movieId: string): Promise<Movie>;
    returnMovie(movieId: string): Promise<Movie>;
}

export { IMoviesRepository };
