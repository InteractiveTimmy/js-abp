export class Structure {
  public name: string
  public interface: { [index: string]: [(value: string) => boolean] } = {}

  public constructor(name: string, ...indexes: string[]) {
    this.name = name;

    indexes.forEach((index) => {
      this.interface[index] = [(value: string) => {
        if (value) {
          return true;
        }
        return false;
      }];
    });

    this.interface.id = [() => true];
  }

  public validate(index: string, value: string): boolean {
    return this.interface[index].every(validator => validator(value));
  }

  public loadValidator(index: string, validator: (value: string) => boolean): Structure {
    this.interface[index].push(validator);

    return this;
  }

  public clearValidators(): Structure {
    Object.keys(this.interface).forEach((item) => {
      this.interface[item] = [this.interface[item][0]];
    });

    return this;
  }
}
