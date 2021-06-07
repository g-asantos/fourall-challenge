import { ICreateUserDTO } from "../../dtos/ICreateUserDto";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository{

  users: User[] = [];


  async findById(id: string): Promise<User> {
    const userFound = this.users.find(user => user.id === id);

    return userFound;
  }
  async findByEmail(email: string): Promise<User> {
    const userFound = this.users.find(user => user.email === email);

    return userFound;
  }
  async create(data: ICreateUserDTO): Promise<void> {

    const user = new User();

    Object.assign(user, data);

    this.users.push(user);
  }

}

export {UsersRepositoryInMemory};
