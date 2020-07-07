import { IWine } from '../interfaces/wine.interface';

export class Wine implements IWine {
    constructor(
        public manufacturer: string,
        public name: string,
        public color: string,
        public type: string,
        public country: string,
        public price: number,
        public image: string,
        public about: string,
        public id?:string
    ) { }
}

