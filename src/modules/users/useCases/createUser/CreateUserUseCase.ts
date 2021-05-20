
import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

// import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDto';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    async execute({
        name,
        email,
        password,
    }: ICreateUserDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new Error('User already exists');
        }

        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
            email,
            name,
            password: passwordHash,
        });
    }
}

export { CreateUserUseCase };
