import { DTOAdapter } from "../DTOAdapter";

export class OrderUpdateDTO extends DTOAdapter {
    constructor(
        public readonly id: string,
        public readonly items: {
            name: string,
            qty: number,
            price: number,
        }[],
        public readonly status: number
    ) {
        super();
    }
}