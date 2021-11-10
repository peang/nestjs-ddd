import { IMetaResponse } from "src/application/types/app";
import { Order } from "../entities/order.entities";

export interface IOrderRepository {
    persist(order: Order): Promise<void>;

    list(page: number, perPage: number, sort: string, sortBy: string, filter: string): Promise<{
        data: Order[],
        meta: IMetaResponse
    }>;

    findOrderBy(params: any): Promise<Order | null>;

    remove(order: Order): Promise<void>;
}