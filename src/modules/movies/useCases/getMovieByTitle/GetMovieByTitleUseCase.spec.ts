

import { MoviesRepositoryInMemory } from "../../repositories/in-memory/MoviesRepositoryInMemory";
import { GetMovieByTitleUseCase } from "./GetMovieByTitleUseCase";


let getMovieByTitleUseCase: GetMovieByTitleUseCase;
let moviesRepositoryInMemory: MoviesRepositoryInMemory;

describe("Get Movie By Title", () => {

    beforeEach(() => {
      moviesRepositoryInMemory = new MoviesRepositoryInMemory();
      getMovieByTitleUseCase = new GetMovieByTitleUseCase(moviesRepositoryInMemory);
    })


    it("Should return a movie by title", async () => {

      const movieByTitle = await getMovieByTitleUseCase.execute("Grease");


      expect(movieByTitle[0]).toHaveProperty("id");

    })

})
