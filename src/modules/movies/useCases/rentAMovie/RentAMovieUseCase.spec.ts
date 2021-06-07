

import AppError from "../../../../shared/errors/AppError";
import { MoviesRepositoryInMemory } from "../../repositories/in-memory/MoviesRepositoryInMemory";
import { RentAMovieUseCase } from "./RentAMovieUseCase";


let rentAMovieUseCase: RentAMovieUseCase;
let moviesRepositoryInMemory: MoviesRepositoryInMemory;

describe("Get All Movies", () => {

    beforeEach(() => {
      moviesRepositoryInMemory = new MoviesRepositoryInMemory();
      rentAMovieUseCase = new RentAMovieUseCase(moviesRepositoryInMemory);
    })


    it("Should rent a movie", async () => {

      const movieRent = await rentAMovieUseCase.execute("Alien");

      expect(movieRent).toHaveProperty("id");
      expect(movieRent.rented).toBe(true);

    })

    it("Should not rent a movie that is not available", async () => {

      expect(async () => {
      await rentAMovieUseCase.execute("Grease");
      }).rejects.toBeInstanceOf(AppError);


    })

})
