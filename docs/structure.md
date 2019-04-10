# JSABP Structure Document

## Data Flow
 * Data Received
 * Data Processed into Payload
 * Payload Sent to Driver
 * Payload Sent to Instance
 * Payload is Logged
 * Payload is Authenticated
 * Payload is Validated
 * Payload is Logged
 * Payload Sent to Accessor
 * Payload is Encrypted
 * Payload is Processed into Data Store
 * Payload is Sent to Instance
 * Payload is Sent to Driver
 * Payload is Sent to Middleware
 * Payload is Sent to Service

## Interfaces

### Instance
 * *public* **constructor**(accessor: *Accessor*, driver: *Driver*): **Instance** => class object constructor
 * *public* **handle**(payload: *Payload*): **void** => handles payloads inbound and outbound
 * *public* **load**(...structures: *Structure[]*): **Instance** => loads a structure into the Instance
 * *public* **unload**(...structures: *Structure[]*): **Instance** => unloads a structure from the Instance
 * *public* **mount**(...middlewares: *Middleware[]*): **Instance** => mounts middleware to driver
 * *public* **unmount**(...middlewares: *Middleware[]*): **Instance** => unmounts middleware from driver
 * *public* **start**(): **Promise** => initializes Accessor and Driver
 * *public* **stop**(): **Promise** => disables Accessor and Driver
 * *public readonly* **accessor**: *Accessor* => contains accessor for instance
 * *public readonly* **driver**: *Driver* => contains driver for instance
 * *private readonly* **pStructures**: *Structure[]* => contains an array of all loaded structures

### Structure
 * *public* **constructor**(name: *string*, ...keys: *string[]*): **Structure** => class object constructor
 * *public* **validate**(key: *string*, value: *string*): **boolean** => validates input against key validators
 * *public* **load**(key: *string*, ...validators: *Validator[]*): **Structure** => used to load validators into a structure key
 * *public* **unload**(key: *string*, ...validators?: *Validator[]*): **Structure** => used to unload some or all validators from a structure key
 * *public readonly* **name**: *string* => contains name of the structure / dataset
 * *private readonly* **pValidators**: { [index: *string*]: *Validator[]* } => contains a keyed list of validators

### Validator
 * *public* **constructor**(truthy: *boolean*): **Validator** => class object constructor
 * *public* **validate**(value?: *string*): *boolean* => validates value against validator info
 * *private* **pTruthy**: *boolean* => contains boolean to confirm class object is truthy or falsey

### Payload
 * *public* **constructor**(parent: *Middleware*, authentication: *string* method: *string*, target: *string*, dataset: *string*, input: *Data*): Payload => class object constructor
 * *public* **setState**(state: *string*): **Payload** => sets the state of a payload
 * *public* **setOutput**(output: *Output*): **Payload** => sets the output of a payload
