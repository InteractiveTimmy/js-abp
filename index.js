const JSABP = require('./build/js-abp');

// create instance
const myInstance = new JSABP.Instance(
  new JSABP.middleware.data.Instance()
);

// prototype structures
myStructures = [
  new JSABP.Structure('endpoint1', 'a', 'b'),
  new JSABP.Structure('endpoint2', 'a', 'b', 'c'),  
  new JSABP.Structure('endpoint3', 'a', 'b', 'c', 'd'),
];
myInstance.load(...myStructures);

// generate template random payloads
myPayloads = [];
let myPayload;
let myInput = {};

for (let x = 0; x < 1000; x++) {
  myPayload = new JSABP.Payload('create', `endpoint${Math.floor(Math.random() * 3 + 1)}`, null, 'yes');
  
  myInput = {};

  if (Math.random() < 1) { myInput.a = (Math.random() > 0.5) ? '3' : '4'; }
  if (Math.random() < 1) { myInput.b = Math.random(); }
  if (Math.random() < 0.8) { myInput.c = Math.random(); }
  if (Math.random() < 0.5) { myInput.d = Math.random(); }
  myPayload.setInput({...myInput});

  myPayloads.push(myPayload);
}

// send payloads
let results;
let failed = 0;
myPayloads.forEach((payload) => {
  results = myInstance.dataMiddleware.create(payload).output;
  if (Object.keys(results).length == 0) { failed += 1; }
});

// console.log(myInstance.dataMiddleware.create(myPayload).output);

// console.log( myInstance.dataMiddleware );
// console.log(myInstance.dataMiddleware.database);

const { database } = myInstance.dataMiddleware;

Object.keys(database).forEach((key) => {
  console.log(`database table ${key} generated ${database[key].length} entries, with ${failed} blocked attempts`);
});

const getPayload = new JSABP.Payload('read', 'endpoint1', null, 'yes');

getPayload.setInput({
  a: '3',
});

let myGet = myInstance.dataMiddleware.read(getPayload).output;
console.log( myGet.length );


