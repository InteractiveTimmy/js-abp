import { Structure } from './structure';
import { Payload } from './payload';

export interface DataMiddleware<Self> {
  load: (...structures: Structure[]) => Self;
  create: (payload: Payload) => Payload;
  read: (payload: Payload) => Payload;
  update: (payload: Payload) => Payload;
  remove: (payload: Payload) => Payload;
}
