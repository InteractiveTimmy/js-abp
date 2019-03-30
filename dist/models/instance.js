export class Instance {
    constructor(dataMiddleware, instanceMiddleware) {
        this.structures = [];
        this.dataMiddleware = dataMiddleware;
        this.instanceMiddleware = instanceMiddleware;
    }
    load(...structures) {
        this.dataMiddleware.load(...structures);
        structures.forEach((structure) => {
            this.structures.push(structure);
        });
        return this;
    }
}
