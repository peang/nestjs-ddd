import { Order } from 'src/domain/entities/order.entities';
import { OrderItem } from '../../domain/value_objects/order/order-item.vo';

export class OrderTransformer {
    public static transformList(datas: Order[] | Order): Record<string, any> | Record<string, any>[] {
        if (datas) {
            if (Array.isArray(datas)) {
                return datas.map((data: Order) => {
                    return {
                        id: data.getId(),
                        items: data.getItems().map((item: OrderItem) => {
                            return {
                                name: item.getName(),
                                total: item.getTotal(),
                            }
                        }),
                        status: data.getStatus().getStatusString(),
                        createdAt: data.getCreatedAt(),
                        updatedAt: data.getUpdatedAt(),
                    };
                });
            } else {
                return {
                    id: datas.getId(),
                    items: datas.getItems().map((item: OrderItem) => {
                        return {
                            name: item.getName(),
                            total: item.getTotal(),
                        }
                    }),
                    status: datas.getStatus().getStatusString(),
                    createdAt: datas.getCreatedAt(),
                    updatedAt: datas.getUpdatedAt(),
                };
            }
        }
    }

    public static transformDetail(data: Order): Record<string, any> {
        if (data) {
            return {
                id: data.getId(),
                items: data.getItems().map((item: OrderItem) => {
                    return {
                        name: item.getName(),
                        qty: item.getQty(),
                        price: item.getPrice(),
                        total: item.getTotal(),
                    }
                }),
                status: data.getStatus().getStatusString(),
                createdAt: data.getCreatedAt(),
                updatedAt: data.getUpdatedAt(),
            }
        }

        return null;
    }
}
