import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { app } from "../../../../app";


let connection: Connection;

describe("Create User Controller", () => {

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    await request(app).post("/users").send({
      name: "testname",
      password: "testpass",
      email: "test@tesmail.com"
    });
  })

  afterAll(async() => {
    await connection.dropDatabase();
    await connection.close();
  })



  it("should be able to login", async () => {
    const response = await request(app).post("/users/login")
    .send({
      email: "test@tesmail.com",
      password: "testpass"
    })

    expect(response.status).toBe(200);
  })


  it("should not login with wrong email", async () => {
    const response = await request(app).post("/users/login")
    .send({
      email: "wrongmail@wrongmail.com",
      password: "testpass"
    })

    expect(response.status).toBe(401);
  })

  it("should not login with wrong password", async () => {
    const response = await request(app).post("/users/login")
    .send({
      email: "test@tesmail.com",
      password: "wrongpass"
    })

    expect(response.status).toBe(401);
  })

})
