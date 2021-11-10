import { ValueObject } from "../IValueObject";

export enum ORDER_STATUS_ENUM {
    draft = 1,
    new = 2,
    received = 3
}

export class OrderStatus implements ValueObject {
    private status: number;

    private constructor(
        status: number,
    ) {
        this.status = status;
    }

    public static create(status: string): OrderStatus {
        const stt: number = ORDER_STATUS_ENUM[status];
        return new OrderStatus(stt);
    }

    public getStatus(): number {
        return this.status;
    }

    public getStatusString(): string {
        return ORDER_STATUS_ENUM[this.status];
    }

    public serialize(): number {
        return this.status;
    }

    public static deserialize(data: any): OrderStatus {
        return new OrderStatus(data);
    }
}