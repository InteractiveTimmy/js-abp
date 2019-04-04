import { DataMiddleware } from '../models/data-middleware';
import { Validator } from '../models/validator';
import { Payload } from '../models/payload';

export class ForeignKey<DM> extends Validator {
  private dm: DataMiddleware<DM>
  private endpoint: string
  private foreignKey: string

  public constructor(dm: DataMiddleware<DM>, endpoint: string, foreignKey: string) {
    super();
    this.dm = dm;
    this.endpoint = endpoint;
    this.foreignKey = foreignKey;
  }

  public validate(value: string): boolean {
    const { dm, endpoint, foreignKey } = this;

    const payload = new Payload(
      'read',
      endpoint,
      null,
      'yes',
      null,
    );

    const input: { [index: string]: string } = {};
    input[foreignKey] = value;

    payload.setInput({ ...input });

    const { output } = dm.read(payload);

    if (output.length === 1) {
      return true;
    }
    return false;
  }
}
