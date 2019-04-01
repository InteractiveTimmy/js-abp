import { Structure } from './structure';
import { Payload } from './payload';
export interface InterfaceMiddleware<Self> {
    load: (...structures: Structure[]) => Self;
    receive: (payload: Payload) => void;
    send: (payload: Payload) => void;
}
