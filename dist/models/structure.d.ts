import { Validator } from './validator';
export declare class Structure {
    name: string;
    interface: {
        [index: string]: Validator[];
    };
    constructor(name: string, ...indexes: string[]);
    validate(index: string, value: string): boolean;
    loadValidator(index: string, validator: Validator): Structure;
    clearValidators(): Structure;
}
