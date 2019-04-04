import { Validator } from '../models/validator';

export class Unset extends Validator {
  // eslint-disable-next-line class-methods-use-this
  public validate(value: string): boolean {
    if (value) {
      return false;
    }
    return true;
  }
}
