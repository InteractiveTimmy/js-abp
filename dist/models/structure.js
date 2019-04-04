import { Validator } from './validator';
import { Unset } from '../validators/index';
export class Structure {
    constructor(name, ...indexes) {
        this.interface = {};
        this.name = name;
        indexes.forEach((index) => {
            this.interface[index] = [new Validator()];
        });
        this.interface.id = [new Unset()];
    }
    validate(index, value) {
        return this.interface[index].every(validator => validator.validate(value));
    }
    loadValidator(index, validator) {
        this.interface[index].push(validator);
        return this;
    }
    clearValidators() {
        Object.keys(this.interface).forEach((item) => {
            this.interface[item] = [this.interface[item][0]];
        });
        return this;
    }
}
