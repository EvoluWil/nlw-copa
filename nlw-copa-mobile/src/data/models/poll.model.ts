import { Participant } from './participant.model';
import { User } from './user.model';

export interface Poll {
  id: string;
  code: string;
  title: string;
  ownerId: string;
  createdAt: string;
  owner: User;
  participants: Participant[];
}
