// dependencies
import { uuid } from '../utils/uuid';
import { Validator } from './validator';

// class used to define data structure for a given dataset
export class Structure {
  public readonly name: string; // stores dataset name
  public readonly validators: { [index: string]: Validator[] }; // contains a list of validators

  public constructor(name: string, ...keys: string[]) {
    // validate parameters
    if (!name || typeof name !== 'string') { throw new Error('invalid parameter name'); }

    // assign properties
    Object.defineProperties(this, {
      name: { value: name || uuid(), writable: false },
      validators: { value: {}, writable: false },
    });

    // generate validator arrays for each key
    keys.forEach((key: string): void => {
      this.validators[key] = [];
    });

    // if no id key was specified, generate an id key
    if (!keys.includes('id')) {
      this.validators.id = [];
    }
  }

  public validate(key: string, value: string): boolean {
    // destructure
    const { validators } = this;

    // validate value
    if (!validators[key]) { return false; }
    return validators[key].every(
      (validator: Validator): boolean => validator.validate(value),
    );
  }

  public load(key: string, ...items: Validator[]): Structure {
    // destructure
    const { validators } = this;

    // validate params
    items.forEach((item: Validator): void => {
      if (!(item instanceof Validator)) { throw new Error('item is not instance of Validator'); }
    });
    if (!validators[key]) { throw new Error('key does not exist in structure'); }

    // iterate over items
    items.forEach((item: Validator): void => {
      // validate validators doesn't already contain validator
      if (!validators[key].includes(item)) {
        // load validator
        validators[key].push(item);
      }
    });

    return this;
  }

  public unload(key?: string, ...items: Validator[]): Structure {
    // destructure
    const { validators } = this;

    // validate params
    if (key && !this.validators[key]) { throw new Error('key does not exists in structure'); }
    if (items.length !== 0) {
      items.forEach((item: Validator): void => {
        if (!(item instanceof Validator)) { throw new Error('item is not instance of Validator'); }
      });
    }

    if (!key) { // no key specified
      // clear all validators
      Object.keys(validators).forEach((k: string): void => {
        validators[k] = [];
      });
    } else if (items.length === 0) { // no validators specified
      // clear all validators for key
      validators[key] = [];
    } else { // key and validators specified
      // clear all validators specified for key
      validators[key] = validators[key].filter(
        (validator: Validator): boolean => !items.includes(validator),
      );
    }

    return this;
  }
}
