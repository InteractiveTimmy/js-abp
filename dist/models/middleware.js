export class Middleware {
    constructor(type, parent) {
        this.type = type;
        this.parent = parent;
    }
    start() {
        return new Promise((resolve) => { resolve(); });
    }
    stop() {
        return new Promise((resolve) => { resolve(); });
    }
    load(...structures) {
        return new Promise((resolve) => { resolve(); });
    }
    unload(...structures) {
        return new Promise((resolve) => { resolve(); });
    }
    handle(payload) { }
    setParent(parent) {
        this.parent = parent;
    }
}
