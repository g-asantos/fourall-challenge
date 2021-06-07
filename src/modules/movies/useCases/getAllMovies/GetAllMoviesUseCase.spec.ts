

import { MoviesRepositoryInMemory } from "../../repositories/in-memory/MoviesRepositoryInMemory";
import { GetAllMoviesUseCase } from "./GetAllMoviesUseCase";


let getAllMoviesUseCase: GetAllMoviesUseCase;
let moviesRepositoryInMemory: MoviesRepositoryInMemory;

describe("Get All Movies", () => {

    beforeEach(() => {
      moviesRepositoryInMemory = new MoviesRepositoryInMemory();
      getAllMoviesUseCase = new GetAllMoviesUseCase(moviesRepositoryInMemory);
    })


    it("Should return a list of movies", async () => {
      const moviesArray = [{
        "id": "$2a$10$NYFZ/8WaQ3Qb6FCs.00jce4nxX9w7AkgWVsQCG6oUwTAcZqP9Flqu",
        "title": "Grease",
        "director": "Randal Kleiser",
        "rented": true,
        "created_at": new Date("2021-05-22T18:10:30.000Z")
      },
      {
        "id": "$2y$12$8vplEbMRsgO1zKID3DpWgu6KfqePdnDMO2o/ns3Hr0D1/exijwKZi",
        "title": "Pulp Fiction",
        "director": "Tarantino",
        "rented": true,
        "created_at": new Date("2021-05-22T18:10:30.000Z")
      },
      {
        "id": "$2y$12$m/Wlt54fo0aUwvlrQVia/u4zZB6iFszyzZFOjZQ8HYdyljtVbdLNW",
        "title": "Alien",
        "director": "Ridley Scott",
        "rented": false,
        "created_at": new Date("2021-05-22T18:10:30.000Z")
      }];


      const moviesRegistered = await getAllMoviesUseCase.execute();


      expect(moviesArray).toEqual(moviesRegistered);
    })


})
