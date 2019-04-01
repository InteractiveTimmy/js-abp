export class Instance {
    constructor(dataMiddleware, connectMiddleware) {
        this.structures = [];
        this.dataMiddleware = dataMiddleware;
        this.connectMiddleware = connectMiddleware;
        this.connectMiddleware.receive = (payload) => {
            this.dataMiddleware[payload.type](payload);
            this.connectMiddleware.send(payload);
        };
    }
    load(...structures) {
        this.dataMiddleware.load(...structures);
        this.connectMiddleware.load(...structures);
        structures.forEach((structure) => {
            this.structures.push(structure);
        });
        return this;
    }
}
