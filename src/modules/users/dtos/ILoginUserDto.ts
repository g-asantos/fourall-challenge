import { User } from "../entities/User";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}


export { IRequest, IResponse };
