import { IValueObject } from "../IValueObject";

const ORDER_STATUSES = {
    1: 'draft',
    2: 'new',
    3: 'received',
    4: 'rejected',
    5: 'on-shipping',
    6: 'finish',
};

export class OrderStatus implements IValueObject {
    private status: number;

    public getStatus(): number {
        return this.status;
    }

    public getStatusString(): string {
        return ORDER_STATUSES[this.status];
    }

    private constructor(
        status: number,
    ) {
        this.status = status;
    }

    public static create(status: number): OrderStatus {
        return new OrderStatus(status);
    }

    public static new(): OrderStatus {
        return new OrderStatus(1);
    }

    public serialize(): string | number | boolean | Record<any, any> {
        return this.status;
    }

    public deserialize(data: number): OrderStatus {
        return new OrderStatus(data);
    }
}