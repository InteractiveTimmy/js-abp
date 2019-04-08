export class Message {
    constructor(parent) {
        this.parent = parent;
        this.timestamp = new Date().toISOString();
        this.value = {};
    }
    setParent(parent) {
        this.parent = parent;
        return this;
    }
    set(value) {
        this.value = value;
        return this;
    }
    get() {
        const { parent, timestamp, value } = this;
        const cid = parent ? parent.cid : '';
        const success = parent ? parent.success : false;
        return {
            cid,
            timestamp,
            data: value,
            success,
        };
    }
    log() {
        const { parent, timestamp, value } = this;
        if (!parent) {
            return this;
        }
        const { sid, cid, state, success, method, } = parent;
        const sError = (!success) ? 'ERROR' : 'SUCCESS';
        const sTimestamp = `${timestamp} `;
        const sId = `[${sError}/${state.toUpperCase()}/${method.toUpperCase()}/${sid}/${cid}] `;
        const sValue = JSON.stringify(value);
        process.stdout.write(`${sTimestamp}${sId}${sValue}\n`);
        return this;
    }
}
