import { DataMiddleware, Structure, Payload } from '../../../models';
import { uuid } from '../../../utils/index';

interface Entry {
  [index: string]: string;
}

interface Database {
  [index: string]: Entry[];
}

export class Instance implements DataMiddleware<Instance> {
  protected database: Database = {}
  protected structures: Structure[] = []

  public load(...structures: Structure[]): Instance {
    this.structures = [...structures];

    structures.forEach((structure) => {
      this.database[structure.name] = [];
    });

    return this;
  }

  public create(payload: Payload): Payload {
    const { dataset, input } = payload;

    const myDataset = this.database[dataset];
    const myStructure = this.structures.find(structure => structure.name === dataset);

    const canCreate = Object.keys(myStructure.interface).every(
      structureKey => myStructure.interface[structureKey].every(
        interfaceValidator => interfaceValidator.validate(input[structureKey]),
      ),
    );

    const myItem: Entry = {};

    if (canCreate) {
      Object.keys(myStructure.interface).forEach((structureKey) => {
        myItem[structureKey] = input[structureKey];
      });

      myItem.id = uuid();

      myDataset.push(myItem);

      payload.output.set(myItem);
    } else {
      payload.output.set({});
    }

    return payload;
  }

  public read(payload: Payload): Payload {
    const { dataset, identifier, input } = payload;

    const myDataset = this.database[dataset];

    if (identifier) {
      payload.output.set(myDataset.find(item => item.id === identifier) || {});
    } else if (Object.keys(input).length > 0) {
      payload.output.set(
        myDataset.filter(
          item => Object.keys(input).every(
            inputKey => item[inputKey] === input[inputKey],
          ),
        ),
      );
    } else {
      payload.output.set([...myDataset]);
    }

    return payload;
  }

  public update(payload: Payload): Payload {
    const { dataset, identifier, input } = payload;

    const myDataset = this.database[dataset];
    const myStructure = this.structures.find(structure => structure.name === dataset);

    let myItem: Entry;

    if (identifier) {
      myItem = myDataset.find(item => item.id === identifier);

      Object.keys(input).forEach((inputKey) => {
        if (Object.keys(myStructure.interface).includes(inputKey)) {
          myItem[inputKey] = input[inputKey];
        }
      });

      payload.output.set(myItem);
    } else {
      payload.output.set({});
    }

    return payload;
  }

  public remove(payload: Payload): Payload {
    const { dataset, identifier } = payload;

    const myDataset = this.database[dataset];
    let myItem: Entry;

    if (identifier) {
      myItem = myDataset.find(item => item.id === identifier);
      myDataset.splice(myDataset.indexOf(myItem), 1);
    }

    payload.output.set({});

    return payload;
  }
}
