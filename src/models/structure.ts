// dependencies
import { Validator } from './validator';

// class is used as primary entity for generating data on all middleware
export class Structure {
  public dataset: string // stores the dataset being used
  public validators: { [index: string]: Validator[] } = {} // stores keyed validators

  public constructor(dataset: string, ...keys: string[]) {
    // set constructor params
    this.dataset = dataset;

    // iterate over keys and generate base validators
    keys.forEach((key) => {
      this.validators[key] = [new Validator()];
    });

    // if id was not a key, generate a non-required id validator
    if (!keys.includes('id')) {
      this.validators.id = [new Validator(false)];
    }
  }

  // validates a value against a key
  public validate(key: string, value: string): boolean {
    return this.validators[key].every(validator => validator.validate(value));
  }

  // loads a validator for a key then returns self
  public loadValidator(key: string, validator: Validator): Structure {
    // confirm validator doesn't already exist for key
    if (!this.validators[key].includes(validator)) {
      this.validators[key].push(validator);
    }

    return this;
  }

  // clears validators from class object validator arrays and returns self
  public clearValidators(...validators: Validator[]): Structure {
    // confirm a validator was listed
    if (validators.length === 0) {
      // set validators for key value to base validator
      Object.keys(this.validators).forEach((key) => {
        this.validators[key] = [this.validators[key][0]];
      });
    } else {
      // loop through validators and remove any if they match what was passed in
      Object.keys(this.validators).forEach((validatorGroup) => {
        validators.forEach((validator) => {
          if (this.validators[validatorGroup].includes(validator)) {
            this.validators[validatorGroup].splice(this.validators[validatorGroup].indexOf(validator), 1);
          }
        });
      });
    }

    return this;
  }
}
