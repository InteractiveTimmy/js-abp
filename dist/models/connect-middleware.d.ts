import { Structure } from './structure';
import { Payload } from './payload';
export interface ConnectMiddleware<Self> {
    load: (...structures: Structure[]) => Self;
    start: () => Self;
    stop: () => Self;
    receive?: (payload: Payload) => void;
    send?: (payload: Payload) => void;
}
