import AppError from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase"


let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;


describe("Create User", () => {

    beforeEach(() => {
      usersRepositoryInMemory = new UsersRepositoryInMemory();
      createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    })


    it("Should be able to create a new user", async () => {
      const user = {
        name: "Testman",
        email: "testmail@hotmail.com",
        password: "testpass",
      }


      await createUserUseCase.execute(user);

      const createdUser = await usersRepositoryInMemory.findByEmail(user.email);

      expect(createdUser).toHaveProperty("id");
    })

    it("Should not be able to create a new user with the same email", async () => {

      expect(async () => {
        const user = {
          name: "Testman",
          email: "testmail@hotmail.com",
          password: "testpass",
        }


        await createUserUseCase.execute(user);

        await createUserUseCase.execute(user);

      }).rejects.toBeInstanceOf(AppError);


    })

})
