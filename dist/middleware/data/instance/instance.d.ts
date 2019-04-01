import { DataMiddleware, Structure, Payload } from '../../../models';
interface Entry {
    [index: string]: string;
}
interface Database {
    [index: string]: Entry[];
}
export declare class Instance implements DataMiddleware<Instance> {
    protected database: Database;
    protected structures: Structure[];
    load(...structures: Structure[]): Instance;
    create(payload: Payload): Payload;
    read(payload: Payload): Payload;
    update(payload: Payload): Payload;
    remove(payload: Payload): Payload;
}
export {};
