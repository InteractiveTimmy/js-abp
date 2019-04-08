// dependencies
import { Structure } from './structure';
import { Payload } from './payload';
import { Middleware } from './middleware';

export class Instance {
  protected dm: Middleware
  protected cm: Middleware[] = [];
  protected st: { [index: string]: Structure } = {};
  public active: boolean;

  public constructor(dm: Middleware) {
    // validate params
    if (dm.type !== 'data') {
      throw new Error('must be initialized with middleware of type data');
    }

    // assign params to self
    this.dm = dm;
    this.dm.setParent(this);
  }

  public handle(payload: Payload): void {
    const { dm } = this;
    const { state } = payload;

    payload.output.log();

    switch (state) {
      case 'received':
        dm.handle(payload);
        break;

      case 'processed':
        payload.parent.handle(payload);
        break;

      case 'sent':
        break;

      default:
    }
  }

  public loadMiddleware(...middleware: Middleware[]): Promise<void> {
    return new Promise((resolve) => {
      const { cm, st } = this;

      // validate params
      middleware.forEach((item) => {
        if (item.type === 'data') {
          throw new Error('cannot load middleware of type data');
        } else if (cm.includes(item)) {
          throw new Error('cannot load duplicates of middleware');
        }
      });

      Promise.all([
        ...middleware.map(item => item.load(
          ...Object.keys(st).map(key => st[key]),
        )),
      ])
        .then((): void => {
          cm.push(...middleware);

          middleware.forEach((item): void => {
            item.setParent(this);
          });

          resolve();
        });
    });
  }

  public unloadMiddleware(...middleware: Middleware[]): Promise<void> {
    return new Promise((resolve) => {
      const { cm, st } = this;

      // validate and filter
      const myMiddleware: Middleware[] = middleware.filter(
        item => (!cm.includes(item)),
      );

      Promise.all([
        ...myMiddleware.map(item => item.unload(
          ...Object.keys(st).map(key => st[key]),
        )),
      ])
        .then((): void => {
          myMiddleware.forEach((item): void => {
            item.setParent();
            cm.splice(cm.indexOf(item), 1);
          });

          resolve();
        });
    });
  }

  public loadStructure(...structures: Structure[]): Promise<void> {
    return new Promise((resolve) => {
      const { dm, cm, st } = this;

      // validate and filter
      const myStructures: Structure[] = structures.filter(
        structure => (!st[structure.dataset]),
      );

      dm.load(...myStructures)
        .then((): Promise<void[]> => Promise.all([
          ...cm.map(item => item.load(...myStructures)),
        ]))
        .then(() => {
          myStructures.forEach((structure: Structure): void => {
            st[structure.dataset] = structure;
          });

          resolve();
        });
    });
  }

  public unloadStructure(...structures: Structure[]): Promise<void> {
    return new Promise((resolve) => {
      const { dm, cm, st } = this;

      Promise.all([
        ...cm.map(item => item.unload(...structures)),
      ])
        .then((): Promise<void> => dm.unload(...structures))
        .then((): void => {
          structures.forEach((structure: Structure): void => {
            if (st[structure.dataset]) {
              delete st[structure.dataset];
            }
          });
          resolve();
        });
    });
  }

  public start(): Promise<void> {
    return new Promise((resolve) => {
      const { dm, cm } = this;

      dm.start()
        .then((r: Structure[]): Promise<void> => this.loadStructure(...r))
        .then((): Promise<(void | Structure[])[]> => Promise.all([
          ...cm.map(item => item.start()),
        ]))
        .then((): void => {
          this.active = true;
          resolve();
        });
    });
  }

  public stop(): Promise<void> {
    return new Promise((resolve) => {
      const { cm, dm } = this;

      Promise.all([...cm.map(item => item.stop)])
        .then((): Promise<void | Structure[]> => dm.stop())
        .then((): void => {
          resolve();
        });
    });
  }
}
