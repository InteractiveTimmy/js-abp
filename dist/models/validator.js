export class Validator {
    constructor(truthy = true) {
        this.truthy = truthy;
    }
    validate(value) {
        const { truthy } = this;
        if (value) {
            return truthy;
        }
        return !truthy;
    }
}
