import { DataMiddleware } from '../models/data-middleware';
import { Validator } from '../models/validator';
export declare class ForeignKey<DM> extends Validator {
    private dm;
    private endpoint;
    private foreignKey;
    constructor(dm: DataMiddleware<DM>, endpoint: string, foreignKey: string);
    validate(value: string): boolean;
}
