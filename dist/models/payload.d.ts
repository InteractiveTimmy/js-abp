export declare class Payload {
    id: string;
    type: 'create' | 'read' | 'update' | 'remove';
    dataset: string;
    identifier: string | void;
    filter: {
        [index: string]: string;
    };
    authorization: string;
    input: {
        [index: string]: string;
    };
    output: {
        [index: string]: string;
    } | {
        [index: string]: string;
    }[];
    constructor(type: 'create' | 'read' | 'update' | 'remove', dataset: string, identifier: string | void, authorization: string, id: string);
    setInput(input: {
        [index: string]: string;
    }): Payload;
    setOutput(output: {
        [index: string]: string;
    } | {
        [index: string]: string;
    }[]): Payload;
}
