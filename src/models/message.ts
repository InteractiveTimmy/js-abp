// dependencies
import { Data, Err, Output } from './types';
import { Payload } from './payload';

// class is used to store a sent message. This message can be logged.
export class Message {
  public parent: Payload | void // stores parent for reference
  protected timestamp: string // stores iso timestamp upon creation
  protected value: Data | Data[] | Err // stores message data

  public constructor(parent?: Payload) {
    // set constructor params
    this.parent = parent;

    // generate timestamp
    this.timestamp = new Date().toISOString();

    // generate templates
    this.value = {};
  }

  // sets the parent of the class object instance
  public setParent(parent?: Payload): Message {
    this.parent = parent;

    return this;
  }

  // sets the data for Message class object and returns self
  public set(value: Data | Data[] | Err): Message {
    this.value = value;
    return this;
  }

  // accessor method to output privatized properties
  public get(): Output {
    // deconstruct
    const { parent, timestamp, value } = this;

    const cid = parent ? parent.cid : null;
    const success = parent ? parent.success : false;

    // return formatted object
    return {
      cid,
      timestamp,
      data: value,
      success,
    };
  }

  // logs data in message and returns self
  public log(): Message {
    // deconstruct
    const { parent, timestamp, value } = this;

    if (!parent) {
      return this;
    }

    const {
      sid,
      cid,
      success,
      method,
    } = parent;

    // generate string values
    const sError = (!success) ? 'ERROR - ' : '';
    const sTimestamp = `${timestamp} `;
    const sId = `[${method.toUpperCase()}/${sid}/${cid}] `;
    const sValue = JSON.stringify(value);

    // write to stdout
    process.stdout.write(`${sError}${sTimestamp}${sId}${sValue}\n`);
    return this;
  }
}
