import { Validator } from './validator';
import { Unset } from '../validators/index';

export class Structure {
  public name: string
  public interface: { [index: string]: Validator[] } = {}

  public constructor(name: string, ...indexes: string[]) {
    this.name = name;

    indexes.forEach((index) => {
      this.interface[index] = [new Validator()];
    });

    this.interface.id = [new Unset()];
  }

  public validate(index: string, value: string): boolean {
    return this.interface[index].every(validator => validator.validate(value));
  }

  public loadValidator(index: string, validator: Validator): Structure {
    this.interface[index].push(validator);

    return this;
  }

  public clearValidators(): Structure {
    Object.keys(this.interface).forEach((item) => {
      this.interface[item] = [this.interface[item][0]];
    });

    return this;
  }
}
