import { IManufacturer } from '../interfaces/manufacturer.interface';

export class Manufacturer implements IManufacturer {
    constructor(
        public manufacturer: string,
        public country: string
    ) { }
}