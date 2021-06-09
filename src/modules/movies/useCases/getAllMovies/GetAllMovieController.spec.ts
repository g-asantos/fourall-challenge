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

let connection: Connection;
let data: IData;

describe("Get All Movies Controller", () => {

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
  })

  afterAll(async() => {
    await connection.dropDatabase();
    await connection.close();
  })

  it("Should get all the movies", async () => {

    const base = {
      "Authorization": `Bearer ${data.token}`,
      "Content-Type": "application/json"
    }

    const response = await request(app).get("/movies").set(base);

    expect(response.status).toBe(200);
  })

  it("It shouldnt get all the movies with invalid token", async () => {

    const base = {
      "Authorization": `Bearer invalidtokendata`,
      "Content-Type": "application/json"
    }

    const response = await request(app).get("/movies").set(base);

    expect(response.status).toBe(401);
  })

})
