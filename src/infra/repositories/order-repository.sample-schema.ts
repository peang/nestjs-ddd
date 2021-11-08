import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IMetaResponse } from "src/application/types/app";
import { Order } from "src/domain/entities/order.entities";
import { IOrderRepository } from "src/domain/repositories/order-repository.interface";
import { OrderItem } from "src/domain/value_objects/order/order-item.vo";
import { OrderStatus } from "src/domain/value_objects/order/order-status.vo";
import { RepositoryHelper } from "../helpers/repository.helper";
import { OrderDocument } from "../models/order.schema";
import { OrderSchema } from '../types/model';
import { OrderItemSQL } from "../types/vo";

// Why not extends on OrderModel class to use SQL Model functions ?
// Answers: 
// To remove coupled / dependencies with SQL
// When you switch to other DB (e.g Mongo / ES), you just need to adjust in infra layer
@Injectable()
export class OrderRepository2 implements IOrderRepository {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>
    ) { }

    // Sample when persisting as Document for MongoDB
    public documentBuilder(orderDomain: Order): OrderSchema {
        return {
            id: orderDomain.getId(),
            items: orderDomain.getItems().map((item) => item.serialize()),
            status: orderDomain.getStatus().getStatus(),
            created_at: orderDomain.getCreatedAt(),
            updated_at: orderDomain.getUpdatedAt(),
        }
    }

    public domainFromSchemaBuilder(order: OrderDocument): Order {
        if (!order) {
            return;
        }

        const items = order.items.map((item: OrderItemSQL) => {
            return OrderItem.create(item.name, item.qty, item.price)
        })
        return Order.load(
            order.id,
            items,
            OrderStatus.deserialize(order.status),
            order.created_at,
            order.updated_at,
        )
    }

    public async persist(order: Order): Promise<void> { // this is sample method when persisting a document schema
        const orderDoc = this.documentBuilder(order);

        await this.orderModel.create(orderDoc);
    }

    public async findOrderBy(params: any): Promise<Order | null> {
        const orderData = await this.orderModel.findOne({
            where: params
        }).exec();

        if (!orderData) {
            return null;
        }

        return this.domainFromSchemaBuilder(orderData);
    }

    public async list(page: number, perPage: number, sort: string, sortBy: string, filter: string): Promise<{
        data: Order[],
        meta: IMetaResponse
    }> {
        const { offset, limit } = RepositoryHelper.getOffsetLimit(page, perPage);
        sort = RepositoryHelper.desorter(sortBy, sort);

        const where = {};
        if (filter) {
            where['id'] = { $regex: '.*' + filter + '.*' }
        }

        const count = await this.orderModel.count(where);
        const orders: Order[] = await this.orderModel.find(where)
            .skip(offset)
            .limit(limit)
            .sort(sort)
            .then((docs: OrderDocument[]) => {
                return docs.map((doc) => {
                    return this.domainFromSchemaBuilder(doc)
                });
            });

        
        return {
            data: orders,
            meta: RepositoryHelper.generateMeta(page, perPage, count)
        };
    }
}