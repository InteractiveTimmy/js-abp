export class Validator {
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  public validate(value: string): boolean {
    if (value) { return true; }
    return false;
  }
}
