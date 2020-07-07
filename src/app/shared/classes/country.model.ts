import { ICountry } from '../interfaces/country.interface';

export class Country implements ICountry {
    constructor(
        public country: string
    ) { }
}