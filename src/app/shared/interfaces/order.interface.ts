import { IWine } from "./wine.interface";
export interface IWines {
    wine: IWine;
    counter: number;
}
export interface IOrder {
    id: string;
    wines: Array<IWines>;
    date?: string;
}

export interface IOrders {
    name: string;
    surname: string;
    wines: IOrder;
    status: boolean;
    tel:number;
    date?: string;

}