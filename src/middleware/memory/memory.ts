import { Middleware } from '../../models/middleware';
import { Structure } from '../../models/structure';
import { Data } from '../../models/types';
import { Payload } from '../../models';
import { uuid } from '../../utils/uuid';

interface Database { [index: string]: Data[] }

export class Memory extends Middleware {
  protected database: Database
  protected structures: Structure[]

  public constructor() {
    super('data');

    this.database = {};
    this.structures = [];
  }

  public load(...structures: Structure[]): Promise<void> {
    return new Promise((resolve) => {
      const { database } = this;

      structures.forEach((structure: Structure): void => {
        database[structure.dataset] = [];

        this.structures.push(structure);
      });

      resolve();
    });
  }

  public handle(payload: Payload): void {
    const { method } = payload;

    switch (method) {
      case 'create':
        this.create(payload);
        payload.setState('processed');
        this.parent.handle(payload);
        break;

      default:
    }
  }

  protected create(payload: Payload): void {
    const { dataset, input } = payload;
    const { database, structures } = this;

    const data = database[dataset];
    const structure = structures.find(struct => struct.dataset === dataset);

    const canCreate = Object.keys(structure.validators).every(
      key => structure.validate(key, input[key]),
    );

    const item: Data = { id: uuid(), ...input };

    if (canCreate) {
      data.push(item);
      payload.output.set(item);
    } else {
      payload.setSuccess(false);
      payload.output.set({
        reason: 'payload failed validation',
        resolution: 'check your payload structure',
      });
    }
  }
}
