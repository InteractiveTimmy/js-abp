// dependencies
import { uuid } from '../utils/index';
import { Method, Data } from './types';
import { Message } from './message';

// class is used to generate a payload object which contains a Message
export class Payload {
  public sid: string // stores server session uuid
  public cid: string // stores client session uuid
  public dataset: string // dataset to address
  public method: Method // crud method
  public authorization: string // TODO
  public input: Data // input params
  public output: Message // output data
  public success: boolean // were errors encountered

  public constructor(
    authorization: string,
    method: Method,
    dataset: string,
    input: Data,
  ) {
    // set constructor params
    this.authorization = authorization;
    this.method = method;
    this.dataset = dataset;
    this.input = input;

    // generate ids
    this.sid = uuid();
    this.cid = uuid();

    // create output class object
    this.output = new Message(this);

    // set success to false until payload is finished
    this.success = false;
  }
}
