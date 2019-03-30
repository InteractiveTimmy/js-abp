export class Payload {
    constructor(type, dataset, identifier, authorization) {
        this.input = {};
        this.output = {};
        this.type = type;
        this.dataset = dataset;
        this.identifier = identifier;
        this.authorization = authorization;
    }
    setInput(input) {
        this.input = input || {};
        return this;
    }
    setOutput(output) {
        this.output = output;
        return this;
    }
}
