import { ValueObject } from "../IValueObject";

// propise type instead const
type ORDER_STATUSES_STRING = "draft" | "new" | "received";

const ORDER_STATUSES = {
    "draft": 1,
    "new": 2,
    "received": 3,
}
const ORDER_STATUSES_STRING = {
    1: "draft",
    2: "new",
    3: "received"
}
// ....

export class OrderStatus implements ValueObject {
    private status: number;

    public constructor(
        status: ORDER_STATUSES_STRING,
    ) {
        this.status = ORDER_STATUSES[status];
    }

    public getStatus(): number {
        return this.status;
    }

    public getStatusString(): string {
        return ORDER_STATUSES[this.status];
    }

    public serialize(): string | number | boolean | Record<any, any> {
        return this.status;
    }

    public static deserialize(data: any): OrderStatus {
        return new OrderStatus(ORDER_STATUSES_STRING[data]);
    }
}