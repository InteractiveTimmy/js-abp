import { Structure } from './structure';
import { DataMiddleware } from './data-middleware';
import { InterfaceMiddleware } from './interface-middleware';
export declare class Instance<DM, IM> {
    protected dataMiddleware: DataMiddleware<DM>;
    protected instanceMiddleware: InterfaceMiddleware<IM>;
    protected readonly structures: Structure[];
    constructor(dataMiddleware: DataMiddleware<DM>, instanceMiddleware: InterfaceMiddleware<IM>);
    load(...structures: Structure[]): Instance<DM, IM>;
}
