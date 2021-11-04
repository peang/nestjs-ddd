import { DTOAdapter } from "../DTOAdapter";

export class OrderListDTO extends DTOAdapter {
    constructor(
        public readonly id: string,
        public readonly page: number,
        public readonly perPage: number,
        public readonly sort: string,
        public readonly sortBy: string,
    ) {
        super();
    }
}