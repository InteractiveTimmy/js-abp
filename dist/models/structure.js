import { Validator } from './validator';
export class Structure {
    constructor(dataset, ...keys) {
        this.validators = {};
        this.dataset = dataset;
        keys.forEach((key) => {
            this.validators[key] = [new Validator()];
        });
        if (!keys.includes('id')) {
            this.validators.id = [new Validator(false)];
        }
    }
    validate(key, value) {
        return this.validators[key].every(validator => validator.validate(value));
    }
    loadValidator(key, validator) {
        if (!this.validators[key].includes(validator)) {
            this.validators[key].push(validator);
        }
        return this;
    }
    clearValidators(...validators) {
        if (validators.length === 0) {
            Object.keys(this.validators).forEach((key) => {
                this.validators[key] = [this.validators[key][0]];
            });
        }
        else {
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
