import { Inject, Injectable } from '@nestjs/common';
import { Op, Sequelize } from "sequelize";
import { IMetaResponse } from "src/application/types/app";
import { Order } from "src/domain/entities/order.entities";
import { IOrderRepository } from "src/domain/repositories/order-repository.interface";
import { OrderItem } from "src/domain/value_objects/order/order-item.vo";
import { OrderStatus } from "src/domain/value_objects/order/order-status.vo";
import { RepositoryHelper } from "../helpers/repository.helper";
import { OrderModel } from '../models/order.sql';
import { OrderSQL } from "../types/model";
import { OrderItemSQL } from "../types/vo";

// Why not extends on OrderModel class to use SQL Model functions ?
// Answers: 
// To remove coupled / dependencies with SQL
// When you switch to other DB (e.g Mongo / ES), you just need to adjust in infra layer
@Injectable()
export class OrderRepository implements IOrderRepository {
    constructor(
        @Inject('SEQUELIZE') private readonly sequelize: Sequelize,
    ) { }

    // Sample when persisting as Row for SQL DB
    public sqlBuilder(orderDomain: Order): OrderSQL {
        return {
            id: orderDomain.getId(),
            items: JSON.stringify(orderDomain.getItems()),
            status: orderDomain.getStatus().getStatus(),
            created_at: orderDomain.getCreatedAt(),
            updated_at: orderDomain.getUpdatedAt(),
        }
    }

    public domainFromSQLBuilder(order: OrderSQL): Order {
        if (!order) {
            return;
        }

        let items = JSON.parse(order.items);
        items = items.map((item: OrderItemSQL) => {
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

    public async persist(order: Order): Promise<void> {
        // This only sample of using transactions

        const orderSql = this.sqlBuilder(order);

        const t = await this.sequelize.transaction();

        await OrderModel.create(orderSql, { transaction: t })


        await t.commit();
    }

    public async findOrderBy(params: any): Promise<Order | null> {
        const orderData = await OrderModel.findOne({
            where: params
        });
        if (!orderData) {
            return null;
        }

        return this.domainFromSQLBuilder(orderData);
    }

    public async list(page: number, perPage: number, sort: string, sortBy: string, filter: string): Promise<{
        data: Order[],
        meta: IMetaResponse
    }> {
        const { offset, limit } = RepositoryHelper.getOffsetLimit(page, perPage);

        const where = {};
        if (filter) {
            where['id'] = {
                [Op.iLike]: `%${filter}%`
            }
        }

        const [orders, count]: [Order[], number] = await OrderModel.findAndCountAll({
            offset,
            limit,
            where,
            order: [sort, sortBy]
        }).then((data) => {
            return [
                data.rows.map((order) => this.domainFromSQLBuilder(order)),
                data.count
            ]
        });

        return {
            data: orders,
            meta: RepositoryHelper.generateMeta(page, perPage, count)
        };
    }
}