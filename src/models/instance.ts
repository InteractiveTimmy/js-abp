// internal dependencies
import { Structure } from './structure';
import { DataMiddleware } from './data-middleware';
import { InterfaceMiddleware } from './interface-middleware';

export class Instance<DM, IM> {
  protected dataMiddleware: DataMiddleware<DM>
  protected instanceMiddleware: InterfaceMiddleware<IM>
  protected readonly structures: Structure[] = []

  public constructor(dataMiddleware: DataMiddleware<DM>, instanceMiddleware: InterfaceMiddleware<IM>) {
    this.dataMiddleware = dataMiddleware;
    this.instanceMiddleware = instanceMiddleware;
  }

  public load(...structures: Structure[]): Instance<DM, IM> {
    this.dataMiddleware.load(...structures);
    // this.instanceMiddleware.load(...structures);

    structures.forEach((structure) => {
      this.structures.push(structure);
    });

    return this;
  }
}
