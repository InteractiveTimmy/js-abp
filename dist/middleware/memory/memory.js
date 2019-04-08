import { Middleware } from '../../models/middleware';
import { uuid } from '../../utils/uuid';
export class Memory extends Middleware {
    constructor() {
        super('data');
        this.database = {};
        this.structures = [];
    }
    load(...structures) {
        return new Promise((resolve) => {
            const { database } = this;
            structures.forEach((structure) => {
                database[structure.dataset] = [];
                this.structures.push(structure);
            });
            resolve();
        });
    }
    handle(payload) {
        const { method } = payload;
        switch (method) {
            case 'create':
                this.create(payload);
                payload.setState('processed');
                this.parent.handle(payload);
                break;
            default:
        }
    }
    create(payload) {
        const { dataset, input } = payload;
        const { database, structures } = this;
        const data = database[dataset];
        const structure = structures.find(struct => struct.dataset === dataset);
        const canCreate = Object.keys(structure.validators).every(key => structure.validate(key, input[key]));
        const item = Object.assign({ id: uuid() }, input);
        if (canCreate) {
            data.push(item);
            payload.output.set(item);
        }
        else {
            payload.setSuccess(false);
            payload.output.set({
                reason: 'payload failed validation',
                resolution: 'check your payload structure',
            });
        }
    }
}
