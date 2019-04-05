export type Method = 'create' | 'read' | 'update' | 'delete';

export interface Data { [index: string]: string }

export interface Err {
  reason: string;
  resolution: string;
}

export interface Output {
  cid: string | void;
  timestamp: string;
  data: Data | Data[] | Err;
  success: boolean;
}
