/// <reference types="node" />
import { Application, Response } from 'express';
import { Server } from 'http';
import { ConnectMiddleware, Structure, Payload } from '../../../models/index';
export declare class ExpressConnector implements ConnectMiddleware<ExpressConnector> {
    protected wsc: Application;
    protected wsi: Server;
    protected structures: Structure[];
    protected responses: {
        [index: string]: Response;
    };
    protected config: {
        [index: string]: string;
    };
    protected ready: boolean;
    protected active: boolean;
    receive: (payload: Payload) => void;
    constructor(config: {
        [index: string]: string;
    });
    getExpressConfig(): Application;
    getHttpServer(): Server;
    load(...structures: Structure[]): ExpressConnector;
    send(payload: Payload): void;
    start(): ExpressConnector;
    stop(): ExpressConnector;
}
