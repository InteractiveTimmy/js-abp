import { Middleware } from '../../models/middleware';
import { Structure } from '../../models/structure';
import { Data } from '../../models/types';
import { Payload } from '../../models';
interface Database {
    [index: string]: Data[];
}
export declare class Memory extends Middleware {
    protected database: Database;
    protected structures: Structure[];
    constructor();
    load(...structures: Structure[]): Promise<void>;
    handle(payload: Payload): void;
    protected create(payload: Payload): void;
}
export {};
