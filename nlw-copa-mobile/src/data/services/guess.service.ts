import { api } from './api/api.service';

class GuessServiceClass {
  async createGuess(
    pollId: string,
    gameId: string,
    firstTeamPoints: string,
    secondTeamPoints: string
  ) {
    const { data } = await api.post(
      `/polls/${pollId}/games/${gameId}/guesses`,
      {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints)
      }
    );
    return data;
  }
}

export const GuessService = new GuessServiceClass();
