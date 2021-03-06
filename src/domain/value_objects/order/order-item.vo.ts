import { BadRequestException } from "@nestjs/common";
import { ValueObject } from "../IValueObject";

export class OrderItem implements ValueObject {
    private name: string;
    private qty: number;
    private price: number;
    private total: number;

    public getName(): string {
        return this.name;
    }

    public getQty(): number {
        return this.qty;
    }

    public getPrice(): number {
        return this.price;
    }

    public getTotal(): number {
        return this.total;
    }

    private constructor(
        name: string,
        qty: number,
        price: number,
    ) {
        this.name = name;
        this.qty = qty;
        this.price = price;
        this.total = qty * price;
    }

    public static create(name, qty, price): OrderItem {
        if (qty > 20) {
            // Misal validasi qty item maksimal 20
            throw new BadRequestException('Maximum Qty is 20')
        }

        return new OrderItem(name, qty, price);
    }

    public serialize(): string | number | boolean | Record<any, any> {
        return {
            name: this.name,
            qty: this.qty,
            price: this.price,
            total: this.total,
        }
    }

    public deserialize(data: any): OrderItem {
        const payload = JSON.parse(data);

        return new OrderItem(payload.name, payload.number, payload.price);
    }
}