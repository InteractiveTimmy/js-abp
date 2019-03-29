// external dependencies
import Express, { Application } from 'express';
import http from 'http';

// internal dependencies
import Entity from './entity';

class Instance {
  protected wsc: Application
  protected wsi: http.Server

  public constructor() {
    this.wsc = Express();
    this.wsi = this.wsc.listen(8080);
  }

  public start(): Instance {
    return this;
  }

  public stop(): Instance {
    return this;
  }

  public loadEntity(...entities: Entity[]): Instance {
    entities.forEach((entity) => {

    });

    return this;
  }
}

export default Instance;
