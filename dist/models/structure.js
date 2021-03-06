export class Structure {
    constructor(name, ...indexes) {
        this.interface = {};
        this.name = name;
        indexes.forEach((index) => {
            this.interface[index] = [() => true];
        });
        this.interface.id = [() => false];
    }
    validate(index, value) {
        return this.interface[index].every(validator => validator(value));
    }
    loadValidator(index, validator) {
        this.interface[index].push(validator);
        return this;
    }
    clearValidators() {
        Object.keys(this.interface).forEach((item) => {
            this.interface[item] = [() => true];
        });
        return this;
    }
}
