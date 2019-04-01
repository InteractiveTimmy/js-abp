// external dependencies
import Express, {
  Application,
  json,
  Request,
  Response,
} from 'express';

import { Server } from 'http';

// internal dependencies
import { ConnectMiddleware, Structure, Payload } from '../../../models/index';
import { uuid } from '../../../utils/index';

export class ExpressConnector implements ConnectMiddleware<ExpressConnector> {
  protected wsc: Application
  protected wsi: Server
  protected structures: Structure[] = []
  protected responses: { [index: string]: Response } = {}

  protected config: { [index: string]: string } = {}

  protected ready: boolean;
  protected active: boolean;

  public receive: (payload: Payload) => void

  public constructor(config: { [index: string]: string }) {
    this.config = config;

    this.wsc = Express();
  }

  public getExpressConfig(): Application {
    return this.wsc;
  }

  public getHttpServer(): Server {
    return this.wsi;
  }

  public load(...structures: Structure[]): ExpressConnector {
    this.structures = [...structures];

    const {
      wsc,
      ready,
      active,
      start,
      stop,
      receive,
    } = this;

    const wasActive = active;

    if (wasActive) {
      stop();
    }

    structures.forEach((structure) => {
      wsc.all(`/api/v1/${structure.name}/:id?`, json(), (req: Request, res: Response) => {
        let method: 'create' | 'read' | 'update' | 'remove';

        switch (req.method) {
          case 'POST':
            method = 'create';
            break;

          case 'GET':
            method = 'read';
            break;

          case 'PUT':
            method = 'update';
            break;

          case 'DELETE':
            method = 'remove';
            break;

          default:
        }

        const myUUID = uuid();
        const payload = new Payload(
          method,
          structure.name,
          req.params.id,
          req.get('Authorization'),
          myUUID,
        );

        const myInput: { [index: string]: string } = {};

        Object.keys(req.query).forEach((queryKey) => {
          myInput[queryKey] = req.query[queryKey];
        });

        Object.keys(req.body).forEach((bodyKey) => {
          myInput[bodyKey] = req.body[bodyKey];
        });

        payload.setInput({ ...myInput });

        if (method) {
          if (this.receive) {
            this.responses[myUUID] = res;
            receive(payload);
          }
        }
      });
    });

    if (wasActive) {
      start();
    }

    if (!ready) {
      this.ready = true;
    }

    return this;
  }

  public send(payload: Payload): void {
    const res = this.responses[payload.id];

    const responseObj = {
      data: payload.output,
      uuid: uuid(),
      timestamp: new Date().toISOString(),
    };

    // eslint-disable-next-line no-console
    console.log(
      `\
${responseObj.timestamp} \
[${payload.type.toUpperCase()}/${payload.id}/${responseObj.uuid}] - \
${JSON.stringify(responseObj.data)}\
`,
    );

    res.send(responseObj);

    delete this.responses[payload.id];
  }

  public start(): ExpressConnector {
    if (this.ready && !this.active) {
      const { port } = this.config;

      this.wsi = this.wsc.listen(port);
    }

    return this;
  }

  public stop(): ExpressConnector {
    if (this.active) {
      this.wsi.close();
    }

    return this;
  }
}
