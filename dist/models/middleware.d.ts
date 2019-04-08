import { Instance } from './instance';
import { Structure } from './structure';
import { Payload } from './payload';
import { Type } from './types';
export declare type HandleFunc = (payload: Payload) => void;
export declare type LoadFunc = (...structures: Structure[]) => Promise<void>;
export declare type PromiseFunc = () => Promise<Structure[] | void>;
export declare class Middleware {
    readonly type: Type;
    protected parent: Instance;
    constructor(type: Type, parent?: Instance);
    start(): Promise<Structure[] | void>;
    stop(): Promise<void>;
    load(...structures: Structure[]): Promise<void>;
    unload(...structures: Structure[]): Promise<void>;
    handle(payload: Payload): void;
    setParent(parent?: Instance): void;
}
