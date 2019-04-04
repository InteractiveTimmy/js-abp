import { Validator } from '../models/validator';
export class Unset extends Validator {
    validate(value) {
        if (value) {
            return false;
        }
        return true;
    }
}
