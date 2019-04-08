export class Instance {
    constructor(dm) {
        this.cm = [];
        this.st = {};
        if (dm.type !== 'data') {
            throw new Error('must be initialized with middleware of type data');
        }
        this.dm = dm;
        this.dm.setParent(this);
    }
    handle(payload) {
        const { dm } = this;
        const { state } = payload;
        payload.output.log();
        switch (state) {
            case 'received':
                dm.handle(payload);
                break;
            case 'processed':
                payload.parent.handle(payload);
                break;
            case 'sent':
                break;
            default:
        }
    }
    loadMiddleware(...middleware) {
        return new Promise((resolve) => {
            const { cm, st } = this;
            middleware.forEach((item) => {
                if (item.type === 'data') {
                    throw new Error('cannot load middleware of type data');
                }
                else if (cm.includes(item)) {
                    throw new Error('cannot load duplicates of middleware');
                }
            });
            Promise.all([
                ...middleware.map(item => item.load(...Object.keys(st).map(key => st[key]))),
            ])
                .then(() => {
                cm.push(...middleware);
                middleware.forEach((item) => {
                    item.setParent(this);
                });
                resolve();
            });
        });
    }
    unloadMiddleware(...middleware) {
        return new Promise((resolve) => {
            const { cm, st } = this;
            const myMiddleware = middleware.filter(item => (!cm.includes(item)));
            Promise.all([
                ...myMiddleware.map(item => item.unload(...Object.keys(st).map(key => st[key]))),
            ])
                .then(() => {
                myMiddleware.forEach((item) => {
                    item.setParent();
                    cm.splice(cm.indexOf(item), 1);
                });
                resolve();
            });
        });
    }
    loadStructure(...structures) {
        return new Promise((resolve) => {
            const { dm, cm, st } = this;
            const myStructures = structures.filter(structure => (!st[structure.dataset]));
            dm.load(...myStructures)
                .then(() => Promise.all([
                ...cm.map(item => item.load(...myStructures)),
            ]))
                .then(() => {
                myStructures.forEach((structure) => {
                    st[structure.dataset] = structure;
                });
                resolve();
            });
        });
    }
    unloadStructure(...structures) {
        return new Promise((resolve) => {
            const { dm, cm, st } = this;
            Promise.all([
                ...cm.map(item => item.unload(...structures)),
            ])
                .then(() => dm.unload(...structures))
                .then(() => {
                structures.forEach((structure) => {
                    if (st[structure.dataset]) {
                        delete st[structure.dataset];
                    }
                });
                resolve();
            });
        });
    }
    start() {
        return new Promise((resolve) => {
            const { dm, cm } = this;
            dm.start()
                .then((r) => this.loadStructure(...r))
                .then(() => Promise.all([
                ...cm.map(item => item.start()),
            ]))
                .then(() => {
                this.active = true;
                resolve();
            });
        });
    }
    stop() {
        return new Promise((resolve) => {
            const { cm, dm } = this;
            Promise.all([...cm.map(item => item.stop)])
                .then(() => dm.stop())
                .then(() => {
                resolve();
            });
        });
    }
}
