import { uuid } from '../utils/index';
export class Message {
    constructor(value, type, resolution) {
        this.value = value;
        this.type = type || 'system';
        this.resolution = resolution;
        this.timestamp = new Date().toISOString();
        this.sid = uuid();
        this.cid = uuid();
        if (resolution) {
            this.isError = true;
        }
        else {
            this.isError = false;
        }
    }
    set(value, type, resolution) {
        this.type = type || 'system';
        this.value = value;
        this.resolution = resolution;
        if (resolution) {
            this.isError = true;
        }
        else {
            this.isError = false;
        }
        return this;
    }
    log() {
        const { value, resolution, timestamp, sid, cid, type, isError, } = this;
        const sError = isError ? 'ERROR - ' : '';
        const sTimestamp = `${timestamp} `;
        const sId = `[${type.toUpperCase()}/${sid}/${cid}] `;
        const sOutput = (isError)
            ? JSON.stringify({ reason: value, resolution })
            : value;
        process.stdout.write(`${sError}${sTimestamp}${sId}${sOutput}\n`);
        return this;
    }
    get() {
        const { value, resolution, timestamp, cid, isError, } = this;
        const data = (isError)
            ? { reason: value, resolution }
            : value;
        const output = {
            uuid: cid,
            timestamp,
            data,
            error: isError,
        };
        return output;
    }
}
