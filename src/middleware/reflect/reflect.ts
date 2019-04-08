import { Middleware } from '../../models/middleware';
import { Payload } from '../../models/payload';

export class Reflect extends Middleware {
  public handle(payload: Payload): void {
    payload.output.set(payload.input);
    payload.setState('processed');
    this.parent.handle(payload);
  }
}
