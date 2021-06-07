import AppError from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDto";
import BCryptHashProvider from "../../providers/HashProvider/implementations/BCryptHashProvider";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import LoginUserUseCase from "./LoginUserUseCase";


let loginUserUseCase: LoginUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let hashProvider: BCryptHashProvider;

describe("Authenticate User", () => {

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    hashProvider = new BCryptHashProvider();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    loginUserUseCase = new LoginUserUseCase(usersRepositoryInMemory, hashProvider);
  })


  it("should be able to authenticate an user", async () => {

    const user: ICreateUserDTO = {
      name: "Testman",
      email: "testmail@hotmail.com",
      password: "testpass",
    }

    await createUserUseCase.execute(user);

    const result = await loginUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  })

  it("should not be able to authenticate non existent user", async () => {

    expect(async () => {
      await loginUserUseCase.execute({
        email: "nonexistent@email.com",
        password: "fakepass",
      });
    }).rejects.toBeInstanceOf(AppError);

  })

  it("should not be able to authenticate with incorrect password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "wrongpass",
        email: "wrongpass@hotmail.com",
        password: "wrongpass",
      }

      await createUserUseCase.execute(user);

      await loginUserUseCase.execute({
        email: user.email,
        password: "lul"
      })
    }).rejects.toBeInstanceOf(AppError)
  })

})
