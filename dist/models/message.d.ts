export declare class Message {
    value: string | object;
    resolution?: string;
    timestamp: string;
    sid: string;
    cid: string;
    type: string;
    isError: boolean;
    constructor(value: string | object, type?: string, resolution?: string);
    set(value: string | object, type?: string, resolution?: string): Message;
    log(): Message;
    get(): object;
}
