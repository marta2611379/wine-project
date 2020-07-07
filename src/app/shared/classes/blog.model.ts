import { IBlog } from '../interfaces/blog.interface';

export class Blog implements IBlog {
    constructor(
        public id: number,
        public image: string,
        public name: string,
        public text: string,
        public date?: string
    ) { }
}