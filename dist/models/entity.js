import { json } from 'express';
class Entity {
    constructor(name, version, struct) {
        this.name = name;
        this.version = version;
        this.structure = struct;
        this.endpoint = `/api/v${version}/${name}/`;
    }
    mount(app) {
        const { endpoint } = this;
        app.all(`${endpoint}:id`, json(), (req, res) => {
        });
    }
    handle(payload) {
        return this;
    }
}
export default Entity;
