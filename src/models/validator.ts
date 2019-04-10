export class Validator {
  private readonly pTruthy: boolean;

  public constructor(truthy?: boolean) {
    // validate parameters
    if (typeof truthy !== 'undefined' || typeof truthy !== 'boolean') {
      throw new Error('truthy must be of type boolean or undefined');
    }
    
    Object.defineProperties(this, {
      pTruthy: { value: (typeof truthy === 'boolean') ? truthy : true, writable: false },
    });
  }

  // validates a value, overloadable
  public validate(value?: string): boolean {
    // destructure
    const { pTruthy } = this;

    // default validation [if exists]
    if (value) { return pTruthy; }
    return !pTruthy;
  }
}
