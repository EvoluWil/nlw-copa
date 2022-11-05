import { api } from './api/api.service';

class PollServiceClass {
  async createPoll(title: string) {
    const { data } = await api.post<{ code: string }>('/polls', {
      title
    });
    return data;
  }

  async getPolls() {
    const { data } = await api.get('/polls');
    return data;
  }

  async getPoll(code: string) {
    const { data } = await api.get(`/polls/${code}`);
    return data;
  }

  async joinPoll(code: string) {
    return api.post(`/polls/${code}/join`);
  }
}

export const PollService = new PollServiceClass();
