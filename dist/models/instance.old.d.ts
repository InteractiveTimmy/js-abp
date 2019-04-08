import { Structure } from './structure';
import { DataMiddleware } from './data-middleware';
import { ConnectMiddleware } from './connect-middleware';
export declare class Instance<DM, IM> {
    protected dataMiddleware: DataMiddleware<DM>;
    protected connectMiddleware: ConnectMiddleware<IM>;
    protected readonly structures: Structure[];
    constructor(dataMiddleware: DataMiddleware<DM>, connectMiddleware: ConnectMiddleware<IM>);
    load(...structures: Structure[]): Instance<DM, IM>;
}
