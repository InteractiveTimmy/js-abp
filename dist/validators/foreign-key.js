import { Validator } from '../models/validator';
import { Payload } from '../models/payload';
export class ForeignKey extends Validator {
    constructor(dm, endpoint, foreignKey) {
        super();
        this.dm = dm;
        this.endpoint = endpoint;
        this.foreignKey = foreignKey;
    }
    validate(value) {
        const { dm, endpoint, foreignKey } = this;
        const payload = new Payload('read', endpoint, null, 'yes', null);
        const input = {};
        input[foreignKey] = value;
        payload.setInput(Object.assign({}, input));
        const { output } = dm.read(payload);
        if (output.length === 1) {
            return true;
        }
        return false;
    }
}
