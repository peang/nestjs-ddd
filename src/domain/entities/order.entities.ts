import { v4 as uuidv4 } from 'uuid';
import { OrderItem } from "../value_objects/order/order-item.vo";
import { OrderStatus } from '../value_objects/order/order-status.vo';

export class Order {
    private id: string;
    private items: OrderItem[];
    private status: OrderStatus;
    private createdAt: Date;
    private updatedAt: Date;

    private constructor(
        id: string,
        items: OrderItem[],
        status: OrderStatus,
        createdAt: Date,
        updatedAt: Date,
    ) {
        this.id = id;
        this.items = items;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static create(items: OrderItem[]): Order {
        return new Order(
            uuidv4(),
            items,
            OrderStatus.new(),
            new Date(),
            new Date(),
        )
    }

    public static load(
        id: string,
        items: OrderItem[],
        status: OrderStatus,
        createdAt: Date,
        updatedAt: Date
    ) {
        return new Order(id, items, status, createdAt, updatedAt)
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getItems(): OrderItem[] {
        return this.items;
    }

    public setItems(items: OrderItem[]): void {
        this.items = items;
    }

    public getStatus(): OrderStatus {
        return this.status;
    }

    public setStatus(status: OrderStatus): void {
        this.status = status;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public setCreatedAt(createdAt: Date): void {
        this.createdAt = createdAt;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public setUpdatedAt(updatdAt: Date): void {
        this.updatedAt = updatdAt;
    }
}