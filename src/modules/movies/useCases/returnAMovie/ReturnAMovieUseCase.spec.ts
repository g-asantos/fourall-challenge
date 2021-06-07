

import AppError from "../../../../shared/errors/AppError";
import { MoviesRepositoryInMemory } from "../../repositories/in-memory/MoviesRepositoryInMemory";
import { ReturnAMovieUseCase } from "./ReturnAMovieUseCase";


let returnAMovieUseCase: ReturnAMovieUseCase;
let moviesRepositoryInMemory: MoviesRepositoryInMemory;

describe("Get All Movies", () => {

    beforeEach(() => {
      moviesRepositoryInMemory = new MoviesRepositoryInMemory();
      returnAMovieUseCase = new ReturnAMovieUseCase(moviesRepositoryInMemory);
    })


    it("Should return a movie", async () => {

      const returnedMovie = await returnAMovieUseCase.execute("$2a$10$NYFZ/8WaQ3Qb6FCs.00jce4nxX9w7AkgWVsQCG6oUwTAcZqP9Flqu");

      expect(returnedMovie).toHaveProperty("id");
      expect(returnedMovie.rented).toBe(false);
    })



    it("Should not return a movie that does not exist", async () => {

      expect(async () => {
      await returnAMovieUseCase.execute("fakeid");
      }).rejects.toBeInstanceOf(AppError);


    })
})
