export declare class Structure {
    name: string;
    interface: {
        [index: string]: [(value: string) => boolean];
    };
    constructor(name: string, ...indexes: string[]);
    validate(index: string, value: string): boolean;
    loadValidator(index: string, validator: (value: string) => boolean): Structure;
    clearValidators(): Structure;
}
