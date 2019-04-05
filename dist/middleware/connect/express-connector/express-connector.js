import Express, { json, } from 'express';
import { Payload } from '../../../models/index';
import { uuid } from '../../../utils/index';
export class ExpressConnector {
    constructor(config) {
        this.structures = [];
        this.responses = {};
        this.config = {};
        this.config = config;
        this.wsc = Express();
    }
    getExpressConfig() {
        return this.wsc;
    }
    getHttpServer() {
        return this.wsi;
    }
    load(...structures) {
        this.structures = [...structures];
        const { wsc, ready, active, start, stop, receive, } = this;
        const wasActive = active;
        if (wasActive) {
            stop();
        }
        structures.forEach((structure) => {
            wsc.all(`/api/v1/${structure.name}/:id?`, json(), (req, res) => {
                let method;
                switch (req.method) {
                    case 'POST':
                        method = 'create';
                        break;
                    case 'GET':
                        method = 'read';
                        break;
                    case 'PUT':
                        method = 'update';
                        break;
                    case 'DELETE':
                        method = 'remove';
                        break;
                    default:
                }
                const myUUID = uuid();
                const payload = new Payload(method, structure.name, req.params.id, req.get('Authorization'), myUUID);
                const myInput = {};
                Object.keys(req.query).forEach((queryKey) => {
                    myInput[queryKey] = req.query[queryKey];
                });
                Object.keys(req.body).forEach((bodyKey) => {
                    myInput[bodyKey] = req.body[bodyKey];
                });
                payload.setInput(Object.assign({}, myInput));
                if (method) {
                    if (this.receive) {
                        this.responses[myUUID] = res;
                        receive(payload);
                    }
                }
            });
        });
        if (wasActive) {
            start();
        }
        if (!ready) {
            this.ready = true;
        }
        return this;
    }
    send(payload) {
        const res = this.responses[payload.id];
        const responseObj = payload.output.get();
        res.send(responseObj);
        delete this.responses[payload.id];
    }
    start() {
        if (this.ready && !this.active) {
            const { port } = this.config;
            this.wsi = this.wsc.listen(port);
        }
        return this;
    }
    stop() {
        if (this.active) {
            this.wsi.close();
        }
        return this;
    }
}
