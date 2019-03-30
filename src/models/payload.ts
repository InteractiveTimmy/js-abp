export class Payload {
  public type: 'create' | 'read' | 'update' | 'remove'
  public dataset: string
  public identifier: string | void
  public filter: { [index: string]: string }
  public authorization: string
  public input: { [index: string]: string } = {}
  public output: { [index: string]: string } | { [index: string]: string }[] = {}

  public constructor(
    type: 'create' | 'read' | 'update' | 'remove',
    dataset: string,
    identifier: string | void,
    authorization: string,
  ) {
    this.type = type;
    this.dataset = dataset;
    this.identifier = identifier;
    this.authorization = authorization;
  }

  public setInput(input: { [index: string]: string }): Payload {
    this.input = input || {};

    return this;
  }

  public setOutput(output: { [index: string]: string } | { [index: string]: string }[]): Payload {
    this.output = output;

    return this;
  }
}
