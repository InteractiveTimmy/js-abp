import { Message } from './message';
export class Payload {
    constructor(type, dataset, identifier, authorization, id) {
        this.input = {};
        this.type = type;
        this.dataset = dataset;
        this.identifier = identifier;
        this.authorization = authorization;
        this.id = id;
        this.output = new Message('');
    }
    setInput(input) {
        this.input = input || {};
        return this;
    }
    setOutput(output, reason) {
        this.output.set(output, reason);
        return this;
    }
}
