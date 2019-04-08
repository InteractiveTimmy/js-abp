import { uuid } from '../utils/index';
import { Message } from './message';
export class Payload {
    constructor(authorization, method, dataset, input, parent) {
        this.success = true;
        this.state = 'new';
        this.authorization = authorization;
        this.method = method;
        this.dataset = dataset;
        this.input = input;
        this.parent = parent;
        this.sid = uuid();
        this.cid = uuid();
        this.output = new Message(this);
    }
    setState(state) {
        this.state = state;
    }
    setSuccess(success) {
        this.success = success;
    }
}
