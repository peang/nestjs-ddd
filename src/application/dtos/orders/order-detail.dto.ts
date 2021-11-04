import { DTOAdapter } from "../DTOAdapter";

export class OrderDetailDTO extends DTOAdapter {
    constructor(
        public readonly id: string,
    ) {
        super();
    }
}