// internal dependencies
import { Structure } from './structure';
import { Payload } from './payload';
import { DataMiddleware } from './data-middleware';
import { ConnectMiddleware } from './connect-middleware';

export class Instance<DM, IM> {
  protected dataMiddleware: DataMiddleware<DM>
  protected connectMiddleware: ConnectMiddleware<IM>
  protected readonly structures: Structure[] = []

  public constructor(dataMiddleware: DataMiddleware<DM>, connectMiddleware: ConnectMiddleware<IM>) {
    this.dataMiddleware = dataMiddleware;
    this.connectMiddleware = connectMiddleware;

    this.connectMiddleware.receive = (payload: Payload): void => {
      this.dataMiddleware[payload.type](payload);
      this.connectMiddleware.send(payload);
    };
  }

  public load(...structures: Structure[]): Instance<DM, IM> {
    this.dataMiddleware.load(...structures);
    this.connectMiddleware.load(...structures);

    structures.forEach((structure) => {
      this.structures.push(structure);
    });

    return this;
  }
}
