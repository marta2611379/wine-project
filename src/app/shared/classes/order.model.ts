import { IWines, IOrder, IOrders } from '../interfaces/order.interface';
import { IWine } from '../interfaces/wine.interface';

export class Wines implements IWines {
    constructor(
        public wine: IWine,
        public counter: number
    ) { }
}
export class Order implements IOrder {
    constructor(
        public id: string,
        public wines: Array<IWines>,
        public date?: string) { }
}

export class Orders implements IOrders {
    constructor(
        public name: string,
        public surname: string,
        public wines:IOrder,
        public  tel:number,
        public  status:boolean,
        public date?: string) { }
}