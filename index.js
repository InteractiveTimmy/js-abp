const JSABP = require('./build/js-abp');

const dm = new JSABP.middleware.Memory;
const instance = new JSABP.Instance(dm);

const structureA = new JSABP.Structure('structurea', 'a', 'b', 'c');

instance.loadStructure(structureA);

class Middle extends JSABP.Middleware {
  constructor(type, parent) {
    super(type, parent);
  }

  run() {
    this.payload = new JSABP.Payload('yes', 'create', 'structurea', { id: 'a', a: '1', b: '2', c: '3' }, this);
    this.payload.output.set({...this.payload.input});
    this.payload.setState('received');
    instance.handle(this.payload);
  }

  handle(payload) {
    payload.setState('sent');
    this.parent.handle(payload);
  }
}

const mw = new Middle('connect');
instance.loadMiddleware(mw).then(() => {
  mw.run();
});

/*
// initialize middleware
const dataMiddleware = new JSABP.middleware.data.Instance();
const connectMiddleware = new JSABP.middleware.connect.ExpressConnector({ port: 8080 });

// create instance
const instance = new JSABP.Instance(
  dataMiddleware,
  connectMiddleware,
);

// prototype structures
// endpoint a
const structureEPA = new JSABP.Structure('epa', 'a', 'b');

// endpoint b
const structureEPB = new JSABP.Structure('epb', 'epaid', 'a');

structureEPB.loadValidator('epaid', new JSABP.validators.ForeignKey(
  dataMiddleware,
  'epa',
  'id',
));

// endpoint c
const structureEPC = new JSABP.Structure('epc', 'epaid', 'epbid', 'a', 'b', 'c');

structureEPC.loadValidator('epaid', new JSABP.validators.ForeignKey(
  dataMiddleware,
  'epa',
  'id',
));
structureEPC.loadValidator('epbid', new JSABP.validators.ForeignKey(
  dataMiddleware,
  'epb',
  'id',
));

// generate structures array
const structures = [
  structureEPA,
  structureEPB,
  structureEPC,
];

// load structures
instance.load(...structures);

// start connector
instance.connectMiddleware.start();
*/