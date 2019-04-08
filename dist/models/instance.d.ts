import { Structure } from './structure';
import { Payload } from './payload';
import { Middleware } from './middleware';
export declare class Instance {
    protected dm: Middleware;
    protected cm: Middleware[];
    protected st: {
        [index: string]: Structure;
    };
    active: boolean;
    constructor(dm: Middleware);
    handle(payload: Payload): void;
    loadMiddleware(...middleware: Middleware[]): Promise<void>;
    unloadMiddleware(...middleware: Middleware[]): Promise<void>;
    loadStructure(...structures: Structure[]): Promise<void>;
    unloadStructure(...structures: Structure[]): Promise<void>;
    start(): Promise<void>;
    stop(): Promise<void>;
}
