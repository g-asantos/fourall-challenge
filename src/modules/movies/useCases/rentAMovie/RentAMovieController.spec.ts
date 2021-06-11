import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { app } from "../../../../app";

interface IData{
  user: {
    id: string,
    name: string,
    email: string,
    password: string,
    created_at: string,
  },
  token: string,
}

interface IResponseData{
    id: string,
    name: string,
    email: string,
    password: string,
    created_at: string,
    rented: boolean,
}

let connection: Connection;
let data: IData;
let responseData: IResponseData;

describe("Rent A Movie Controller", () => {

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    await request(app).post("/users").send({
      name: "testname",
      password: "testpass",
      email: "test@tesmail.com"
    });

    const response = await request(app).post("/users/login")
    .send({
      email: "test@tesmail.com",
      password: "testpass"
    })

    data = JSON.parse(response.text);

    await connection.query("INSERT INTO movies (id,title, director, rented) VALUES ('$2y$12$8vplEbMRsgO1zKID3DpWgu6KfqePdnDMO2o/ns3Hr0D1/exijwKZi','Pulp Fiction', 'Tarantino', false)");
    await connection.query("INSERT INTO movies (id,title, director, rented) VALUES ('$2a$10$NYFZ/8WaQ3Qb6FCs.00jce4nxX9w7AkgWVsQCG6oUwTAcZqP9Flqu','Grease', 'Randal Kleiser', true)");
    await connection.query("INSERT INTO movies (id,title, director, rented) VALUES ('$2y$12$m/Wlt54fo0aUwvlrQVia/u4zZB6iFszyzZFOjZQ8HYdyljtVbdLNW','Alien', 'Ridley Scott', false)");

  })

  afterAll(async() => {
    await connection.dropDatabase();
    await connection.close();
  })

  it("Should rent a movie", async () => {

    const base = {
      "Authorization": `Bearer ${data.token}`,
      "Content-Type": "application/json"
    }

    const response = await request(app).patch("/movies/rent").set(base).send(
      {
        "title": "Pulp Fiction"
      }
    );

    responseData = JSON.parse(response.text);

    expect(response.status).toBe(200);
    expect(response.text).not.toHaveLength(0);
    expect(responseData.rented).toBe(true);
  })



  it("Should not rent a movie that does not exist", async () => {
    const base = {
      "Authorization": `Bearer ${data.token}`,
      "Content-Type": "application/json"
    }

    const response = await request(app).patch("/movies/rent").set(base).send(
      {
        "title": "nonexistentmovie"
      }
    );

    expect(response.status).toBe(400);
  })

  it("It shouldnt rent a movie with invalid token", async () => {

    const base = {
      "Authorization": `Bearer invalidtokendata`,
      "Content-Type": "application/json"
    }

    const response = await request(app).patch("/movies/rent").set(base).send(
      {
        "title": "Pulp Fiction"
      }
    );

    expect(response.status).toBe(401);
  })

})
