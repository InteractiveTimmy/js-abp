// class is used to validate input in and out of the dataMiddleware
export class Validator {
  private truthy: boolean // stores boolean to return on validation check

  public constructor(truthy: boolean = true) {
    // set constructor params
    this.truthy = truthy;
  }

  // validates if value meets validator specification
  public validate(value?: string): boolean {
    // deconstruct
    const { truthy } = this;

    // validate if exists
    if (value) { return truthy; }
    return !truthy;
  }
}
