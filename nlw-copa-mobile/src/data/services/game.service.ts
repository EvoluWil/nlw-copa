import { api } from './api/api.service';

class GameServiceClass {
  async getGames(pollId: string) {
    const { data } = await api.get(`/polls/${pollId}/games`);
    return data;
  }
}

export const GameService = new GameServiceClass();
