import { Data, Err, Output } from './types';
import { Payload } from './payload';
export declare class Message {
    protected parent: Payload | void;
    protected timestamp: string;
    protected value: Data | Data[] | Err;
    constructor(parent?: Payload);
    setParent(parent?: Payload): Message;
    set(value: Data | Data[] | Err): Message;
    get(): Output;
    log(): Message;
}
