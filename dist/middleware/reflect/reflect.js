import { Middleware } from '../../models/middleware';
export class Reflect extends Middleware {
    handle(payload) {
        payload.output.set(payload.input);
        payload.setState('processed');
        this.parent.handle(payload);
    }
}
