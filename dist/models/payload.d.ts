import { Method, State, Data } from './types';
import { Message } from './message';
import { Middleware } from './middleware';
export declare class Payload {
    readonly parent: Middleware;
    readonly sid: string;
    readonly cid: string;
    readonly dataset: string;
    readonly method: Method;
    readonly authorization: string;
    readonly input: Data;
    readonly output: Message;
    success: boolean;
    state: State;
    constructor(authorization: string, method: Method, dataset: string, input: Data, parent: Middleware);
    setState(state: State): void;
    setSuccess(success: boolean): void;
}
