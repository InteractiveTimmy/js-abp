// external dependencies
import { Application, Request, Response, json } from 'express';

interface Structure {
  [index: string]: string;
}

interface Payload<I, O> {
  method: string;
  endpoint: string;
  params: { [index: string]: string };
  query: { [index: string]: string };
  authorization: string;
  body: I;
  respond: (code: number | void, result: O | void) => void;
}

class Entity {
  protected name: string
  protected version: number
  protected structure: Structure
  protected endpoint: string

  public constructor(name: string, version: number, struct: Structure) {
    this.name = name;
    this.version = version;
    this.structure = struct;
    this.endpoint = `/api/v${version}/${name}/`;
  }

  public mount(app: Application): void {
    const { endpoint } = this;

    app.all(`${endpoint}:id`, json(), (req: Request, res: Response) => {
      // const payload: Payload<Structure, Structure> = {}
    });
  }

  protected handle(payload: Payload<Structure, Structure>): Entity {
    // payload.respond(200, )
    return this;
  }
}

export default Entity;
