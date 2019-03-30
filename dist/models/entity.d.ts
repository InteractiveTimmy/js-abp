import { Application } from 'express';
interface Structure {
    [index: string]: string;
}
interface Payload<I, O> {
    method: string;
    endpoint: string;
    params: {
        [index: string]: string;
    };
    query: {
        [index: string]: string;
    };
    authorization: string;
    body: I;
    respond: (code: number | void, result: O | void) => void;
}
declare class Entity {
    protected name: string;
    protected version: number;
    protected structure: Structure;
    protected endpoint: string;
    constructor(name: string, version: number, struct: Structure);
    mount(app: Application): void;
    protected handle(payload: Payload<Structure, Structure>): Entity;
}
export default Entity;
