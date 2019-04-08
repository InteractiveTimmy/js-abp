// dependencies
import { uuid } from '../utils/index';
import { Method, State, Data } from './types';
import { Message } from './message';
import { Middleware } from './middleware';

// class is used to generate a payload object which contains a Message
export class Payload {
  public readonly parent: Middleware // stores originating middleware
  public readonly sid: string // stores server session uuid
  public readonly cid: string // stores client session uuid
  public readonly dataset: string // dataset to address
  public readonly method: Method // crud method
  public readonly authorization: string // TODO
  public readonly input: Data // input params
  public readonly output: Message // output data
  public success: boolean = true // were errors encountered
  public state: State = 'new' // contains state of payload

  public constructor(
    authorization: string,
    method: Method,
    dataset: string,
    input: Data,
    parent: Middleware,
  ) {
    // set constructor params
    this.authorization = authorization;
    this.method = method;
    this.dataset = dataset;
    this.input = input;
    this.parent = parent;

    // generate ids
    this.sid = uuid();
    this.cid = uuid();

    // create output class object
    this.output = new Message(this);
  }

  public setState(state: State): void {
    this.state = state;
  }

  public setSuccess(success: boolean): void {
    this.success = success;
  }
}
