import { Observable } from 'rxjs';

export interface IWine {
    manufacturer: string;
    name: string;
    color: string;
    type: string;
    country: string;
    price: number;
    image: string;
    about: string;
    id?:string;
}