// interface for crud method used
export type Method = 'create' | 'read' | 'update' | 'remove';

// handles state of payload
export type State = 'new' | 'received' | 'processed' | 'sent'

// handles types of middleware
export type Type = 'data' | 'connect'

// interface for single-level objects
export interface Data { [index: string]: string }

// interface for error object
export interface Err {
  [index: string]: string;
  reason: string;
  resolution: string;
}

// interface for exchanged output
export interface Output {
  cid: string | void;
  timestamp: string;
  data: Data | Data[] | Err;
  success: boolean;
}

// validates param is of type Method
export function isMethod(method: Method): method is Method {
  return (
    method === 'create'
    || method === 'read'
    || method === 'update'
    || method === 'remove'
  );
}

// validates param is of type State
export function isState(state: State): state is State {
  return (
    state === 'new'
    || state === 'received'
    || state === 'processed'
    || state === 'sent'
  );
}

// validates param is of type Type
export function isType(type: Type): type is Type {
  return (
    type === 'connect'
    || type === 'data'
  );
}

// validates param is of type Data
export function isData(data: Data): data is Data {
  return Object.keys(data).every(key => typeof key === 'string');
}

// validates param is of type Data array
export function isDataArray(dataArr: Data[]): dataArr is Data[] {
  return dataArr.every(data => isData(data));
}

// validates param is of type Err
export function isErr(err: Err): err is Err {
  return Object.keys(err).every(
    (key: string) => typeof err[key] === 'string' && (key === 'reason' || key === 'resolution'),
  );
}

// validates param is of type Output
export function isOutput(output: Output): output is Output {
  return Object.keys(output).every(
    (key) => {
      switch (key) {
        case 'cid':
          return typeof output[key] === 'string';

        case 'timestamp':
          return typeof output[key] === 'string';

        case 'data':
          return isData(output[key] as Data) || isDataArray(output[key] as Data[]) || isErr(output[key] as Err);

        case 'success':
          return typeof output[key] === 'boolean';

        default:
          return false;
      }
    },
  );
}
