import { Movie } from '../entities/Movie';



interface IMoviesRepository {
    findByTitle(title: string): Promise<Movie[]>;
    list(): Promise<Movie[]>;
    rentMovie(title: string): Promise<Movie>;
    returnMovie(movieId: string): Promise<Movie>;
}

export { IMoviesRepository };
