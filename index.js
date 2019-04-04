const JSABP = require('./build/js-abp');

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
const structureEPC = new JSABP.Structure('epb', 'epaid', 'epbid', 'a', 'b', 'c');

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