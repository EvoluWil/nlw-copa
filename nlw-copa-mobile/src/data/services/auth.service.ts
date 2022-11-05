import { User } from '../models/user.model';
import { api } from './api/api.service';

type SignInResponse = {
  user: User;
  token: string;
};

class AuthServiceClass {
  async signIn(accessToken: string) {
    const { data } = await api.post<SignInResponse>('/sign-in', {
      accessToken
    });
    return data;
  }

  async getMe() {
    const { data } = await api.get<User>('/me');
    return data;
  }
}

export const AuthService = new AuthServiceClass();
