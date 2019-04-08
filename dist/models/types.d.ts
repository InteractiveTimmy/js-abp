export declare type Method = 'create' | 'read' | 'update' | 'remove';
export declare type State = 'new' | 'received' | 'processed' | 'sent';
export declare type Type = 'data' | 'connect';
export interface Data {
    [index: string]: string;
}
export interface Err {
    [index: string]: string;
    reason: string;
    resolution: string;
}
export interface Output {
    cid: string | void;
    timestamp: string;
    data: Data | Data[] | Err;
    success: boolean;
}
export declare function isMethod(method: Method): method is Method;
export declare function isState(state: State): state is State;
export declare function isType(type: Type): type is Type;
export declare function isData(data: Data): data is Data;
export declare function isDataArray(dataArr: Data[]): dataArr is Data[];
export declare function isErr(err: Err): err is Err;
export declare function isOutput(output: Output): output is Output;
