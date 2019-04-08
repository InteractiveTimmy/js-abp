// dependencies
import { Instance } from './instance';
import { Structure } from './structure';
import { Payload } from './payload';
import { Type } from './types';

// defines type for a init promise
export type HandleFunc = (payload: Payload) => void
export type LoadFunc = (...structures: Structure[]) => Promise<void>
export type PromiseFunc = () => Promise<Structure[] | void>

// class that defines the required methods for middleware
export class Middleware {
  public readonly type: Type // stores middleware type
  protected parent: Instance // stores parent instance
  // public start: PromiseFunc // inits and starts the middleware
  // public stop: PromiseFunc // stops the middleware
  // public load: LoadFunc // used to load structures
  // public unload: LoadFunc // used to unload structures
  // public handle: HandleFunc // used to handle payloads

  public constructor(type: Type, parent?: Instance) {
    // set constructor params
    this.type = type;
    this.parent = parent;
  }

  // inits and starts the middleware
  // eslint-disable-next-line class-methods-use-this
  public start(): Promise<Structure[] | void> {
    return new Promise((resolve) => { resolve(); });
  }

  // stops the middleware
  // eslint-disable-next-line class-methods-use-this
  public stop(): Promise<void> {
    return new Promise((resolve) => { resolve(); });
  }

  // used to load structures
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  public load(...structures: Structure[]): Promise<void> {
    return new Promise((resolve) => { resolve(); });
  }

  // used to unload structures
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  public unload(...structures: Structure[]): Promise<void> {
    return new Promise((resolve) => { resolve(); });
  }

  // used to handle payloads
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  public handle(payload: Payload): void { }

  public setParent(parent?: Instance): void {
    this.parent = parent;
  }
}
