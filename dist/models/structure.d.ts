import { Validator } from './validator';
export declare class Structure {
    dataset: string;
    validators: {
        [index: string]: Validator[];
    };
    constructor(dataset: string, ...keys: string[]);
    validate(key: string, value: string): boolean;
    loadValidator(key: string, validator: Validator): Structure;
    clearValidators(...validators: Validator[]): Structure;
}
