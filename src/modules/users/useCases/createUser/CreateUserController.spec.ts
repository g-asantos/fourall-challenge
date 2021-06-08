import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { app } from "../../../../app";


let connection: Connection;

describe("Create User Controller", () => {

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();


    await connection.query(
      `DELETE FROM users WHERE name='testname'`
    )
  })

  afterAll(async() => {
    await connection.dropDatabase();
    await connection.close();
  })



  it("should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      name: "testname",
      password: "testpass",
      email: "test@tesmail.com"
    });

    expect(response.status).toBe(201);
  })


  it("should not create an user with same credentials", async () => {
    const response = await request(app).post("/users").send({
      name: "testname",
      password: "testpass",
      email: "test@tesmail.com"
    });

    expect(response.status).toBe(400);
  })

})
